module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
  },
  transformIgnorePatterns: [
    "node_modules/(?!@babel/runtime)" 
  ],
  coverageDirectory: "coverage", 
  coverageReporters: ["json", "lcov", "text", "clover"], 
};