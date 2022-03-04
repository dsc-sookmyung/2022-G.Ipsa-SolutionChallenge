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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodosController_1 = require("../controllers/TodosController");
class TodosRouter {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(this.todosController.index());
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const post = req['body'];
            const newPost = yield this.todosController.create(post);
            res.send(newPost);
        });
        this.router = (0, express_1.Router)();
        this.todosController = new TodosController_1.TodosController();
        this.routes();
    }
    // public async get(req : any, res: any) {
    //     try {
    //         const client = await pool.connect();
    //         const sql = "SELECT * FROM usertable";
    //         const { rows } = await client.query(sql);
    //         const todos = rows;
    //         client.release();
    //         res.send(todos);
    //     } catch (error) {
    //         res.status(400).send(error);
    //         console.log(error)
    //     }
    // }
    routes() {
        this.router.get('/index', this.index);
        this.router.post('/create', this.create);
    }
}
exports.default = TodosRouter;
// const router = Router();
// const todosController = new TodosController();
// console.log(todosController.index)
// router.get('/', todosController.index);
// export default router;
