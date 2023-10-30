import mongoose, { Schema, Document, Model } from "mongoose";

// Definisikan antarmuka dengan struktur data yang sesuai
export interface BaseContact {
  name: string,
  phone: string,
  email: string,
}

const contactSchema: Schema<BaseContact> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export const ContactModel: Model<BaseContact> = mongoose.model<BaseContact>('Contact', contactSchema);
