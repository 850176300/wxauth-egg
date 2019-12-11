'use strict'

const Subscription = require('egg').Subscription;

class GetAccessToken extends Subscription{
    static get schedule(){
        return {
            immediate: true,
            interval: 6500 * 1000,
            type: 'all'
        }
    }

    async subscribe(){
        const {ctx, service, app} = this;
        ctx.logger.info("------------getAccessToken----------");
        service.home.getAccessToken();
    }
}

module.exports = GetAccessToken;