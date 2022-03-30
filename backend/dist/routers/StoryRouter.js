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
exports.StoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Story_1 = __importDefault(require("../database/entities/Story"));
const multer_1 = __importDefault(require("multer"));
const FileUpload_1 = require("../config/FileUpload");
const dbconnector_1 = __importDefault(require("../database/dbconnector"));
const typeorm_2 = require("typeorm");
const UserInfo_1 = __importDefault(require("../database/entities/UserInfo"));
const LikeEntity_1 = __importDefault(require("../database/entities/LikeEntity"));
const router = express_1.default.Router();
exports.StoryRouter = router;
const connectionManager = (0, typeorm_1.getConnectionManager)();
const multerMid = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    // limits: {
    //   fieldSize: 10 * 1024 * 1024,
    // },
});
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const body = req['body'];
    const story = body;
    const newStory = Story_1.default.create(story);
    yield newStory.save();
    res.send(newStory);
    // await connection.close();
}));
function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + 'gipsa-upload/' + filename;
}
router.post('/imageUpload', multerMid.single('image'), (req, res) => {
    var _a;
    FileUpload_1.FileUpload.uploadThumbnail(req);
    const imageUrl = getPublicUrl('storyImageSrc/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname));
    console.log(imageUrl);
    res.send({ url: imageUrl });
});
router.post('/audioUpload', multerMid.single('audio'), (req, res) => {
    var _a;
    FileUpload_1.FileUpload.uploadAudio(req);
    const audioUrl = getPublicUrl('storyAudioSrc/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname));
    console.log(audioUrl);
    res.send({ url: audioUrl });
});
router.get('/click', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const id = req.query.id;
    const clickedStory = yield yield (0, typeorm_1.createQueryBuilder)()
        .from(Story_1.default, 'st')
        .leftJoin(UserInfo_1.default, 'ui', 'ui.uid = st.creatorId')
        .where('id = :id', { id: id })
        .getRawOne();
    res.send(clickedStory);
    // await connection.close();
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const keyword = req.query.keyword;
    const creatorId = req.query.creatorId;
    if (keyword) {
        const searchedStory = yield (0, typeorm_1.createQueryBuilder)()
            .from(Story_1.default, 'st')
            .leftJoin(UserInfo_1.default, 'ui', 'ui.uid = st.creatorId')
            .where('st.title like :key', { key: `%${keyword}%` })
            .getRawMany();
        res.send(searchedStory);
    }
    else if (creatorId) {
        const searchedStory = yield (0, typeorm_1.createQueryBuilder)()
            .from(Story_1.default, 'st')
            .leftJoin(UserInfo_1.default, 'ui', "ui.uid = st.creatorId")
            .where("st.creatorId = :creatorId", { creatorId: creatorId })
            .getRawMany();
        res.send(searchedStory);
    }
    else {
        const searchedStory = yield (0, typeorm_1.createQueryBuilder)()
            .select('st')
            .select('ui.uid')
            .from(Story_1.default, 'st')
            .leftJoin(UserInfo_1.default, 'ui', 'st.creatorId= ui.uid')
            .getRawMany();
        res.send(searchedStory);
    }
    // await connection.close();
}));
router.get('/cnt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const keyword = req.query.keyword;
    const creatorId = req.query.creatorId;
    if (keyword) {
        const searchedStory = yield Story_1.default.findAndCount({ title: (0, typeorm_1.Like)(`%${keyword}%`) });
        res.send(searchedStory[1].toString());
    }
    else if (creatorId) {
        const searchedStory = yield Story_1.default.findAndCount({ where: { creatorId: creatorId } });
        res.send(searchedStory[1].toString());
    }
    else {
        const searchedStory = yield Story_1.default.findAndCount();
        res.send(searchedStory[1].toString());
    }
    // await connection.close();
}));
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!connectionManager.has('default')) {
        const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    }
    const id = req.query.id;
    yield (0, typeorm_1.createQueryBuilder)()
        .from(Story_1.default, 'st')
        .delete()
        .where('id = :id', { id: id })
        .execute();
    yield (0, typeorm_1.createQueryBuilder)()
        .from(LikeEntity_1.default, 'le')
        .delete()
        .where('likedStoryId = :id', { id: id })
        .execute();
    res.send('deleted');
    // await connection.close();
}));
