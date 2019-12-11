const wechat = require('co-wechat');
 
module.exports = (options, app) => {
    return wechat(options).middleware(async (message, ctx) => {
        let { MsgType, Event, EventKey, FromUserName, Content } = message;
        ctx.logger.info('----------------POST---------'+JSON.stringify(message));
        if (MsgType == 'event'){
            if (Event == "subscribe"){
                return '欢迎订阅';
            }
        }else{
            return '欢迎订阅';
        }
    });
};
