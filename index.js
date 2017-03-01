"use strict";

const Logstash = require('logstash-client');

/**
 * Simple layout parser for logstash message.
 * If message type is not string, parser will convert message into string using JSON.stringify.
 *
 * @param logEvt, fields
 * @returns {{@timestamp: string, @fields: {category: (categoryName|*), level: (levelStr|*)}}}
 */
function logstashLayout(logEvt, fields, extend) {
    const messageData = logEvt.data[0];
    const log = {
        '@timestamp': (new Date()).toISOString(),
        'level': logEvt.level.levelStr,
        'category': logEvt.categoryName,
        'message' : typeof messageData === 'string' ? messageData : JSON.stringify(messageData)
    };

    if(fields){
        log['fields'] = fields;
    }

    if(extend){
        Object.assign(log, extend);
    }

    return log;
}

function logStashClientAppender(layout, options){
    const logstash = new Logstash({
        type: options.connection, // udp, tcp, memory
        host: options.host,
        port: options.port
    });

    layout = layout || logstashLayout;

    return function(logEvt) {
        const message = layout(logEvt, options.fields, options.extend);

        logstash.send(message, () => {
            if(options.debug){
                console.log('Message sent successfully');
            }
        });
    };
}

/**
 * Config method, calls logStashClientAppender to return the logging function
 *
 * @param config
 * @returns {Function}
 */
function configure(config){
    let options = {
        host: 'localhost',
        port: 5959,
        connection: 'tcp'
    };

    if(config){
        Object.assign(options, config);
    }

    return logStashClientAppender(config.layout, options);
}

module.exports.appender = logStashClientAppender;
module.exports.configure = configure;
