"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = exports.LogSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.LogSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
exports.LogModel = mongoose_1.default.models.Logs || mongoose_1.default.model("Logs", exports.LogSchema);
