"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToysModule = void 0;
const common_1 = require("@nestjs/common");
const create_toy_1 = require("./application/create-toy");
const delete_toy_1 = require("./application/delete-toy");
const get_toy_1 = require("./application/get-toy");
const list_toys_1 = require("./application/list-toys");
const update_toy_1 = require("./application/update-toy");
const toys_repository_1 = require("./application/toys.repository");
const toys_controller_1 = require("./infrastructure/controllers/toys.controller");
const in_memory_toys_repository_1 = require("./infrastructure/repositories/in-memory-toys.repository");
let ToysModule = class ToysModule {
};
exports.ToysModule = ToysModule;
exports.ToysModule = ToysModule = __decorate([
    (0, common_1.Module)({
        controllers: [toys_controller_1.ToysController],
        providers: [
            create_toy_1.CreateToy,
            delete_toy_1.DeleteToy,
            get_toy_1.GetToy,
            list_toys_1.ListToys,
            update_toy_1.UpdateToy,
            {
                provide: toys_repository_1.TOYS_REPOSITORY,
                useClass: in_memory_toys_repository_1.InMemoryToysRepository,
            },
        ],
        exports: [create_toy_1.CreateToy, delete_toy_1.DeleteToy, get_toy_1.GetToy, list_toys_1.ListToys, update_toy_1.UpdateToy],
    })
], ToysModule);
//# sourceMappingURL=toys.module.js.map