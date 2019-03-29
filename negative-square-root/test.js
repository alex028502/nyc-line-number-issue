
const assert = require('assert');

const sut = require('.');

console.log('test negative square root function');

assert.equal(sut(9), -3);

assert.equal(sut(-4), 2); // this will get an exception
