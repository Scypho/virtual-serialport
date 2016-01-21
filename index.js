var events = require('events');
var util = require('util');

var VirtualSerialPort = function(path, options, openImmediately, callback) {
	events.EventEmitter.call(this);

	var self = this;
	var open = false;

	this.writeToComputer = function(data) {
		self.emit("data", data);
	};

    if (openImmediately || openImmediately === undefined || openImmediately === null) {
        process.nextTick(function() {
            self.open(callback);
        });
    }
};

var VirtualStream = function() {
};

util.inherits(VirtualStream, events.EventEmitter);

VirtualStream.prototype.pipe = function() {};
VirtualStream.prototype.unpipe = function() {};

util.inherits(VirtualSerialPort, VirtualStream);

VirtualSerialPort.prototype.open = function open(callback) {
    this.open = true;
    this.emit('open');
    if (callback) {
        callback();
    }
};

VirtualSerialPort.prototype.isOpen = function isOpen() {
    return this.open;
};

VirtualSerialPort.prototype.write = function write(buffer, callback) {
    if (this.open) this.emit("dataToDevice", buffer);
    // This callback should receive both an error and result, however result is
    // undocumented so I do not know what it should contain
    if (callback) {
        callback();
    }
};

VirtualSerialPort.prototype.pause = function pause() {
};

VirtualSerialPort.prototype.resume = function resume() {
};

VirtualSerialPort.prototype.flush = function flush(callback) {
    if (callback) {
        callback();
    }
};

VirtualSerialPort.prototype.drain = function drain(callback) {
    if (callback) {
        callback();
    }
};

VirtualSerialPort.prototype.close = function close(callback) {
    this.removeAllListeners();
    if (callback) {
        callback();
    }
};

module.exports = VirtualSerialPort;
