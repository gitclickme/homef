
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export class JwtCommand{

    public static verifyAccessToken(token: string) {

        const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString() ?? '';
        try {
            const decoded = jwt.verify(token, jwtSecretKey);
            return { success: true, data: decoded };
        } catch (error) {
            return { success: false, error: error };
        }
    }

    public static generateAccessToken(payload: any) {

        const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString() ?? '';
        const options = {expiresIn: '1h' };
        

     
    }
   

}

 

    
    
