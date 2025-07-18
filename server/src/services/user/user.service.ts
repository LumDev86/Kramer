import HTTP_STATUS from "@enums/HtppStatus";
import { BcryptUtils } from "@utils/bcrypt.utils";
import { sign } from "jsonwebtoken";
import HttpError from "@utils/HttpError.utils";
import {
  IUser,
  UserLoginFields,
  mapUserEntityToIUser,
} from "@interfaces/user.interface";
import { ITokenPayload } from "@interfaces/auth.interface";
import { UserRepository } from "@/repositories/UserRepository";
import { Roles } from "@enums/Roles";

export default class UserService {

  static async loginUser(
    userData: UserLoginFields
  ): Promise<{ token: string }> {
    try {
      const userFound = await UserRepository.find({
        where: { email: userData.email },
      });

      if (!userFound || userFound.length === 0) {
        throw new HttpError(
          "Invalid credentials",
          "INVALID_CREDENTIALS",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const user = mapUserEntityToIUser(userFound[0]);

      const isPasswordValid = BcryptUtils.isValidPassword(
        user,
        userData.password
      );

      if (!isPasswordValid) {
        throw new HttpError(
          "Invalid credentials",
          "INVALID_CREDENTIALS",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      const token = sign(
        {
          id: user.id,
          role: user.role,
          nbf: Math.floor(Date.now() / 1000),
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return { token };
    } catch (err: unknown) {
      const error: HttpError = err instanceof HttpError 
        ? err 
        : new HttpError(
            (err instanceof Error) ? err.message : "Unknown error",
            "UNKNOWN_ERROR",
            HTTP_STATUS.SERVER_ERROR
          );
      throw error;
    }
  }

  static async registerUser(userData: IUser): Promise<{ token: string }> {
    try {
      const existingUser = await UserRepository.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new HttpError(
          "Email already in use",
          "EMAIL_ALREADY_EXISTS",
          HTTP_STATUS.CONFLICT
        );
      }

      const hashedPassword = await BcryptUtils.createHash(userData.password);

      const newUser = UserRepository.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        status: true,
        role: Roles.ADMIN,
        createdAt: new Date(),
      });

      await UserRepository.save(newUser);

      const token = sign(
        {
          id: newUser.id,
          role: newUser.role,
          nbf: Math.floor(Date.now() / 1000),
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return { token };
    } catch (err: unknown) {
      const error: HttpError = err instanceof HttpError 
        ? err 
        : new HttpError(
            (err instanceof Error) ? err.message : "Unknown error",
            "UNKNOWN_ERROR",
            HTTP_STATUS.SERVER_ERROR
          );
      throw error;
    }
  }

  static async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await UserRepository.find({ where: { id: id } });

      if (!user) {
        throw new HttpError(
          "User not found",
          "USER_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const mappedUser = mapUserEntityToIUser(user[0]);

      return mappedUser;
    } catch (err: unknown) {
      const error: HttpError = err instanceof HttpError 
        ? err 
        : new HttpError(
            (err instanceof Error) ? err.message : "Unknown error",
            "UNKNOWN_ERROR",
            HTTP_STATUS.SERVER_ERROR
          );
      throw error;
    }
  }

  static async updatePassword(
    user: ITokenPayload,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      const currentUser = await UserRepository.findOne({
        where: { id: user.id },
      });

      if (!currentUser) {
        throw new HttpError(
          "User not found",
          "USER_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      const isSamePassword = await BcryptUtils.comparePasswords(
        newPassword,
        currentUser.password
      );

      if (isSamePassword) {
        throw new HttpError(
          "Password is the same as the current one",
          "SAME_PASSWORD",
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const hashedPassword = await BcryptUtils.createHash(newPassword);

      currentUser.password = hashedPassword;
      currentUser.updatedAt = new Date();

      await UserRepository.save(currentUser);

      return {
        message: "Password actualizado correctamente",
      };
    } catch (err: unknown) {
      const error: HttpError = err instanceof HttpError 
        ? err 
        : new HttpError(
            (err instanceof Error) ? err.message : "Unknown error",
            "UNKNOWN_ERROR",
            HTTP_STATUS.SERVER_ERROR
          );
      throw error;
    }
  }

  static async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserRepository.find();

      if (!users) {
        throw new HttpError(
          "Users not found",
          "USERS_NOT_FOUND",
          HTTP_STATUS.NOT_FOUND
        );
      }

      return users;
    } catch (err: unknown) {
      const error: HttpError = err instanceof HttpError 
        ? err 
        : new HttpError(
            (err instanceof Error) ? err.message : "Unknown error",
            "UNKNOWN_ERROR",
            HTTP_STATUS.SERVER_ERROR
          );
      throw error;
    }
  }
}
