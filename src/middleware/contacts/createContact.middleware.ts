import express, { Response, Request, NextFunction } from "express";
import { BaseContact, ContactModel } from "../../model/contacts";
import { ExpressValidator, validationResult, body, check, param } from "express-validator";
import HttpException from "../../common/http-exception";

export default async (req: Request, res: Response, next: NextFunction) => {
     try {
          const newContact: BaseContact = req.body;
          if (!newContact.name || !newContact.email || !newContact.phone)
               throw new HttpException({ statusCode: 400 });

          const errors: any = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json(errors.array());
          } else {
               const newItem = await ContactModel.create(newContact);
               res.status(200).json({
                    message: "Success",
                    newItem,
                    status: 200,
               });
          }
     } catch (err: any) {
          err.error = "Gunakan format sesuai database";
          next(err);
     }
};
