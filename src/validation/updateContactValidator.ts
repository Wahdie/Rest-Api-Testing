import {
  ExpressValidator,
  validationResult,
  body,
  check,
  param,
} from "express-validator";
import { BaseContact, ContactModel } from "../model/contacts";
export default [
  body("name").custom(async (value, { req }) => {
    const id = req.params?.id;
    const duplikat: BaseContact | null = await ContactModel.findOne({
      name: value,
    });
    const oldNameCheck: BaseContact | null = await ContactModel.findById(id);

    type ObjectKey = keyof typeof oldNameCheck;
    const name: String | null = "name" as ObjectKey;

    if (duplikat && (!oldNameCheck || value !== oldNameCheck[name]))
      throw new Error("Nama sudah digunakan");
    return true;
  }),
  check("email", "Email tidak valid!").isEmail(),
  check("phone", "Phone tidak valid!").isMobilePhone("id-ID"),
];
