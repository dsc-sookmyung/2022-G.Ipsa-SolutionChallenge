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
const Story_1 = __importDefault(require("../database/entities/Story"));
const router = express_1.default.Router();
exports.StoryRouter = router;
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const story = req['body'];
    const newStory = Story_1.default.create(story);
    yield newStory.save();
    res.send(newStory);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    if (keyword) {
        const searchedUser = yield Story_1.default.find({ where: { title: keyword } });
        res.send(searchedUser);
    }
    else {
        const searchedUser = yield Story_1.default.find();
        res.send(searchedUser);
    }
}));
