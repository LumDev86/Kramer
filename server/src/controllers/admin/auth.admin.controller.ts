import { Request, Response } from "express";
import HTTP_STATUS from "@enums/HtppStatus";
import HttpError from "@utils/HttpError.utils";
import { UserLoginFields } from "@interfaces/user.interface";
import UserService from "@services/user/user.service";
import apiResponse from "@utils/apiResponse.utils";
import { IUser } from "@interfaces/user.interface";

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: IUser = req.body;

      const userResponse = await UserService.registerUser(userData);

      const response = apiResponse(true, userResponse);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (err: unknown) {
      const error: HttpError =
        err instanceof HttpError
          ? err
          : new HttpError(
              err instanceof Error ? err.message : "Unknown error",
              "UNKNOWN_ERROR",
              HTTP_STATUS.SERVER_ERROR
            );
      throw error;
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserLoginFields = req.body;

      const token = await UserService.loginUser(userData);

      if (!token) {
        throw new HttpError(
          "Invalid credentials",
          "INVALID_CREDENTIALS",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const response = apiResponse(true, token);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (err: unknown) {
      const error: HttpError =
        err instanceof HttpError
          ? err
          : new HttpError(
              err instanceof Error ? err.message : "Unknown error",
              "UNKNOWN_ERROR",
              HTTP_STATUS.SERVER_ERROR
            );
      throw error;
    }
  }

  static async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const { password } = req.body;
      const { user } = res.locals;

      const passwordUpdated = await UserService.updatePassword(user, password);

      const response = apiResponse(true, passwordUpdated);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (err: unknown) {
      const error: HttpError =
        err instanceof HttpError
          ? err
          : new HttpError(
              err instanceof Error ? err.message : "Unknown error",
              "UNKNOWN_ERROR",
              HTTP_STATUS.SERVER_ERROR
            );
      throw error;
    }
  }
}
