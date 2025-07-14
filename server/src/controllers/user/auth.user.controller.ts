import { Request, Response } from "express";

import HTTP_STATUS from "@enums/HtppStatus";
import HttpError from "@utils/HttpError.utils";
import apiResponse from "@/utils/apiResponse.utils";

export default class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        // FIXME: Check if the requester is an admin, and admit only admins to create users with roles
        

           
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            

        
        
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            

           
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }

    static async updatePassword(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (err: any) {
            const response = apiResponse(
                false,
                new HttpError(
                    err.description || err.message,
                    err.details || err.message,
                    err.status || HTTP_STATUS.SERVER_ERROR
                )
            );
            res.status(err.status || HTTP_STATUS.SERVER_ERROR).json(response);
        }
    }
}
