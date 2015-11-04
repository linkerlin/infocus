var log4js = require('log4js');
var config = require('config');
log4js.configure({
    appenders:[
        {
            type: 'console'
        },
        {
            type: 'file',
            filename: config.logger.path+"/biz.log",
            category: config.logger.category
        },
        {
            type: 'file',
            filename: config.logger.path+"/access.log",
            category: 'access'
        }
    ]
    ,replaceConsole:true
});

log4js.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};

module.exports = log4js;