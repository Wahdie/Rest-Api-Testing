import { ceapp } from "../../src/app";
import request from "supertest";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import { ContactModel } from "../../src/model/contacts";
import HttpException from "../../src/common/http-exception";

let app: Express;
let server: http.Server;
const TEST_PORT = 3000; // Port untuk pengujian

beforeAll((done) => {
     // Mengganti port pada aplikasi pengujian
     app = ceapp;
     server = app.listen(TEST_PORT, () => {
          console.log(`Test server is running on port ${TEST_PORT}`);
          done();
     });
});
afterAll((done) => {
     // Hentikan server Express dan selesaikan pengujian setelah semua pengujian selesai
     mongoose.disconnect();
     server.close(done);
});

describe("Get Contacts Route", () => {
     it("should get a list of contacts", async () => {
          const response = await request(app).get("/contacts/6531b71915fe02bd32a7b56f"); // Replace with your actual route
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
               _id: "6531b71915fe02bd32a7b56f",
               name: "Farid",
               email: "adie@gmail.com",
               phone: "082129425331",
               __v: 0,
          });
     });

     it("should return 404 if contact is not found", async () => {
          const response = await request(app).get("/contacts/652c9083c8032372afa06eac");
          expect(response.status).toBe(404);
          expect(response.body.message).toBe("No contact found");
     });


     it("should handle exceptions", async () => {
          const response = await request(app).get("/contacts/makan");
          const message = response;
          expect(response.statusCode).toBe(404);
          expect(message.body.message).toBe("Gunakan ID yang sesuai");
          expect(message.body.errorMessage).toBe("Internal Server Error");
     });
});
