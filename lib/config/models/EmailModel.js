import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  Date: { type: Date, default: Date.now },
});
const EmailModel =
  mongoose.models.email ||
  mongoose.models.Email ||
  mongoose.model("Email", schema);
export default EmailModel;
