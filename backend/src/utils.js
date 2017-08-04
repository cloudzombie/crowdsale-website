// Copyright Parity Technologies (UK) Ltd., 2017.
// Released under the Apache 2/MIT licenses.

'use strict';

const BigNumber = require('bignumber.js');

function validateHex (hex) {
  if (typeof hex !== 'string' || hex.substring(0, 2) !== '0x') {
    throw new Error('hex must be a `0x` prefixed string');
  }
}

function hex2int (hex) {
  validateHex(hex);

  return parseInt(hex.substring(2), 16);
}

function int2hex (int) {
  return `0x${int.toString(16)}`;
}

function hex2buf (hex) {
  validateHex(hex);

  return Buffer.from(hex.substring(2), 'hex');
}

function buf2hex (buf) {
  return `0x${buf.toString('hex')}`;
}

function hex2big (hex) {
  validateHex(hex);

  return new BigNumber(hex);
}

function buf2big (buf) {
  return hex2big(buf2hex(buf));
}

// The interface is the same
const big2hex = int2hex;

function pause (time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

function ejs2val (value, type) {
  if (Array.isArray(value)) {
    const subtype = /^(.+)\[.*\]$/.exec(type)[1];

    return value.map((val) => ejs2val(val, subtype));
  }

  if (/(int|fixed)/.test(type)) {
    return new BigNumber('0x' + value.toString('hex'));
  }

  if (/bytes/.test(type)) {
    return '0x' + value.toString('hex');
  }

  if (/address/.test(type)) {
    return '0x' + value.toString('hex');
  }

  return value;
}

module.exports = {
  ejs2val,
  hex2int,
  int2hex,
  hex2buf,
  buf2hex,
  hex2big,
  buf2big,
  big2hex,
  pause
};
