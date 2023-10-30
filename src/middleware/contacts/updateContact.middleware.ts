import express, { Response, Request, NextFunction } from "express";
import { BaseContact, ContactModel } from "../../model/contacts";
import { ExpressValidator, validationResult, body, check, param } from "express-validator";
import HttpException from "../../common/http-exception";

export default async (req: Request, res: Response, next: NextFunction) => {
     try {
          const id = req.params.id;

          const itemUpdate: BaseContact = req.body;
          if (!itemUpdate.name || !itemUpdate.email || !itemUpdate.phone)
               throw new HttpException({statusCode : 400});

               
          const errors: any = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json(errors.array());
          }

          const exitingItem: BaseContact | null = await ContactModel.findById(id);
          if (exitingItem) {
               await ContactModel.updateOne(
                    { _id: id },
                    {
                         name: itemUpdate.name,
                         email: itemUpdate.email,
                         phone: itemUpdate.phone,
                    }
               );
               return res.status(200).json({
                    message: "success",
                    itemUpdate,
               });
          }

          res.status(400).json({ msg: `User with id : ${id} is not found` });
     } catch (err: any) {
          err.error = "Gunakan format sesuai database";
          next(err);
     }
};
