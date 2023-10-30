import {Request, Response, NextFunction} from 'express';

export const notFoundHandler = (
      request : Request, 
      response : Response, 
      next : NextFunction
) => {
      const message = "Resorce Not Found"

      response.status(404).json({message});
}