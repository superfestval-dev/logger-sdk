import mongoose from "mongoose";

import { LogModel } from "./../database/models/Log";

import { Log } from "../database/entities/Log";

export interface LoggerOptions {
  db?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
}

export class Logger {
  private db?: string;

  private host?: string;

  private port?: number = 27017;

  private user?: string;

  private password?: string;

  constructor(options?: LoggerOptions) {
    if (options) {
      this.db = options.db ? options.db : "logger";
      this.host = options.host ? options.host : "localhost";
      this.port = options.port ? options.port : 27017;
      this.password = options.password ? options.password : undefined;
    }
  }

  private async connection() {
    const uri = await this.mountURI();

    await mongoose.connect(uri);
  }

  private async mountURI(): Promise<string> {
    if (!this.user || !this.password) {
      return `mongodb://${this.host}:${this.port}/${this.db}`;
    }

    return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.db}`;
  }

  public async create(data: Log) {
    await this.connection();

    const log = new LogModel(data);

    return await log.save();
  }

  public async list(): Promise<Log[]> {
    await this.connection();

    return await LogModel.find({}).sort({ createdAt: -1 });
  }
}
