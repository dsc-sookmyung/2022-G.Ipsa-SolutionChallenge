"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserInfoRouter_1 = require("./routers/UserInfoRouter");
const StoryRouter_1 = require("./routers/StoryRouter");
const LikeRouter_1 = require("./routers/LikeRouter");
const FollowRouter_1 = require("./routers/FollowRouter");
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const port = parseInt(process.env.PORT || '8080');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.enable('trust proxy');
app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/user', UserInfoRouter_1.UserInfoRouter);
app.use('/story', StoryRouter_1.StoryRouter);
app.use('/like', LikeRouter_1.LikeRouter);
app.use('/follow', FollowRouter_1.FollowRouter);
const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, '../build/swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
