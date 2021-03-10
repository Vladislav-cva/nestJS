import { Response } from "express";

export class AppError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super()
    this.status = status;
    this.message = message;
  }
  public static badRequest(message: string): AppError {
    return new AppError(400, message);
  }
  public static internalServerError(message: string): AppError {
    return new AppError(500, message);
  }
}

export function errorHandler(err: AppError | Error, res: Response): void {
  if (err instanceof AppError) {
    res.status(err.status).json(err.message);
    return;
  }
  res.status(406).json(err.message);
}
