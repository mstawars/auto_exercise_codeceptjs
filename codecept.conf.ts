require: ["ts-node/register"];

import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";

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
      show: false,
      trace: false,
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
    loginPage: "./pages/loginPage.ts",
    inventoryPage: "./pages/inventoryPage.ts",
    cartPage: "./pages/cartPage.ts",
    checkoutPage: "./pages/checkoutPage.ts",
    productPage: "./pages/productPage.ts",
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
