/**
 * Test App
 */

import { test } from 'ava';
import config from '../config/environment';

test.only.cb('App Test#config.env', t => {
    t.true(config.env === 'development', 'NODE_ENV is configured.');
    t.pass();
    t.end();
});