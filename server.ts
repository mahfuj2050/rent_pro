import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In-memory log storage (for monitoring)
let apiLogs: any[] = [];
const MAX_LOGS = 100;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors()); // Enable CORS for all origins
  app.use(express.json());

  // Middleware to identify "Connected Devices" (e.g., your Android App)
  app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    if (req.path.startsWith('/api')) {
      const logEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        ip: ip,
        userAgent: userAgent,
        apiKey: apiKey ? 'Present' : 'Missing',
        status: 'Pending',
        responseCode: 0
      };

      // Capture response details
      const originalSend = res.send;
      res.send = function (body) {
        logEntry.status = res.statusCode >= 400 ? 'Error' : 'Success';
        logEntry.responseCode = res.statusCode;
        
        // Add to logs
        apiLogs.unshift(logEntry);
        if (apiLogs.length > MAX_LOGS) apiLogs.pop();
        
        return originalSend.apply(res, arguments as any);
      };

      console.log(`[${logEntry.timestamp}] API Request: ${req.method} ${req.path} from ${ip}`);
      
      const validKey = process.env.ANDROID_API_KEY || 'my-secret-android-key';
      if (apiKey && apiKey === validKey) {
        console.log(`Verified Android Device connected`);
      }
    }
    next();
  });

  // --- REST API Endpoints ---

  // GET system logs
  app.get("/api/logs", (req, res) => {
    res.json(apiLogs);
  });
  // GET all properties from Supabase
  app.get("/api/properties", async (req, res) => {
    console.log("Fetching properties from Supabase...");
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    
    console.log(`Returning ${data?.length || 0} properties`);
    res.json(data);
  });
  });

  // POST new property (from Android or Web)
  app.post("/api/properties", async (req, res) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([req.body])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
  });

  // UPDATE property
  app.put("/api/properties/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('properties')
      .update(req.body)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data[0]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`REST API available at http://localhost:${PORT}/api/properties`);
  });
}

startServer();
