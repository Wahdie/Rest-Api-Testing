import { ceapp as app } from "../../src/app";
import request from "supertest";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import { ContactModel } from "../../src/model/contacts";
const TEST_PORT = 2000; // Port untuk pengujian

let server: any;
// let app: Express;

// Before running tests, start a test server
beforeAll(() => {
     jest.setTimeout(20000);

     // Mengganti port pada aplikasi pengujian
     // app = ceapp;
     server = app.listen(TEST_PORT, () => {
          console.log(`Test server is running on port ${TEST_PORT}`);
     });
});

// After tests are done, close the test server
afterAll((done) => {
     server.close(done);
     mongoose.disconnect();
});

describe("Sould test Delete Contact Router", () => {
     it("shouldn't delete contact, cause contact not found", async () => {
          const res = await request(app).delete("/contacts/652c92260be0dd65763f4894");
          expect(res.status).toBe(400);
          expect(res.body.msg).toBe("no item found for id 652c92260be0dd65763f4894");
     });

     it("shouldn't delete contact, cause contact id not an ObjectID", async () => {
          const res = await request(app).delete("/contacts/makan");
          expect(res.status).toBe(400);
          expect(res.body.message).toBe(
               'Cast to ObjectId failed for value "makan" (type string) at path "_id" for model "Contact"'
          );
          expect(res.body.errorMessage).toBe("Internal Server Error");
     });

     it("Should delete contact", async () => {
          ContactModel.findById = jest.fn().mockResolvedValue([
               {
                    _id: "123456",
                    name: "Makan",
                    email: "adieadie@gmail.com",
                    phone: "082129425331",
                    __v: 0,
               },
          ]);

          ContactModel.deleteOne = jest.fn().mockResolvedValue({
               msg: "deleted successfully",
               itemDeleted: {
                    _id: "123456",
                    name: "Makan",
                    email: "adieadie@gmail.com",
                    phone: "082129425331",
                    __v: 0,
               },
          });

          const response = await request(app).delete("/contacts/123456");

          expect(ContactModel.deleteOne).toHaveBeenCalledWith({ _id: "123456" });
          expect(response.status).toBe(200);
          expect(response.body.msg).toBe("deleted successfully");
          expect(response.body.itemDeleted[0]).toEqual({
               _id: "123456",
               name: "Makan",
               email: "adieadie@gmail.com",
               phone: "082129425331",
               __v: 0,
          });
     });
});
