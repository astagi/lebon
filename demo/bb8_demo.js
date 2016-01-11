var lebon = require('../');
var sphero = require("sphero");

var getRandomColor = function () {
  var color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };
  return color;
}

var getRandomDirection = function () {
  return Math.floor(Math.random() * 360);
}

var main = function(device) {
  bb8 = sphero(device.uuid);
  bb8.connection.noblePeripheral = device.noblePeripheral;
  bb8.connect(function() {
    console.log("You BB-8 is now connected!");
    setInterval(function() {
      bb8.color(getRandomColor());
      bb8.roll(0, getRandomDirection());
    }, 500);
  });
}

var start = function(bb8name) {
  lebon.on('discover', function(device) {
    if (device.name === bb8name) {
      lebon.stopScan();
      main(device);
    }
  });
  lebon.startScan(20000);
}

start('BB-CC91');