export const ENVIRONMENT = {
    DOCKER: 'docker',
    LOCAL: 'local',
    DEVELOPMENT: 'develop',
    TEST: 'test',
    PRE: 'preproduction',
    PRO: 'production',
};

export const DEVELOPMENT_ENVIRONMENT = [
    ENVIRONMENT.LOCAL,
    ENVIRONMENT.DEVELOPMENT,
    ENVIRONMENT.DOCKER,
    ENVIRONMENT.TEST,
];

export const isDevelopmentEnvironment = (env: string): boolean =>
    DEVELOPMENT_ENVIRONMENT.includes(env);
