export class Log {
  public _id?: string;
  public name: string;
  public level: "error" | "warning" | "info" | "debug" | "fatal";
  public message: string;
  public metadata?: string;

  constructor(data: Log) {
    this._id = data._id;
    this.name = data.name;
    this.level = data.level;
    this.message = data.message;
    this.metadata = data.metadata;
  }
}
