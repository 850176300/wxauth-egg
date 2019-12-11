const wechat = require('co-wechat');
 
module.exports = (options, app) => {
    return wechat(options).middleware(async (message, ctx) => {
        let { MsgType, Content } = message;
        ctx.logger.info('----------------news---------'+JSON.stringify(message));
        if (MsgType == 'news'){
            return '欢迎订阅';
        }else{
            return '欢迎订阅';
        }
    });
};
