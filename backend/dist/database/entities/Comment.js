"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' })
], Comment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' })
], Comment.prototype, "storyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP"
    })
], Comment.prototype, "createdAt", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
exports.default = Comment;
