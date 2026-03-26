import jwt from "jsonwebtoken";
import { JwtCommand } from "./jwt-auth";
import { Request, Response, NextFunction } from "express";
import { restCodeConverter } from "../shared/utils";
import dotenv from 'dotenv';

dotenv.config();  4495922

export const routeGuard = (req:Request, res:Response, next:NextFunction)=>{
        
    const authHeader = req.headers.token;
    const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString()??'';

    let tokenHeaderKey:string| undefined = process.env.TOKEN_HEADER_KEY;
    try{
        const token = authHeader?.toString(); //&& <string>authHeader.split(' ')[1];
        if(token){
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
           next();
        } else {
            // Access Denied
            return res.type("json").status(401).send('Access Denied');
        }
        }
        else{
            return res.type("json").status(401).send('Access Denied');
        }
    }
    catch(error){
        return res.status(401).send(error);
    }
}


export class JwtAuthService {
       
    async generateAccessToken(req:Request, res:Response){
        try{
           let payload = {user:'2344'}
           let ret = JwtCommand.generateAccessToken(payload);
           res.type("json").status(restCodeConverter(200)).send(ret);
        }
        catch(error){
            res.type("json").status(501).send(error);
        }
    }


    async routeGuard (req:Request, res:Response, next:NextFunction){
        
        const authHeader = req.headers.token;
        const jwtSecretKey = process.env.JWT_SECRET_KEY?.toString()??'';
   
        let tokenHeaderKey:string| undefined = process.env.TOKEN_HEADER_KEY;
        try{
            const token = authHeader?.toString(); //&& <string>authHeader.split(' ')[1];
            if(token){
            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                return res.send("Successfully Verified");
            } else {
                // Access Denied
                return res.type("json").status(401).send('Access Denied');
            }
            }
            else{
                return res.type("json").status(401).send('Access Denied');
            }
            next();
        }
        catch(error){
            return res.status(401).send(error);
        }
    } 

    
} 