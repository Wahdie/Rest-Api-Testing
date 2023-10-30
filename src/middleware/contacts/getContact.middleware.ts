import express, { Response, Request, NextFunction } from "express";

import { BaseContact, ContactModel } from "../../model/contacts";
import HttpException from "../../common/http-exception";
import  { ObjectId } from "mongodb";

const isObjectId = ObjectId.isValid;

export default async (req: Request, res: Response, next: NextFunction) => {
     try {
          const id = req.params.id;
          if (!isObjectId(id))
               throw new HttpException({ message: "Gunakan ID yang sesuai", statusCode: 404 });


          const item: BaseContact | null = await ContactModel.findById(id);
          if (!item) {
               throw new HttpException({ message: "No contact found", statusCode: 404, error : "Pastikan ID yang dimasukkan"});
          }
          return res.status(200).json(item);
     } catch (e: any) {
          next(e);
     }
};
