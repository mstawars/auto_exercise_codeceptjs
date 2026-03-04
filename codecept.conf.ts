import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: "./*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "https://www.saucedemo.com/",
      show: true,
      trace: true,
    },
    REST: {
      endpoint: process.env.API_BASE_URL || "https://dummyjson.com",
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 15000,
    },
    JSONResponse: {},
  },
  include: {
    I: "./steps_file",
  },

  gherkin: {
    features: "./features/**/*.feature",
    steps: [
      "./step_definitions/web/steps.ts",
      "./step_definitions/api/api.steps.ts",
    ],
  },
  plugins: {
    htmlReporter: {
      enabled: true,
    },
    allure: {
      enabled: true,
      require: "@codeceptjs/allure-legacy",
      outputDir: "output/allure-results",
    },
  },
  name: "nex",
};
