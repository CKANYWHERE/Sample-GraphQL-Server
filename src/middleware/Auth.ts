import { sign } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { LoginInput } from '../resolvers/InputType/user.inputType';
import { ServerContext } from './ServerContext';
import { verify } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (user:LoginInput) =>{
    return sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET!,{
        expiresIn: "30m",
      })
};

export const createRefreshToken = (user:LoginInput) =>{
    return sign({ userId: user.userId }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d",
      })
};

export const isAuth:MiddlewareFn<ServerContext> = ({context},next) => { 
    const authorization = context.req.headers['authorization']

    if(!authorization){
        throw new Error("not authenticated")
    }

    try{
        const token = authorization?.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    }
    catch(err){
        console.log(err);
        throw new Error("not authenticated")
    }


    return next()
};

export const sendRefreshToken = (res:Response, token:string) =>{
    res.cookie("jid", token,{
        httpOnly:true
    });
};