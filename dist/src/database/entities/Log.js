"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class Log {
    _id;
    name;
    level;
    message;
    metadata;
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.level = data.level;
        this.message = data.message;
        this.metadata = data.metadata;
    }
}
exports.Log = Log;
