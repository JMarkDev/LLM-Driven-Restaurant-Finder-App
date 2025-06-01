import { Request, Response, NextFunction } from "express";
import { GeminiService } from "../services/geminiService";
import { FoursquareService } from "../services/foursquareService";
import { RestaurantSearchRequest } from "../types";

export class RestaurantController {
  constructor(
    private geminiService: GeminiService,
    private foursquareService: FoursquareService
  ) {}

  public executeSearch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message }: RestaurantSearchRequest = req.body;

      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      const searchCommand = await this.geminiService.convertToSearchCommand(
        message
      );

      const restaurants = await this.foursquareService.searchRestaurants(
        searchCommand.parameters
      );

      res.json({
        restaurants,
        total: restaurants.length,
        searchCommand,
      });
    } catch (error) {
      next(error);
    }
  };
}
