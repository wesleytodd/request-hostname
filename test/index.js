/* global describe, it */
var requestHostname = require('../');
var assert = require('assert');

function mockReq (host, xHost) {
	var req = {
		headers: {}
	};
	if (host) {
		req.headers['host'] = host;
	}
	if (xHost) {
		req.headers['x-forwarded-host'] = xHost;
	}

	return req;
}

var hosts = {
	'example.com': 'example.com',
	'www.example.com': 'www.example.com',
	'www.example.com:80': 'www.example.com',
	'foo.www.example.com': 'foo.www.example.com',
	'foo.www.example.com:80': 'foo.www.example.com',
	'localhost': 'localhost',
	'localhost:80': 'localhost',
	'127.0.0.1': '127.0.0.1',
	'127.0.0.1:80': '127.0.0.1',
	'[2001:0db8:0000:0000:0000:ff00:0042:8329]': '2001:0db8:0000:0000:0000:ff00:0042:8329',
	'[2001:db8:0:0:0:ff00:42:8329]': '2001:db8:0:0:0:ff00:42:8329',
	'[2001:db8::ff00:42:8329]': '2001:db8::ff00:42:8329',
	'[2001:0db8:0000:0000:0000:ff00:0042:8329]:80': '2001:0db8:0000:0000:0000:ff00:0042:8329',
	'[2001:db8:0:0:0:ff00:42:8329]:80': '2001:db8:0:0:0:ff00:42:8329',
	'[2001:db8::ff00:42:8329]:80': '2001:db8::ff00:42:8329'
};

describe('request-hostname', function () {
	it('should parse all types of host headers', function () {
		Object.keys(hosts).forEach(function (host) {
			assert.equal(requestHostname(mockReq(host)), hosts[host]);
		});
	});
	it('should override host header with x-forwarded-host', function () {
		assert.equal(requestHostname(mockReq('foo', 'bar')), 'bar');
	});
	it('should parse all types of x-forwarded-host headers', function () {
		Object.keys(hosts).forEach(function (host) {
			assert.equal(requestHostname(mockReq(null, host)), hosts[host]);
		});
	});
});
