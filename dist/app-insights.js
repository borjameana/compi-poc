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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApplicationInsights = setApplicationInsights;
const common_1 = require("@nestjs/common");
const appInsights = __importStar(require("applicationinsights"));
const ContextStore = __importStar(require("request-context"));
function setApplicationInsights() {
    if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
        appInsights
            .setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
            .setSendLiveMetrics(true)
            .setAutoCollectConsole(true, true)
            .start();
        const telemetry = appInsights.defaultClient;
        telemetry.addTelemetryProcessor((envelope, context) => {
            const baseData = envelope?.data?.baseData;
            if (!baseData) {
                return true;
            }
            if (appInsights.Contracts.domainSupportsProperties(baseData)) {
                const httpRequest = context?.['http.ServerRequest'];
                const exclude = ['/', '/health'];
                if (httpRequest && exclude.includes(httpRequest.originalUrl)) {
                    return false;
                }
                const requestId = ContextStore.get('requestId');
                if (requestId) {
                    baseData.properties.requestId = requestId;
                }
            }
            return true;
        });
        appInsights.defaultClient.commonProperties = {
            environment: process.env.NODE_ENV || '',
        };
        common_1.Logger.log('Application Insights (telemetry) applied correctly');
    }
    else {
        common_1.Logger.log('Application Insights (telemetry) NOT applied');
    }
}
//# sourceMappingURL=app-insights.js.map