"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const common_1 = require("@nestjs/common");
const os = __importStar(require("os"));
const process = __importStar(require("process"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let StatusController = class StatusController {
    getStatus() {
        const uptime = os.uptime(); // Server uptime in seconds
        const memoryUsage = process.memoryUsage();
        const heapUsed = memoryUsage.heapUsed / 1024 / 1024; // Heap memory usage in MB
        const nodeVersion = process.version; // Node.js version
        const currentTimestamp = new Date().toISOString(); // Current timestamp
        let projectName = 'N/A';
        try {
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            projectName = packageJson.name;
        }
        catch (error) {
            console.error('Error reading package.json:', error);
        }
        return {
            uptime: Math.floor(uptime),
            heapMemory: parseFloat(heapUsed.toFixed(2)),
            nodeVersion,
            timestamp: currentTimestamp,
            projectName,
        };
    }
};
exports.StatusController = StatusController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "getStatus", null);
exports.StatusController = StatusController = __decorate([
    (0, common_1.Controller)('api/status')
], StatusController);
//# sourceMappingURL=status.controller.js.map