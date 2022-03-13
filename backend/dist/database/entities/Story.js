"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Story = class Story extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Story.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' })
], Story.prototype, "creatorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], Story.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], Story.prototype, "thumbnailImageSrc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], Story.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' })
], Story.prototype, "audioFileSrc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 })
], Story.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        // type: 'date',
        // default: ()=> 'NOW()'
        type: "timestamp", default: () => "CURRENT_TIMESTAMP"
    })
], Story.prototype, "createdAt", void 0);
Story = __decorate([
    (0, typeorm_1.Entity)()
], Story);
exports.default = Story;
