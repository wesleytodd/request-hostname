'use strict';

module.exports = function (req) {
	// Dont error if nothing or an invalid request is passed
	if (!req || !req.headers) {
		return;
	}

	// Accept x-forwarded-host or host header
	var host = req.headers['x-forwarded-host'] || req.headers['host'];

	// Must be a string
	if (typeof host !== 'string') {
		return;
	}

	// Trim off whitespace
	host = host.trim();

	// Is ipv6?
	var isIPv6 = host.charAt(0) === '[';

	// Find end of host and begining of port
	var start;
	var end;
	if (isIPv6) {
		start = 1;
		end = host.indexOf(']');
	} else {
		start = 0;
		var i = host.indexOf(':') - 1;
		end = i < 1 ? host.length : i + 1;
	}

	// Strip off port
	return host.substring(start, end);
};
