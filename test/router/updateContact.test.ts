import { ceapp as app } from "../../src/app";
import request from "supertest";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";

// let app: Express;
let server: http.Server;
const TEST_PORT = 3001; // Port untuk pengujian

beforeAll(() => {
     // Mengganti port pada aplikasi pengujian
     // app = ceapp;
     server = app.listen(TEST_PORT, () => {
          console.log(`Test server is running on port ${TEST_PORT}`);
     });
});
afterAll(() => {
     // Hentikan server Express dan selesaikan pengujian setelah semua pengujian selesai
     mongoose.disconnect();
     server.close();
});

describe("Test the contact update API", () => {
     interface MyObject {
          type: string;
          value: string;
          msg: string;
          path: string;
          location: string;
     }

     it("should return 400 if validation fails (jika parameter id bukan object id)", async () => {
          const response = await request(app)
               .put("/contacts/1")
               .send({ name: "Ronald", email: "ronald@example.com", phone: "081456789012" });
          expect(response.status).toBe(400);
          expect(response.body[0].msg).toBe(
               'Cast to ObjectId failed for value "1" (type string) at path "_id" for model "Contact"'
          );
     });

     it("should return 400 if contact is not found", async () => {
          const nonExistentId = "6531d73fb57624218c045a24"; // ID yang tidak ada dalam database
          const response = await request(app).put(`/contacts/${nonExistentId}`).send({
               name: "Ronald",
               email: "ronald@example.com",
               phone: "081456789012",
          });
          expect(response.status).toBe(400);
          expect(response.body.msg).toBe("User with id : 6531d73fb57624218c045a24 is not found"); // Ini akan menunjukkan pesan kesalahan dari respons
     });

     it("should return 400 if phone is not valid", async () => {
          const response = await request(app).put("/contacts/652d18121787e37372eacd10").send({
               name: "Ronald",
               email: "ronald@example.com",
               phone: "1234567890",
          });

          expect(response.status).toBe(400);

          const text = response.text;
          const arr: MyObject[] = JSON.parse(text);
          expect(arr[0].msg).toBe("Phone tidak valid!");
     });

     it("should return 400 if email is not valid", async () => {
          const response = await request(app).put("/contacts/652d18121787e37372eacd10").send({
               name: "Ronald",
               email: "ronaldexample.com",
               phone: "082129435322",
          });

          expect(response.status).toBe(400);

          const text = response.text;
          const arr: MyObject[] = JSON.parse(text);
          expect(arr[0].msg).toBe("Email tidak valid!");
     });

     it("should to update the contact successfully ", async () => {
          const response = await request(app).put("/contacts/6531d73fb57624218c045a23").send({
               name: "John Doe",
               email: "johndoe@example.com",
               phone: "082129425331",
          });
          // console.log(response.body);
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("success");
          expect(response.body.itemUpdate.name).toBe("John Doe");
          expect(response.body.itemUpdate.email).toBe("johndoe@example.com");
          expect(response.body.itemUpdate.phone).toBe("082129425331");
     });

     it("should failed to update the contact, cause not using BaseContact format", async () => {
          const response = await request(app).put("/contacts/6531d73fb57624218c045a23").send({
               nama: "John Doe", // seharusnya 'name'
               email: "johndoe@example.com",
               phone: "082129425331",
          });
          expect(response.status).toBe(400);
          expect(response.body.message).toBe("Terjadi kesalahan");
          expect(response.body.errorMessage).toBe("Gunakan format sesuai database");
     });

     it("should failed to update the contact, cause not using BaseContact format", async () => {
          const response = await request(app).put("/contacts/6531d73fb57624218c045a23").send({
               name: "John Doe",
               gmail: "johndoe@example.com", // seharusnya 'email'
               phone: "082129425331",
          });
          expect(response.status).toBe(400);
          expect(response.body.message).toBe("Terjadi kesalahan");
          expect(response.body.errorMessage).toBe("Gunakan format sesuai database");
     });

     it("should failed to update the contact, cause not using BaseContact format", async () => {
          const response = await request(app).put("/contacts/6531d73fb57624218c045a23").send({
               name: "John Doe",
               email: "johndoe@example.com",
               hp: "082129425331", // seharusnya 'phone'
          });
          expect(response.status).toBe(400);
          expect(response.body.message).toBe("Terjadi kesalahan");
          expect(response.body.errorMessage).toBe("Gunakan format sesuai database");
     });
});
