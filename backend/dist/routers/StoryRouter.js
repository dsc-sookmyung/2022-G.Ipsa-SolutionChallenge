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
const router = express_1.default.Router();
exports.StoryRouter = router;
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const story = req['body'];
    const newStory = Story_1.default.create(story);
    yield newStory.save();
    res.send(newStory);
}));
router.post('/click', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const clickedStory = yield Story_1.default.findOne({ where: { id: id } });
    res.send(clickedStory);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    if (keyword) {
        const searchedStory = yield Story_1.default.find({ title: (0, typeorm_1.Like)(`%${keyword}%`) });
        res.send(searchedStory);
    }
    else {
        const searchedStory = yield Story_1.default.find();
        res.send(searchedStory);
    }
}));
