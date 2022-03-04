"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Options = {
    type: "postgres",
    host: process.env.DB_ENDPOINT || "localhost",
    port: 3306,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "gipsa",
    database: "gipsa",
    synchronize: true,
    logging: true,
    entities: [
        path_1.default.join(__dirname, "./entities/*.js")
    ],
    name: 'default'
};
exports.default = Options;
