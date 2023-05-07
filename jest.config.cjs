module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/src/__mocks__/svg.ts',
  },
};
