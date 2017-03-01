const log4jsAppender = require('./index');

const log = log4jsAppender.configure({
    type: 'log4js-logstash-client',
    host: 'logging.bluesoft.com.br',
    port: 9999,
    extend: {
        appName: 'bluelearning'
    }
});

log({ level: {levelStr: 'ERROR'}, categoryName: 'LOGS', data: { error: true, errorMessage: "something happened"} });
