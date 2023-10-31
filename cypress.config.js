const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;
require('dotenv').config();
module.exports = defineConfig({
  env: {
    ...process.env,
  },
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php?language=en",
    specPattern: "cypress/features/*.feature",
    viewportHeight:720,
    viewportWidth:1280,
    defaultCommandTimeout: 6000,
    requestTimeout:6000,

    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber())
    },
  },
});
