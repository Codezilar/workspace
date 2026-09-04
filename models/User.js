import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    // Retained for compatibility with the existing MongoDB unique index.
    referralCode: String,
    name: { type: String, default: "" },
    image: String,
    phone: String,
    location: String,
    bio: { type: String, maxlength: 1200 },
    skills: [String],
    experience: String,
    education: String,
    resume: String,
    linkedIn: String,
    portfolio: String,
    availability: String,
    role: {
      type: String,
      enum: ["USER", "ADMIN", "OWNER"],
      default: "USER",
      index: true,
    },
    accessStatus: {
      type: String,
      enum: ["PENDING_PAYMENT", "PAYMENT_REVIEW", "ACTIVE", "SUSPENDED"],
      default: "PENDING_PAYMENT",
      index: true,
    },
  },
  { timestamps: true },
);
export default mongoose.models.User || mongoose.model("User", schema);
