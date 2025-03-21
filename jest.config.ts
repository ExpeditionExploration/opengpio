import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}]
    },
    verbose: true,
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
};

export default config;