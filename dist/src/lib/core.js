"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Log_1 = require("./../database/models/Log");
class Logger {
    db = "logger";
    host = "localhost";
    port = 27017;
    user;
    password;
    constructor(options) {
        if (options) {
            this.db = options.db;
            this.host = options.host;
            this.port = options.port;
            this.password = options.password;
        }
    }
    async connection() {
        const uri = await this.mountURI();
        await mongoose_1.default.connect(uri);
    }
    async mountURI() {
        const url = `mongodb://${this.user && this.port ? this.user + ":" + this.port + "@" : ""}:${this.host}:${this.port}`;
        if (!this.user || !this.password) {
            return `mongodb://${this.host}:${this.port}/${this.db}`;
        }
        return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.db}`;
    }
    async create(data) {
        await this.connection();
        const log = new Log_1.LogModel(data);
        return await log.save();
    }
    async list() {
        await this.connection();
        return await Log_1.LogModel.find({}).sort({ createdAt: -1 });
    }
}
exports.Logger = Logger;
