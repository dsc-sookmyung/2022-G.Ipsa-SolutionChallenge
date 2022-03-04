import { ConnectionOptions } from "typeorm"
import path from 'path';

const Options: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_ENDPOINT || "localhost",
    port: 3306,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "gipsa",
    database: "gipsa",
    synchronize: true,
    logging: true,
    entities: [
        path.join(__dirname, "./entities/*.js")
    ],
    name: 'default'
}

export default Options