"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const gcs = new storage_1.Storage({
    projectId: 'gipsa-solutionchallenge2022',
    keyFilename: path_1.default.join(__dirname, '../../build/gipsa-solutionchallenge2022-a8f20048ed9f.json')
});
exports.Storage = gcs;
