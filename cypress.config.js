const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ktnvqr",
 // watchForFileChanges: false,
 
  reporter:'cypress-mochawesome-reporter',
  video:true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});