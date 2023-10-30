import { Response, Request, NextFunction } from "express";

import { BaseContact, ContactModel } from "../../model/contacts";
import HttpException from "../../common/http-exception";
import { errorHandler } from "../error/error.middleware";

export default async (req: Request, res: Response, next: NextFunction) => {
     try {
          const items: BaseContact[] = await ContactModel.find();
          if (items.length === 0)
               throw new HttpException({ message: "No contact found", statusCode: 404 });
          res.status(200).json(items);
     } catch (e: any) {
          next(e);
     }
};
