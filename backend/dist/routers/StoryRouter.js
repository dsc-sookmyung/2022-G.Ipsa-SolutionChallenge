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
const UploadImage_1 = require("../config/UploadImage");
const dbconnector_1 = __importDefault(require("../database/dbconnector"));
const typeorm_2 = require("typeorm");
const router = express_1.default.Router();
exports.StoryRouter = router;
// const uploadImage : new UploadImage;
const multerMid = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
router.use(multerMid.single('file'));
router.post('/create', multerMid.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const body = req['body'];
    const audioFileUri = body.audioFileSrc;
    const thumbnailImageUri = body.thumbnailImageSrc;
    const audioUrl = yield UploadImage_1.UploadImage.uploadAudio(audioFileUri);
    const imageUrl = yield UploadImage_1.UploadImage.uploadImage(thumbnailImageUri);
    console.log(imageUrl);
    body.audioFileSrc = audioUrl;
    body.thumbnailImageSrc = imageUrl;
    const story = body;
    const newStory = Story_1.default.create(story);
    yield newStory.save();
    res.send(newStory);
    yield connection.close();
}));
router.post('/click', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const id = req.query.id;
    const clickedStory = yield Story_1.default.findOne({ where: { id: id } });
    res.send(clickedStory);
    yield connection.close();
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, typeorm_2.createConnection)(dbconnector_1.default);
    const keyword = req.query.keyword;
    if (keyword) {
        const searchedStory = yield Story_1.default.find({ title: (0, typeorm_1.Like)(`%${keyword}%`) });
        res.send(searchedStory);
    }
    else {
        const searchedStory = yield Story_1.default.find();
        res.send(searchedStory);
    }
    yield connection.close();
}));
