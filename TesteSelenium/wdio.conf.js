export const config = {
  runner: 'local',
  specs: [
    './test/**/*.js'
  ],
  exclude: [],

  maxInstances: 1,

  capabilities: [{
    browserName: 'firefox',
    /* 'moz:firefoxOptions': {
      args: ['-headless'] // remova esse argumento se quiser ver o navegador rodando
    } */
  }],

  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://brenorcunha.pythonanywhere.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    ['firefox-profile', {
      'browser.startup.homepage': 'https://brenorcunha.pythonanywhere.com',
      'layout.css.devPixelsPerPx': '1.0',
      'xpinstall.signatures.required': false
    }]
  ],

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
