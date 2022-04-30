import { Schema, model } from "mongoose";

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      maxlength: 30,
      lowercase: true,
    },
      
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
