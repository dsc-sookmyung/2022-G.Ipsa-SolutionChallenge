import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import todosRouter from './routers/TodosRouter';
import pool from './dbconfig/dbconnector';
import path from 'path';
import swaggerUi from 'swagger-ui-express' 
import YAML from 'yamljs'


class Server {
    private app;


    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        // this.dbConnect();
        this.swagger();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) throw new Error('error');
            console.log('Connected');
          }); 
    }

    private routerConfig() {
        this.app.use('/todos', todosRouter);
    }

    private swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))
    private swagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec))
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;