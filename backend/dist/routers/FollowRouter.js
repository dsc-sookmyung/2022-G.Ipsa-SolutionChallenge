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
exports.FollowRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Follow_1 = __importDefault(require("../database/entities/Follow"));
const dbconnector_1 = __importDefault(require("../database/dbconnector"));
const typeorm_2 = require("typeorm");
const router = express_1.default.Router();
exports.FollowRouter = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const followerId = req.query.followerId;
    const creatorId = req.query.creatorId;
    if (followerId) {
        const searchedFollow = yield Follow_1.default.find({ where: { followerId: followerId } });
        res.send(searchedFollow);
    }
    else if (creatorId) {
        const searchedFollow = yield Follow_1.default.find({ where: { creatorId: creatorId } });
        res.send(searchedFollow);
    }
    else {
        const searchedFollow = yield Follow_1.default.find();
        res.send(searchedFollow);
    }
    yield connection.close();
}));
router.post('/click', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const body = req.body;
    const followerId = body.followerId;
    const creatorId = body.creatorId;
    const searchFollow = yield Follow_1.default.findOne({ where: { followerId: followerId, creatorId: creatorId } });
    if (searchFollow) {
        //팔로잉 상태. 언팔
        yield (0, typeorm_1.createQueryBuilder)()
            .delete()
            .from(Follow_1.default)
            .where({ followerId: followerId, creatorId: creatorId })
            .execute();
        res.send('Unfollowed');
    }
    else {
        //팔로 안되어있음. 팔로잉 시작.
        const follow = body;
        const newFollow = Follow_1.default.create(follow);
        yield newFollow.save();
        res.send('Following');
    }
    yield connection.close();
}));
