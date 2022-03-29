"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const Options = {
    type: "postgres",
    port: 3306,
    host: '34.64.113.177',
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "gipsa",
    database: "gipsa",
    synchronize: true,
    logging: true,
    entities: [
        path_1.default.join(__dirname, "./entities/*.*")
    ]
};
exports.default = Options;
