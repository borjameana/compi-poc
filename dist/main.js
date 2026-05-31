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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const node_crypto_1 = require("node:crypto");
const ContextStore = __importStar(require("request-context"));
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
const options_validation_pipe_1 = require("./shared/infrastructure/pipes/options.validation.pipe");
const app_insights_1 = require("./app-insights");
function swaggerSetup(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('Starter API')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/docs', app, document);
    common_1.Logger.log('Swagger configured');
}
async function bootstrap() {
    (0, app_insights_1.setApplicationInsights)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use(ContextStore.middleware('request'));
    app.use((req, _res, next) => {
        const headerId = req.headers['x-request-id'];
        const requestId = typeof headerId === 'string' ? headerId : (0, node_crypto_1.randomUUID)();
        ContextStore.set('requestId', requestId);
        next();
    });
    app.use((0, helmet_1.default)({ hsts: true }));
    app.useGlobalPipes(options_validation_pipe_1.validationPipe);
    const nodeEnv = configService.get('NODE_ENV') || constants_1.ENVIRONMENT.LOCAL;
    if ((0, constants_1.isDevelopmentEnvironment)(nodeEnv)) {
        app.enableCors({
            origin: '*',
            credentials: true,
        });
        swaggerSetup(app);
    }
    else {
        app.enableCors({
            origin: [
                configService.get('FRONT_URL') || '',
                configService.get('EXTRA_ALLOWED_ORIGIN') || '',
            ].filter(Boolean),
            optionsSuccessStatus: common_1.HttpStatus.OK,
        });
    }
    const serverPort = configService.get('PORT') || 3020;
    await app.listen(serverPort);
    common_1.Logger.log(`Server start on port: ${serverPort}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map