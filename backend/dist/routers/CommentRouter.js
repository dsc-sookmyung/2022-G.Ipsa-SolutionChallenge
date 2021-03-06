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
exports.CommentRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Comment_1 = __importDefault(require("../database/entities/Comment"));
const dbconnector_1 = __importDefault(require("../database/dbconnector"));
const typeorm_2 = require("typeorm");
const router = express_1.default.Router();
exports.CommentRouter = router;
const connectionManager = (0, typeorm_1.getConnectionManager)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const userId = req.query.userId;
    const storyId = req.query.storyId;
    if (userId) {
        const searchedComment = yield Comment_1.default.find({ where: { userId: userId } });
        res.send(searchedComment);
    }
    else if (storyId) {
        const searchedComment = yield Comment_1.default.find({ where: { storyId: storyId } });
        res.send(searchedComment);
    }
    else {
        const searchedComment = yield Comment_1.default.find();
        res.send(searchedComment);
    }
    // await connection.close();
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const body = req.body;
    // const userId = body.userId;
    // const storyId = body.storyId;
    const comment = body;
    const newComment = Comment_1.default.create(comment);
    yield newComment.save();
    res.send('Commented');
    // await connection.close();
}));
