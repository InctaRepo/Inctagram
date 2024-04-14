/* eslint-disable */
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: '',
})

const config: Config = {
  verbose: true,
  rootDir: 'src/',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>../jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/*Dynamic*.tsx',
    '!**/index.ts',
    '!<rootDir>shared/assets/icons/*.tsx',
    '!**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: '<rootDir>../coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>../__mocks__/svg.tsx',
    '^@/ui(.*)$': '<rootDir>shared/ui/$1',
    '^@/public(.*)$': '<rootDir>../public/$1',
    '^@/__mocks__(.*)$': '<rootDir>../__mocks__/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
