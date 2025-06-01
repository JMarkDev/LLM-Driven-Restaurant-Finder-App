import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { GeminiService } from "../services/geminiService";
import { FoursquareService } from "../services/foursquareService";

export const createRestaurantRoutes = (
  geminiService: GeminiService,
  foursquareService: FoursquareService
): Router => {
  const router = Router();
  const restaurantController = new RestaurantController(
    geminiService,
    foursquareService
  );

  router.post("/execute", restaurantController.executeSearch);

  return router;
};
