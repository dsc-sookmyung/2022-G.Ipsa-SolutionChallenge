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
const UserInfo_1 = __importDefault(require("../database/entities/UserInfo"));
const router = express_1.default.Router();
exports.FollowRouter = router;
const connectionManager = (0, typeorm_1.getConnectionManager)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const followerId = req.query.followerId;
    const creatorId = req.query.creatorId;
    if (followerId) {
        //이 유저가 팔로잉하는 크리에이터들 리턴
        const searchedCreator = yield (0, typeorm_1.createQueryBuilder)(Follow_1.default, 'fl')
            .leftJoin(UserInfo_1.default, 'ui', 'ui.id = fl.creatorId')
            .where('fl.followerId = :followerId', { followerId: followerId })
            .getRawMany();
        res.send(searchedCreator);
    }
    else if (creatorId) {
        //이 유저를 팔로우하는 팔로워들 리턴
        const searchedFollow = yield (0, typeorm_1.createQueryBuilder)(Follow_1.default, 'fl')
            .leftJoin(UserInfo_1.default, 'ui', 'ui.id = fl.followerId')
            .where('fl.creatorId = :creatorId', { creatorId: creatorId })
            .getRawMany();
        res.send(searchedFollow);
    }
    else {
        const searchedFollow = yield Follow_1.default.find();
        res.send(searchedFollow);
    }
    // await connection.close();
}));
router.get('/cnt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const followerId = req.query.followerId;
    const creatorId = req.query.creatorId;
    if (followerId) {
        //이 유저가 팔로잉하는 크리에이터들 리턴
        const searchedCreator = yield (0, typeorm_1.createQueryBuilder)(Follow_1.default, 'fl')
            .leftJoin(UserInfo_1.default, 'ui', 'ui.id = fl.creatorId')
            .where('fl.followerId = :followerId', { followerId: followerId })
            .getCount();
        res.send(searchedCreator.toString());
    }
    else if (creatorId) {
        //이 유저를 팔로우하는 팔로워들 리턴
        const searchedFollow = yield (0, typeorm_1.createQueryBuilder)(Follow_1.default, 'fl')
            .leftJoin(UserInfo_1.default, 'ui', 'ui.id = fl.followerId')
            .where('fl.creatorId = :creatorId', { creatorId: creatorId })
            .getCount();
        res.send(searchedFollow.toString());
    }
    else {
        const searchedFollow = yield Follow_1.default.findAndCount();
        res.send(searchedFollow[1].toString());
    }
    // await connection.close();
}));
router.post('/click', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const body = req.body;
    const followerId = body.followerId;
    const creatorId = body.creatorId;
    const searchFollow = yield Follow_1.default.findOne({ where: { followerId: followerId, creatorId: creatorId } });
    if (searchFollow) {
        //팔로잉 상태. 언팔
        yield (0, typeorm_1.createQueryBuilder)(Follow_1.default)
            .delete()
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
    // await connection.close();
}));
