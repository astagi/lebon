var lebon = require('../');

var start = function(devices) {
  console.log(device)
}

lebon.on('scanStop', function(devices) {
  start(devices);
});

lebon.startScan(4000);
