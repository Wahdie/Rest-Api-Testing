import { ceapp as app } from "../../src/app";
import request from "supertest";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import { BaseContact, ContactModel } from "../../src/model/contacts";
const TEST_PORT = 4000; // Port untuk pengujian

let server: any;
// let app: Express;

// Before running tests, start a test server
beforeAll((done) => {
     // Mengganti port pada aplikasi pengujian
     jest.setTimeout(20000);
     // app = ceapp;
     server = app.listen(TEST_PORT, () => {
          console.log(`Test server is running on port ${TEST_PORT}`);
          done();
     });
});

// After tests are done, close the test server
afterAll((done) => {
     server.close(done);
     mongoose.disconnect();
});

describe("Testing for contact router ", () => {
     it("should create a contact succesfully", async () => {
          const newContact: BaseContact = {
               name: "Wahdie Rodriguez",
               phone: "082122222222",
               email: "fafa@fa.com",
          };
          ContactModel.create = jest.fn().mockResolvedValue(newContact);
          const res = await request(app).post("/contacts").send(newContact);
          expect(res.status).toBe(200);
          expect(res.body.message).toBe('Success');
          expect(res.body.newItem).toEqual(newContact)
     });

     it("Should failed to create data cause name already in use", async () => {
          const res = await request(app).post("/contacts").send({
               name: "Farid Wahdie",
               phone: "082129425331",
               email: "adie@wi.com",
          });

          expect(res.status).toBe(400);
          expect(res.body[0].msg).toBe("Nama sudah digunakan");
     });

     it("Should failed to create data cause email is invalid", async () => {
          const res = await request(app).post("/contacts").send({
               name: "Farid Gonzales",
               phone: "082129425331",
               email: "adiewi.com", // email tidak valid
          });

          expect(res.status).toBe(400);
          expect(res.body[0].msg).toBe("Email tidak valid!");
     });

     it("Should failed to create data cause phone is invalid", async () => {
          const res = await request(app).post("/contacts").send({
               name: "Farid Gonzales",
               phone: "982129425331", // phone tidak valid
               email: "adie@wi.com",
          });

          expect(res.status).toBe(400);
          expect(res.body[0].msg).toBe("Phone tidak valid!");
     });

     it("Should failed to create data cause property is invalid", async () => {
          const res = await request(app).post("/contacts").send({
               nama: "Farid Gonzalez", //seharusnya 'name'
               phone: "082129425331",
               email: "adie@wi.com",
          });

          expect(res.status).toBe(400);
          expect(res.body.message).toBe("Terjadi kesalahan");
          expect(res.body.errorMessage).toBe("Gunakan format sesuai database");
     });

     it("Should failed to create data cause property is invalid", async () => {
          const res = await request(app).post("/contacts").send({
               name: "Farid Gonzales",
               hp: "082129425331", //seharusnya 'phone'
               email: "adie@wi.com",
          });

          expect(res.status).toBe(400);
          expect(res.body.message).toBe("Terjadi kesalahan");
          expect(res.body.errorMessage).toBe("Gunakan format sesuai database");
     });
     it("Should failed to create data cause property is invalid", async () => {
          const res = await request(app).post("/contacts").send({
               name: "Farid Gonzales",
               phone: "082129425331",
               gmail: "adie@wi.com", //seharusnya 'email'
          });
          expect(res.status).toBe(400);
          expect(res.body.message).toBe("Terjadi kesalahan");
          expect(res.body.errorMessage).toBe("Gunakan format sesuai database");
     });
});
