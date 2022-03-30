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
exports.UserInfoRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const UserInfo_1 = __importDefault(require("../database/entities/UserInfo"));
const dbconnector_1 = __importDefault(require("../database/dbconnector"));
const typeorm_2 = require("typeorm");
const router = express_1.default.Router();
exports.UserInfoRouter = router;
const connectionManager = (0, typeorm_2.getConnectionManager)();
router.get('/emailCheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const email = req.query.email;
    const userCount = yield UserInfo_1.default.findAndCount({ where: { email: email } });
    if (userCount[1] > 0)
        res.send('1');
    else
        res.send('0');
    // await connection.close();
}));
router.get('/nicknameCheck', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const nickname = req.query.nickname;
    const userCount = yield UserInfo_1.default.findAndCount({ where: { nickname: nickname } });
    if (userCount[1] > 0)
        res.send('1');
    else
        res.send('0');
    // await connection.close();
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const user = req['body'];
    const newUser = UserInfo_1.default.create(user);
    yield newUser.save();
    res.send(newUser);
    // await connection.close();
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const keyword = req.query.keyword;
    const email = req.query.email;
    const uid = req.query.uid;
    if (keyword) {
        const searchedUser = yield UserInfo_1.default.find({ nickname: (0, typeorm_1.Like)(`%${keyword}%`) });
        res.send(searchedUser);
    }
    else if (email) {
        const searchedUser = yield UserInfo_1.default.find({ where: { email: email } });
        res.send(searchedUser);
    }
    else if (uid) {
        const searchedUser = yield UserInfo_1.default.find({ where: { uid: uid } });
        res.send(searchedUser);
    }
    else {
        const searchedUser = yield UserInfo_1.default.find();
        res.send(searchedUser);
    }
    // await connection.close();
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const keyword = req.query.keyword;
    if (keyword) {
        const searchedUser = yield UserInfo_1.default.find({ nickname: (0, typeorm_1.Like)(`%${keyword}%`) });
        res.send(searchedUser);
    }
    else {
        const searchedUser = yield UserInfo_1.default.find();
        res.send(searchedUser);
    }
    // await connection.close();
}));
