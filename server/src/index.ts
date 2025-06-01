import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GeminiService } from "./services/geminiService";
import { FoursquareService } from "./services/foursquareService";
import { createRestaurantRoutes } from "./routes/restaurantRoutes";
import { Config } from "./types";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  geminiApiKey: process.env.GEMINI_API_KEY!,
  foursquareApiKey: process.env.FOURSQUARE_API_KEY!,
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const geminiService = new GeminiService(config.geminiApiKey);
const foursquareService = new FoursquareService(config.foursquareApiKey);

// Routes
app.use("/api", createRestaurantRoutes(geminiService, foursquareService));

// Error handling middleware (MUST be after all routes)
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
