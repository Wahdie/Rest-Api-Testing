import { ceapp as app } from "./app";
import http from 'http'


import mongoose from "./db/db";
mongoose.connection.once("open", () => {
     console.log("Koneksi MongoDB berhasil terbuka");
});


if (!process.env.PORT) {
     process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10); // jika ada ambil nilai port yang di konversi dari process.env yang formatnya string

const server = http.createServer(app);
server.listen(PORT, () => {
     console.log(`listening on http://localhost:${PORT}`);
});