import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    walletAddress: { type: String, required: true },
    transactionHash: { type: String, required: true, index: true },
    paymentProof: String,
    note: String,
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: Date,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    adminNote: String,
  },
  { timestamps: true },
);
schema.index(
  { userId: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "PENDING" },
    name: "one_pending_payment_per_user",
  },
);
export default mongoose.models.Payment || mongoose.model("Payment", schema);
