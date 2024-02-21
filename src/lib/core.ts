import mongoose from "mongoose";

import { LogModel } from "./../database/models/Log";

import { Log } from "../database/entities/Log";

export interface LoggerOptions {
  db: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export class Logger {
  private db?: string = "logger";

  private host?: string = "localhost";

  private port?: number = 27017;

  private user?: string;

  private password?: string;

  constructor(options?: LoggerOptions) {
    if (options) {
      this.db = options.db;
      this.host = options.host;
      this.port = options.port;
      this.password = options.password;
    }
  }

  private async connection() {
    const uri = await this.mountURI();

    await mongoose.connect(uri);
  }

  private async mountURI(): Promise<string> {
    const url = `mongodb://${
      this.user && this.port ? this.user + ":" + this.port + "@" : ""
    }:${this.host}:${this.port}`;

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
