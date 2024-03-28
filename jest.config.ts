import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: 'src/',
})

const config: Config = {
  rootDir: 'src/',
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>../jest.setup.ts'],
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>../coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // transform: {
  //   // '^.+\\.(ts|tsx)$': 'ts-jest',
  //   '^.+\\.(t|j)sx?$': '@swc/jest',
  // },
  // moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/../__mocks__/svg.tsx',
    '^@/ui(.*)$': '<rootDir>/shared/ui/$1',
    '^@/public(.*)$': '<rootDir>/../public/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '__mocks__/customRender': '<rootDir>/../__mocks__/customRender.tsx',
  },
  // testMatch: ['**/*.test.*'],
  // collectCoverageFrom: [
  //   '<rootDir>/**/*.tsx',
  //   '!<rootDir>/**/*.stories.tsx',
  //   '!**/__snapshots__/**',
  // ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
