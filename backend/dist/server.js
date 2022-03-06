"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserInfoRouter_1 = require("./routers/UserInfoRouter");
const StoryRouter_1 = require("./routers/StoryRouter");
const LikeRouter_1 = require("./routers/LikeRouter");
const FollowRouter_1 = require("./routers/FollowRouter");
const dbconnector_1 = __importDefault(require("./database/dbconnector"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const typeorm_1 = require("typeorm");
class Server {
    constructor() {
        this.swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, '../build/swagger.yaml'));
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
        this.swagger();
    }
    config() {
        // this.app.use(bodyParser.urlencoded({ extended:true }));
        // this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
        this.app.use(express_1.default.json());
    }
    routerConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.createConnection)(dbconnector_1.default);
            this.app.get('/', (req, res) => {
                res.send('hello');
            });
            this.app.use('/user', UserInfoRouter_1.UserInfoRouter);
            this.app.use('/story', StoryRouter_1.StoryRouter);
            this.app.use('/like', LikeRouter_1.LikeRouter);
            this.app.use('/follow', FollowRouter_1.FollowRouter);
        });
    }
    swagger() {
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerSpec));
    }
}
exports.default = Server;
