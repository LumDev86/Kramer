import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HTTP_STATUS from "@enums/HtppStatus";
import apiResponse from "../utils/apiResponse.utils";
import HttpError from "@/utils/HttpError.utils";
import { config } from "@config/validateEnv";

export default async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        const response = apiResponse(
            false,
            new HttpError(
                "Token is required",
                "TOKEN_REQUIRED",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
        res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
        return;
    }

    const token = req.headers.authorization.substring(7);

    try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        const user = JSON.parse(JSON.stringify(decodedToken));
        res.locals.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error); // opcional
        const response = apiResponse(
            false,
            new HttpError(
                "Invalid token",
                "INVALID_TOKEN",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
        res.status(HTTP_STATUS.UNAUTHORIZED).json(response);
    }
}

