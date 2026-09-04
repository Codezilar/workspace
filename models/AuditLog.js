import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true, index: true },
    entityType: String,
    entityId: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);
export default mongoose.models.AuditLog || mongoose.model("AuditLog", schema);
