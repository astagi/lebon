# Lebon

A tiny, convenient wrapper around Noble to easily scan BLE peripherals

[![npm version](https://img.shields.io/npm/v/lebon.svg)](https://www.npmjs.com/package/lebon)
[![Build Status](https://travis-ci.org/astagi/lebon.svg?branch=master)](https://travis-ci.org/astagi/lebon) [![codecov.io](https://codecov.io/github/astagi/lebon/coverage.svg?branch=master)](https://codecov.io/github/astagi/lebon?branch=master)

## Lebon peripheral discovered

    peripheral = {
      name: "Name",
      uuid: "UUID",
      address: "BT address",
      noblePeripheral: <Noble Peripheral Object>
    };

## Start scanning devices

    lebon.startScan(timeout);

Example:

    var lebon = require('lebon');

    lebon.on('discover', function(device) {
      console.log('New device discovered! ' + device.name);
    });

    lebon.startScan(20000);

## Stop scanning devices

    lebon.stopScan();

Example:

    var lebon = require('lebon');

    var start = function(device) {
      console.log(device.uuid)
    }

    lebon.on('discover', function(device) {
      if (device.name === 'BB-191') {
        lebon.stopScan();
        start(device);
      }
    });

    lebon.startScan(20000);

## Get latest devices scanned

    peripherals = lebon.getDiscoveredPeripherals()

## License

MIT © 2016 Andrea Stagi
