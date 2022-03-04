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
exports.UserInfoController = void 0;
// // import pool from '../dbconfig/dbconnector';
// import {Router, Response, Request} from "express";
const typeorm_1 = require("typeorm");
const UserInfo_1 = __importDefault(require("../database/entities/UserInfo"));
// class TodosController {
//     // public router: Router;
//     // constructor(){
//     //     this.router = Router();
//     //     this.routes()
//     // }
//     public index = async(req: Request, res: Response)=>{
//         res.send('Index')
//     }
//     public create = async(req: Request, res: Response)=>{
//         const post = req['body'] as PostEntity;
//         res.send('create')
//     }
//     // public async get(req : any, res: any) {
//     //     try {
//     //         const client = await pool.connect();
//     //         const sql = "SELECT * FROM usertable";
//     //         const { rows } = await client.query(sql);
//     //         const todos = rows;
//     //         client.release();
//     //         res.send(todos);
//     //     } catch (error) {
//     //         res.status(400).send(error);
//     //         console.log(error)
//     //     }
//     // }
// }
// export default TodosController;
class UserInfoController {
    constructor() {
        this.all = () => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.userInfoRepository.find();
            return posts;
        });
        this.signin = (post) => __awaiter(this, void 0, void 0, function* () {
            const newPost = yield this.userInfoRepository.save(post);
            return newPost;
        });
        this.userInfoRepository = (0, typeorm_1.getConnection)('gipsa_db').getRepository(UserInfo_1.default);
    }
}
exports.UserInfoController = UserInfoController;
