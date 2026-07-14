import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'mjs'],
  moduleNameMapper: {
    '^@sdcorejs/angular-material-datetime$': '<rootDir>/projects/datetime/src/public-api.ts',
  },
  testMatch: ['<rootDir>/projects/**/*.spec.ts'],
  collectCoverageFrom: [
    'projects/datetime/src/**/*.ts',
    '!projects/datetime/src/**/*.spec.ts',
    '!projects/datetime/src/public-api.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
    './projects/datetime/src/lib/native/': { branches: 95, functions: 95, lines: 95, statements: 95 },
  },
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
};

export default config;
