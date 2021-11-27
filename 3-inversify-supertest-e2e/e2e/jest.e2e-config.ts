export default {
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["../setup-tests.ts"],
}
