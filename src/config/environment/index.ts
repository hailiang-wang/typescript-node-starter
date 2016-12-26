'use strict';

const path = require('path');
const _ = require('lodash');

let env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();

var all = {
    env: env,
    root: path.normalize(__dirname + '/../..'),
    davidapi: {
        baseUrl: '',
        username: '',
        password: ''
    },
    mongo: {
        uris: '',
        options: {}
    },
    parse: {
        appId: 'philly',
        serverURL: 'http://localhost:1337/parse',
        javascriptKey: 'xxxx'
    },
    superscript: {
        botId: 1999
    }
};

export default _.merge(all, require('./' + env).default || {});