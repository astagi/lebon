var lebon = require('../');

var start = function(device) {
  console.log(device.uuid)
}

lebon.on('discover', function(device) {
  if (device.name === 'Charge HR') {
    lebon.stopScan();
    start(device);
  }
});

lebon.startScan(20000);
