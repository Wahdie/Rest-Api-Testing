import { Response, Request, NextFunction } from "express";
import { BaseContact, ContactModel } from "../../model/contacts";
import HttpException from "../../common/http-exception";

export default async(req : Request, res : Response, next : NextFunction) => {
    const id  = req.params.id;
    
    try {
          const item : BaseContact | null = await ContactModel.findById(id);
          if(item) {
                await ContactModel.deleteOne({ _id: id });
                return res.status(200).json({msg: `deleted successfully`, itemDeleted:item})
          } 
          res.status(400).json({msg: `no item found for id ${id}`})
    } catch (e : any) {
          e.err = "Terjadi error saat menghapus data";
          e.status = 400;
          next(e)
    }     
}