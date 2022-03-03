"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    // max: 20,
    // connectionString: 'postgres://postgres:gipsa@34.64.244.115:3306/gipsa',
    // idleTimeoutMillis: 30000
    user: 'postgres',
    host: '34.64.244.115',
    database: 'gipsa',
    password: 'gipsa',
    port: 3306
});
