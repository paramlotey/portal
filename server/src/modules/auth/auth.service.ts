import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError";

export const getAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const verified = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as JwtPayload & { id: string };

    const accessToken = jwt.sign(
      { id: verified.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" },
    );
    return accessToken;
  } catch (error) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
};
