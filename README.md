log4js-logstash-client
======================

[![NPM](https://nodei.co/npm/log4js-logstash-client.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/log4js-logstash-client/)

Installation
------------

```
npm i log4js-logstash-client --save
```

How to use
----------

```
const log4js = require('log4js');

log4js.configure({
	appenders: [
		{
			type: 'log4js-logstash-client',
			host: 'logstash.example.com.br',
			port: 9999,
			extend: {
				appName: 'name-your-app'
			}
		}
	]
});
```