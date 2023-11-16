import request from "supertest";
import { BaseContact, ContactModel } from "../../src/model/contacts";
import HttpException from "../../src/common/http-exception";
import { ceapp as app } from "../../src/app";
import { Express } from "express";
import http from "http";
import mongoose from "mongoose";

// let app: Express;
let server: http.Server;
const TEST_PORT = 3000;
beforeAll(() => {
     jest.setTimeout(20000);
     // app = ceapp;
     server = app.listen(TEST_PORT, () => {
          console.log(`Test server is running on port ${TEST_PORT}`);
     });
});

afterAll((done) => {
     server.close(() => {
          console.log("Test server closed");
          done();
     });
     mongoose.disconnect();
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
     }, 5000);

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
     }, 5000);
});
