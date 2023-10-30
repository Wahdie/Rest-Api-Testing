import { ceapp as app } from "../../src/app";
import request from "supertest";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import { ContactModel } from "../../src/model/contacts";
import HttpException from "../../src/common/http-exception";

// let app: Express;
let server: http.Server;
const TEST_PORT = 1000;

beforeAll((done) => {
     jest.setTimeout(20000);

     // app = ceapp;
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
          // Mock the find function to return a sample array of contacts
          const testContact = [
               { name: "John Doe", phone: "082129425331", email: "johndoe@example.com" },
               { name: "Jane Smith", phone: "082129425331", email: "janesmith@example.com" },
          ];
          ContactModel.find = jest.fn().mockResolvedValue(testContact);

          const response = await request(app).get("/contacts"); // Replace with your actual route
          expect(response.status).toBe(200);
          expect(response.body).toEqual(testContact);
     });

     it("should handle exceptions", async () => {
          const message = "Internal server Error";
          ContactModel.find = jest.fn().mockRejectedValue(new HttpException({ message }));
          const response = await request(app).get("/contacts");
          expect(response.status).toBe(503);
          expect(response.body.message).toBe(message);
     });
});
