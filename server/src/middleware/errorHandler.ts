import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error occurred:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  const isDevelopment = process.env.NODE_ENV === "development";

  res.status(500).json({
    error: "Internal server error",
    message: isDevelopment ? error.message : "Something went wrong",
    ...(isDevelopment && { stack: error.stack }),
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
