const argv = require('minimist')(process.argv.slice(2))
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const {execSync} = require("child_process");

let config = dotenv.config();

if (config.error) {
    config = {parsed: {}}
}

const envConfig = config.parsed;

const chromeHeadlessOption = process.env.npm_config_chromeHeadless || argv.chromeHeadless;
const isChromeHeadless = chromeHeadlessOption === 'false' ? '' : (envConfig.CHROME_HEADLESS === 'false' && chromeHeadlessOption !== 'true' ? '' : '--headless');

console.log(`Chrome mode is ${isChromeHeadless ? 'headless' : 'GUI'}`);

// Base url (FE url)
const BASE_URL_ENUM = {
    LOCALHOST: 'http://localhost:8081/',
    PROD: 'https://crplab.ru/'
};

const baseUrlFromConfig = config.parsed.BASE_URL;
const parsedBaseUrlFromConfig = BASE_URL_ENUM[baseUrlFromConfig] || baseUrlFromConfig;
const baseUrl = parsedBaseUrlFromConfig || BASE_URL_ENUM.LOCALHOST;

// Reports
const reporters = [
    'spec',
    ['allure', {
        outputDir: './_results_/allure-raw',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
    }]
];

// The number of times to retry the entire specfile when it fails as a whole
const specFileRetries = config.parsed.SPEC_FILE_RETRIES || 2;

// Level of logging verbosity: trace | debug | info | warn | error | silent
const LOG_LEVEL = {
    TRACE: 'trace',
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    SILENT: 'silent'
};

const logLevel = config.parsed.LOG_LEVEL || LOG_LEVEL.TRACE;

// Download directory for chrome
const downloadDirectory = path.join(__dirname, 'src/resources/temp/downloads');

// Suites
execSync('node ./suites/generator/main.mjs');

let suites = JSON.parse(fs.readFileSync('./suites/allSuites.json'));

const runnedSuitesArgv = argv.runnedSuites || config.parsed.RUNNED_SUITES;
const runnedSuitesNames = runnedSuitesArgv ? runnedSuitesArgv.split(',') : [];

let specs = [
    './src/specs/**/*.spec.ts'
];

if (runnedSuitesNames.length) {
    const specsByAgv = runnedSuitesNames.reduce((memo, suitesName) => {
        if (suites[suitesName]) {
            return [...new Set([...memo, ...suites[suitesName]])];
        } else {
            console.warn(`wdio.conf: Didn\`t find any spec for suite "${suitesName}"`);
            return memo;
        }
    }, []);

    if (!specs.length) {
        console.warn(`wdio.conf: Didn\`t find any spec for "RUNNED_SUITES=${runnedSuitesNames}"`);
    } else {
        specs = specsByAgv
    }
}

// Config
exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // Override default path ('/wd/hub') for chromedriver service.
    path: '/',

    specs,

    suites,

    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                // to run chrome headless the following flags are required
                // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
                args: ['--disable-gpu', 'window-size=1920x1080'].concat(isChromeHeadless ? [isChromeHeadless] : []),
                prefs: {
                    'directory_upgrade': true,
                    'prompt_for_download': false,
                    'download.default_directory': downloadDirectory
                }
            }
        }
    ],

    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver'],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    logLevel,

    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl,

    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,

    // Default request retries count
    connectionRetryCount: 3,

    specFileRetries,

    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    // =============================
    //      Reporter options
    // =============================
    outputDir: './_results_',
    reporters,

    // Framework you want to run your specs with.
    framework: 'jasmine',
    //
    // Options to be passed to Jasmine.
    // @ts-expect-error fixed in https://github.com/webdriverio/webdriverio/pull/6472
    jasmineOpts: {
        requires: ['@babel/register', 'tsconfig-paths/register'],
        defaultTimeoutInterval: 1000000
    }
};
