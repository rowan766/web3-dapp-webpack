const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ackkp7',
  e2e: {
    baseUrl: 'http://localhost:3003', // 改为您的应用地址
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
