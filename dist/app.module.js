"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cars_module_1 = require("./cars/cars.module");
const bitcoin_module_1 = require("./bitcoin/bitcoin.module");
const health_module_1 = require("./health/health.module");
const users_module_1 = require("./users/users.module");
const toys_module_1 = require("./toys/toys.module");
const tasks_module_1 = require("./tasks/tasks.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: ':memory:',
                synchronize: true,
                autoLoadEntities: true,
            }),
            health_module_1.HealthModule,
            users_module_1.UsersModule,
            cars_module_1.CarsModule,
            toys_module_1.ToysModule,
            bitcoin_module_1.BitcoinModule,
            tasks_module_1.TasksModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map