import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}]
    },
    verbose: true,
    // setupFiles: ['./jest.setup.ts'],
};

export default config;