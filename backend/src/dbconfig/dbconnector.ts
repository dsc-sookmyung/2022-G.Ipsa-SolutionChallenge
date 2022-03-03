import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://gipsa_admin:gipsa@34.64.244.115:3306/gipsa_test',
    idleTimeoutMillis: 30000
});