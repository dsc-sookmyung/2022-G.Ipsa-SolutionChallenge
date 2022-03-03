import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:gipsa@34.64.244.115:3306/gipsa',
    idleTimeoutMillis: 30000
    // user: 'postgres',
    // host: '34.64.244.115',
    // database: 'gipsa',
    // password: 'gipsa',
    // port: 3306
});