# Lebon

## Lebon peripheral discovered

    peripheral = {
      name: "Name",
      uuid: "UUID",
      address: "BT address",
      noble_peripheral: <Noble Peripheral Object>
    };

## Start scanning devices

    lebon.startScan(timeout);

Example:

    var lebon = require('./lebon');

    lebon.on('discover', function(device) {
      console.log('New device discovered! ' + device.name);
    });

    lebon.startScan(20000);

## Stop scanning devices

    lebon.stopScan();

Example:

    var lebon = require('./lebon');

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


MIT (c) 2016 Andrea Stagi
