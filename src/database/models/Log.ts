import mongoose from "mongoose";
import { Log } from "../entities/Log";

export const LogSchema = new mongoose.Schema<Log>(
  {
    name: String,
    level: {
      type: String,
      default: "info",
    },
    message: String,
    metadata: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const LogModel =
  mongoose.models.Logs || mongoose.model("Logs", LogSchema);
