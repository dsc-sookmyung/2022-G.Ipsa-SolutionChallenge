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
exports.LikeRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const LikeEntity_1 = __importDefault(require("../database/entities/LikeEntity"));
const Story_1 = __importDefault(require("../database/entities/Story"));
const dbconnector_1 = __importDefault(require("../database/dbconnector"));
const typeorm_2 = require("typeorm");
const router = express_1.default.Router();
exports.LikeRouter = router;
router.post('/click', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const body = req.body;
    const likedStoryId = body.likedStoryId;
    const userId = body.userId;
    const searchLike = yield LikeEntity_1.default.findOne({ where: { userId: userId, likedStoryId: likedStoryId } });
    const storyLikes = yield Story_1.default.find({ where: { id: likedStoryId }, select: ['likes'] });
    let newLikes;
    if (searchLike) {
        //좋아요가 존재. 좋아요를 취소해야함
        yield (0, typeorm_1.createQueryBuilder)()
            .delete()
            .from(LikeEntity_1.default)
            .where({ userId: userId, likedStoryId: likedStoryId })
            .execute();
        newLikes = storyLikes[0].likes - 1;
        yield (0, typeorm_1.createQueryBuilder)()
            .update(Story_1.default)
            .set({ likes: newLikes })
            .where({ id: likedStoryId })
            .execute();
        res.send('cancle like');
    }
    else {
        //좋아요가 없음. 지금 좋아요 누름.
        const like = body;
        const newLike = LikeEntity_1.default.create(like);
        yield newLike.save();
        newLikes = storyLikes[0].likes + 1;
        yield (0, typeorm_1.createQueryBuilder)()
            .update(Story_1.default)
            .set({ likes: newLikes })
            .where({ id: likedStoryId })
            .execute();
        res.send('new like');
    }
    yield connection.close();
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const userId = req.query.userId;
    const storyId = req.query.storyId;
    if (userId) {
        const searchedLike = yield LikeEntity_1.default.find({ where: { userId: userId } });
        res.send(searchedLike);
    }
    else if (storyId) {
        const searchedLike = yield LikeEntity_1.default.find({ where: { likedStoryId: storyId } });
        res.send(searchedLike);
    }
    else {
        const searchedLike = yield LikeEntity_1.default.find();
        res.send(searchedLike);
    }
    yield connection.close();
}));
router.get('/cnt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const userId = req.query.userId;
    const storyId = req.query.storyId;
    if (userId) {
        const searchedLike = yield LikeEntity_1.default.findAndCount({ where: { userId: userId } });
        res.send(searchedLike[1].toString());
    }
    else if (storyId) {
        const searchedLike = yield LikeEntity_1.default.findAndCount({ where: { likedStoryId: storyId } });
        res.send(searchedLike[1].toString());
    }
    else {
        const searchedLike = yield LikeEntity_1.default.findAndCount();
        res.send(searchedLike[1].toString());
    }
    yield connection.close();
}));
router.get('/story', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const userId = req.query.userId;
    const searchedStory = yield (0, typeorm_1.createQueryBuilder)()
        .from(Story_1.default, 'story')
        .innerJoin(LikeEntity_1.default, 'le', 'story.id = le.likedStoryId')
        .where("le.userId = :userId", { userId: userId })
        .getRawMany();
    res.send(searchedStory);
    yield connection.close();
}));
