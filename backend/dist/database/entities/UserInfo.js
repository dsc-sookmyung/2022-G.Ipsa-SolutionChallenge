"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let UserInfo = class UserInfo extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], UserInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true })
], UserInfo.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], UserInfo.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' })
], UserInfo.prototype, "showBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' })
], UserInfo.prototype, "isCreator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], UserInfo.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], UserInfo.prototype, "profileImageSrc", void 0);
UserInfo = __decorate([
    (0, typeorm_1.Entity)()
], UserInfo);
exports.default = UserInfo;
