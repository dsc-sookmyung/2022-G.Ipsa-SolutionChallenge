"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserInfoRouter_1 = require("./routers/UserInfoRouter");
const StoryRouter_1 = require("./routers/StoryRouter");
const LikeRouter_1 = require("./routers/LikeRouter");
const FollowRouter_1 = require("./routers/FollowRouter");
const CommentRouter_1 = require("./routers/CommentRouter");
class Server {
    constructor() {
        // private swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))
        // private swagger() {
        //     this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec))
        // }
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        this.app = (0, express_1.default)(); //init the application
        this.config();
        this.routerConfig();
        // this.swagger();
    }
    config() {
        // this.app.use(bodyParser.urlencoded({ extended:true }));
        // this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
        this.app.use(express_1.default.json());
        this.app.enable('trust proxy');
    }
    routerConfig() {
        this.app.get('/', (req, res) => {
            res.send('hello');
        });
        this.app.use('/user', UserInfoRouter_1.UserInfoRouter);
        this.app.use('/story', StoryRouter_1.StoryRouter);
        this.app.use('/like', LikeRouter_1.LikeRouter);
        this.app.use('/follow', FollowRouter_1.FollowRouter);
        this.app.use('/comment', CommentRouter_1.CommentRouter);
    }
}
exports.default = Server;
