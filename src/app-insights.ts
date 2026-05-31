import { Logger } from '@nestjs/common';
import * as appInsights from 'applicationinsights';
import * as ContextStore from 'request-context';

export function setApplicationInsights(): void {
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

            if (appInsights.Contracts.domainSupportsProperties(baseData as appInsights.Contracts.Domain)) {
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

        Logger.log('Application Insights (telemetry) applied correctly');
    } else {
        Logger.log('Application Insights (telemetry) NOT applied');
    }
}
