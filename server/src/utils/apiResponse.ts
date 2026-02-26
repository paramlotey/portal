import { Response } from "express";

const apiResponse = (
  statusCode: number,
  message: string,
  success: boolean,
  res: Response,
  data?: any,
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default apiResponse;
