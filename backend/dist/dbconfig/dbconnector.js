"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://gipsa_admin:gipsa@34.64.244.115:3306/gipsa_test',
    idleTimeoutMillis: 30000
});
