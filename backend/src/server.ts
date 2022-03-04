import express, { Application, Router, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {UserInfoRouter} from './routers/UserInfoRouter';
import Options from './database/dbconnector';
import path from 'path';
import swaggerUi from 'swagger-ui-express' 
import YAML from 'yamljs'
import {createConnection} from 'typeorm';

class Server {
    private app: express.Application;


    constructor() {
        this.app = express(); //init the application
        this.config();
        this.routerConfig();
        this.swagger();
    }

    private config() {
        // this.app.use(bodyParser.urlencoded({ extended:true }));
        // this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
        this.app.use(express.json())
    }

    public async routerConfig() {
        await createConnection(Options);
        this.app.get('/', (req: Request, res: Response)=>{
            res.send('hello')
        })
        this.app.use('/user', UserInfoRouter);
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