var should = require('should');
var sinon = require('sinon');
var Lebon = require('../lebon');
var noble = require('noble');

noble.startScanning = function () {};

var bb8Peripheral = {
  peripheral: 'BB8',
  uuid: '123456',
  address: '5:6',
  advertisement: {
      localName: 'device1'
  }
}

var bb8LebonPeripheral = {
  name: 'device1',
  uuid: '123456',
  address: '5:6',
  noble_peripheral: bb8Peripheral
}

describe('Lebon', function(){

  describe('#startScan()', function(){
    var clock;
    before(function () { clock = sinon.useFakeTimers(); });
    after(function () { clock.restore(); });
    it('should emit discover on noble discover', function(){
      var lebon = new Lebon();
      var spy = sinon.spy();
      lebon.on('discover', spy);
      lebon.startScan();
      noble.emit('discover', bb8Peripheral);
      spy.called.should.equal(true);
    });
    it('should emit scanStart on noble stateChange', function(){
      var lebon = new Lebon();
      var spy = sinon.spy();
      lebon.on('scanStop', spy);
      lebon.startScan(2000);
      noble.emit('stateChange', 'poweredOff');
      spy.called.should.equal(true);
    });
    it('should call stopScan if timeout is defined', function(){
      var lebon = new Lebon();
      var spy = sinon.spy();
      lebon.on('scanStop', spy);
      lebon.startScan(2000);
      noble.emit('stateChange', 'poweredOn');
      clock.tick(1999);
      spy.called.should.equal(false);
      clock.tick(1);
      spy.called.should.equal(true);
    });
  });

  describe('#stopScan()', function(){
    it('should emit scanStop on stopScan', function(){
      var lebon = new Lebon();
      var spy = sinon.spy();
      lebon.on('scanStop', spy);
      lebon.stopScan();
      spy.called.should.equal(true);
    });
  });

  describe('#getDiscoveredPeripherals()', function(){
    it('should return no discovered peripheral on start', function(){
      var lebon = new Lebon();
      var discoveredPeripherals = lebon.getDiscoveredPeripherals();
      discoveredPeripherals.should.be.instanceof(Array).and.have.lengthOf(0);
    });
    it('should return discovered peripherals', function(){
      var lebon = new Lebon();
      lebon.startScan();
      noble.emit('discover', bb8Peripheral);
      lebon.stopScan();
      var discoveredPeripherals = lebon.getDiscoveredPeripherals();
      discoveredPeripherals.should.be.instanceof(Array).and.have.lengthOf(1);
      discoveredPeripherals[0].name.should.be.equal('device1');
    });
  });

})
