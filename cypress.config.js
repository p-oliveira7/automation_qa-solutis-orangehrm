const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php?language=en",
    viewportHeight:720,
    viewportWidth:1280,
    defaultCommandTimeout: 6000,
    requestTimeout:6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
