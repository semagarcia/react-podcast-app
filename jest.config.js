module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/src/**/*.stories.js',
  ],
  coveragePathIgnorePatterns: ['(test/.*.mock).(jsx?|tsx?)$'],
  coverageDirectory: '<rootDir>/reports/coverage/',
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    'components/(.*)': '<rootDir>/src/components/$1',
    'custom-hooks/(.*)': '<rootDir>/src/custom-hooks/$1',
    'mappers/(.*)': '<rootDir>/src/mappers/$1',
    'models/(.*)': '<rootDir>/src/models/$1',
    'utils/cors-enabler': '<rootDir>/src/utils/cors-enabler',
    'utils/time': '<rootDir>/src/utils/time',
    'views/(.*)': '<rootDir>/src/views/$1',
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    '@testing-library/jest-dom/extend-expect',
  ],
  testMatch: ['<rootDir>/src/**/(*.)test.{js, jsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.scss$': 'jest-scss-transform',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jsdom',
  verbose: true,
};
