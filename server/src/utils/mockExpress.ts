import { NextFunction, Request, Response } from "express";

export const mockExpress = () => {
  let responseJson = jest.fn();
  let responseStatus = jest.fn().mockReturnValue({ json: responseJson });

  let mockRequest: Partial<Request> = {};
  let mockResponse: Partial<Response> = {
    status: responseStatus,
    json: responseJson,
  };

  let mockNext: NextFunction = jest.fn();

  return { mockRequest, mockResponse, mockNext, responseJson, responseStatus };
};
