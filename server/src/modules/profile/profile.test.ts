import { Request, Response, NextFunction } from "express";
import * as profileService from "./profile.service";
import { createProfile } from "./profile.controller";

jest.mock("./profile.service");

describe("Profile Controller - create Profile", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnValue({ json: responseJson });

    // 👇 ADD THIS - Mock next function
    mockNext = jest.fn();

    mockRequest = {
      body: {
        name: "Rahul Singh",
        email: "rahul.singh@example.com",
        gender: "male",
        date_of_birth: "1995-06-15",
        time_of_birth: "10:30:00",
        place_of_birth: "Amritsar",
        no_of_brothers: "1",
        no_of_sisters: "2",
        marital_status: "single",
        children_details: "No",
        address: "123 Model Town",
        city: "Amritsar",
        state: "Punjab",
        country: "India",
        pincode: "143001",
        phone: "9876543210",
        occupation_type: "Employed",
        occupation: "Software Engineer",
        annual_income: "Rs.500001 - Rs.1000000",
        height_feet: 5,
        height_inches: 9,
        body_type: "Average",
        smoking_habit: "Non-Smoker",
        drinking_habit: "Occasional Drinker",
        complexion: "Wheatish",
        diet_preference: "Non-Vegetarian",
        physical_status: "Normal",
        turban_pagri: "No",
        manglik_status: "Non-Manglik",
        religion: "Sikh",
        caste: "Ramgharia/Dhimaan",
        paternal_surname: "Singh",
        maternal_surname: "Kaur",
        mother_tongue: "PUNJABI",
        profile_created_by: "SELF",
        family_background: "SERVICE CLASS",
        family_status: "MIDDLE CLASS",
        residency_status: "CITIZEN",
        education_level: "GRADUATE",
        bio: "Simple and family-oriented person.",
      },
    };

    mockResponse = {
      status: responseStatus,
      json: responseJson,
    };
  });

  test("Should Create Profile With valid data", async () => {
    const mockProfileData = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      created_at: new Date(),
    };

    (profileService.create_Profile as jest.Mock).mockResolvedValue(
      mockProfileData,
    );

    // 👇 PASS mockNext as third argument
    await createProfile(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(profileService.create_Profile).toHaveBeenCalledWith(
      mockRequest.body,
    );
    expect(responseStatus).toHaveBeenCalledWith(201);
    expect(responseJson).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Profile Created Successfuly",
        data: mockProfileData,
      }),
    );
  });

  test("Handle errors from service layer", async () => {
    const errorMessage = "Database Connection Failed";
    const mockError = new Error(errorMessage);
    (profileService.create_Profile as jest.Mock).mockRejectedValue(mockError);

    // 👇 PASS mockNext here too
    await createProfile(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });

  test("should fail when required fields are missing", async () => {
    mockRequest.body = {
      gender: "male",
    };
    const validationError = new Error("Validation failed");

    (profileService.create_Profile as jest.Mock).mockRejectedValue(
      validationError,
    );

    await createProfile(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    // 👇 Check that error was passed to next()
    expect(mockNext).toHaveBeenCalledWith(validationError);
  });
});
