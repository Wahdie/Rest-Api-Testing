/**
 * Reqiured External Modules and Interfaces
 */
import express, { Response, Request, NextFunction } from "express";
import { BaseContact, ContactModel } from "../model/contacts";
import { ExpressValidator, validationResult, body, check, param } from "express-validator";
import HttpException from "../common/http-exception";
import getAllUsers from "../middleware/contacts/getAllContacts.middleware";
import getUser from "../middleware/contacts/getContact.middleware";
import createUser from "../middleware/contacts/createContact.middleware";
import updateContact from "../middleware/contacts/updateContact.middleware";
import deleteContact from "../middleware/contacts/deleteContact.middleware";

/**
 * Validations
 */

import createContactsValidator from "../validation/createContactValidator";
import updateContactValidator from "../validation/updateContactValidator";


/**
 * Router Definition
 */

export const itemsRouter = express.Router();


/**
 * Controller Definitions
 */

// Get items
itemsRouter.get('/', getAllUsers)

// Get items/:id
itemsRouter.get('/:id',  getUser)

// Post items
itemsRouter.post('/', createContactsValidator, createUser);

// Put items/:id
itemsRouter.put('/:id', updateContactValidator, updateContact )

// Delete items/:id
itemsRouter.delete('/:id', deleteContact)