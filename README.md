# Request Hostname

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status](https://travis-ci.org/wesleytodd/request-hostname.svg?branch=master)](https://travis-ci.org/wesleytodd/request-hostname)
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

[npm-image]: https://img.shields.io/npm/v/request-hostname.svg
[npm-url]: https://npmjs.org/package/request-hostname
[downloads-image]: https://img.shields.io/npm/dm/request-hostname.svg
[downloads-url]: https://npmjs.org/package/request-hostname

Get the hostname from a request object.  Even if it is IPv6 or from `x-forwarded-host`.

## Install

```
$ npm install --save request-hostname
```

## Usage

```javascript
// Basic stuff
var requestHostname = require('request-hostname');
console.log(requestHostname(req)) // example.com

// Anything that looks like a standard node request object
var request = {
  headers: {
    host: 'www.example.com'
  }
};
console.log(requestHostname(request)) // www.example.com

// Also IPv6 or IPv4 hosts
var IPv6Request = {
  headers: {
    host: '[2001:0db8:0000:0000:0000:ff00:0042:8329]'
  }
};
console.log(requestHostname(IPv6Request)) // 2001:0db8:0000:0000:0000:ff00:0042:8329
```
