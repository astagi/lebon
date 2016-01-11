var lebon = require('../');

lebon.on('discover', function(device) {
  console.log('New device discovered! ' + device.name);
});

lebon.startScan(20000);
