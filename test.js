const log4jsAppender = require('./index');

const log = log4jsAppender.configure({
    type: 'log4js-logstash-client',
	host: 'logstash.example.com.br',
	port: 9999,
	extend: {
		appName: 'name-your-app'
	}
});

log({ level: {levelStr: 'ERROR'}, categoryName: 'LOGS', data: { error: true, errorMessage: "something happened"} });
