export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTest.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@libs/(.*)$": "<rootDir>/src/libs/$1",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
