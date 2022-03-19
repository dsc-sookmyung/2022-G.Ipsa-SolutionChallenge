import { ConnectionOptions } from "typeorm"
import path from 'path';

const Options: ConnectionOptions = {
    type: "postgres",
    port: 3306,
    host: '34.64.244.115',
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "gipsa",
    database: "gipsa",
    synchronize: true,
    logging: true,
    entities: [
        path.join(__dirname, "./entities/*.*")
    ]
}

export default Options