import { environment } from "../../../environments/environment";

export const ERROR_CONFIG = {
    maxRetryAttempts: 3,
    telemetryEnabled: true,
    errorBoundaryFallback: true,
    logLevels: ["error", "warning", "critical"],
    errorReporting: {
        enabled: true,
        endpoint: `${environment.apiUrl}/error-reporting`
    }
};
