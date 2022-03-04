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
const UserInfo_1 = __importDefault(require("../database/entities/UserInfo"));
const router = express_1.default.Router();
exports.UserInfoRouter = router;
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req['body'];
    const newUser = UserInfo_1.default.create(user);
    yield newUser.save();
    res.send(newUser);
}));
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    console.log(keyword);
    const searchedUser = yield UserInfo_1.default.findOne({ where: { nickname: keyword } });
    res.send(searchedUser);
}));
