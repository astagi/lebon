var noble = require('noble');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Lebon() {
  this._discoveredPeripherals = [];
}

util.inherits(Lebon, EventEmitter);

Lebon.prototype.startScan = function (timeout) {
  var self = this;
  this._discoveredPeripherals = [];
  noble.on('discover', function(peripheral) {
    var discoveredPeripheral = {
      name: peripheral.advertisement.localName,
      uuid: peripheral.uuid,
      address: peripheral.address,
      noble_peripheral: peripheral
    };
    self._discoveredPeripherals.push(discoveredPeripheral);
    self.emit('discover', discoveredPeripheral);
  });
  noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
      noble.startScanning();
      this.emit('scanStart');
      if (timeout) {
        setTimeout(function() {
          self.stopScan();
        }, timeout);
      }
    } else {
      self.stopScan();
    }
  });
}

Lebon.prototype.stopScan = function () {
  noble.stopScanning();
  this.emit('scanStop', this._discoveredPeripherals);
}

Lebon.prototype.getDiscoveredPeripherals = function () {
  return this._discoveredPeripherals;
}

module.exports = Lebon;
