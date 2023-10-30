import { ExpressValidator, validationResult, body, check, param } from "express-validator";
import { ContactModel } from "../model/contacts";

export default 
[
    body('name').custom(async (value)=>{
          const duplikat : Object | null = await ContactModel.findOne({name : value})
          if(duplikat) throw new Error("Nama sudah digunakan");
          return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check('phone', "Phone tidak valid!").isMobilePhone('id-ID')
]