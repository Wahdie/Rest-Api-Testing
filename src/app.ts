/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express"; //untuk
import cors from "cors"; // untuk
import helmet from "helmet"; // untuk
import http from 'http'

import { itemsRouter } from "./routing/contacts.routing";
import { errorHandler } from "./middleware/error/error.middleware";
import { notFoundHandler } from "./middleware/notfound-handler/not-found.middleware";

dotenv.config();

// koneksi database
import mongoose from "./db/db";
mongoose.connection.once("open", () => {
     console.log("Koneksi MongoDB berhasil terbuka");
});


/**
 * App Variable
 */

// memeriksa apakah port ada
if (!process.env.PORT) {
     process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10); // jika ada ambil nilai port yang di konversi dari process.env yang formatnya string

const app = express();

/**
 * App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/contacts", itemsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */


export { app as ceapp };


/**
 * Routing (item/items.routing.ts)
# get all items
GET /api/menu/items

# get a single item using an id parameter
GET /api/menu/items/:id

# create an item
POST /api/menu/items

# update an item using an id parameter
PUT /api/menu/items/:id

# remove an item using an id parameter
DELETE /api/menu/items/:id

 */
