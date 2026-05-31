"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopmentEnvironment = exports.DEVELOPMENT_ENVIRONMENT = exports.ENVIRONMENT = void 0;
exports.ENVIRONMENT = {
    DOCKER: 'docker',
    LOCAL: 'local',
    DEVELOPMENT: 'develop',
    TEST: 'test',
    PRE: 'preproduction',
    PRO: 'production',
};
exports.DEVELOPMENT_ENVIRONMENT = [
    exports.ENVIRONMENT.LOCAL,
    exports.ENVIRONMENT.DEVELOPMENT,
    exports.ENVIRONMENT.DOCKER,
    exports.ENVIRONMENT.TEST,
];
const isDevelopmentEnvironment = (env) => exports.DEVELOPMENT_ENVIRONMENT.includes(env);
exports.isDevelopmentEnvironment = isDevelopmentEnvironment;
//# sourceMappingURL=constants.js.map