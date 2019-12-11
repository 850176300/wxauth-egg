'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
var formstream = require('formstream');
const fs = require('fs');

class WxService extends Service{
    async checkSign(signToken, timestamp, nonce, echostr, signature){
        const str = [timestamp, nonce, signToken].sort().join('');
        const hash = crypto.createHash('sha1');
        hash.update(str);
        const sha = hash.digest('hex');
        return (sha == signature) ? echostr : 'error';
    }

    async getAccessToken(){
        const {ctx, app} = this;
        const url = app.config.wxApi.accessTokenUrl;
        const res = await ctx.curl(url, {dataType : 'json'});
        if (res.status === 200 && res.data.access_token){
            ctx.logger.info("---fetch----access_token:"+res.data.access_token+", app="+app);
            await this.app.redis.set(app.config.wxApi.accessTokenKey, res.data.access_token);
            return res.data.access_token;
        }else {
            return null;
        }
    }

    async getqrcodeurl(sceneId){
        const {ctx, app} = this;
        var accessToken = await app.redis.get(app.config.wxApi.accessTokenKey);
        if (accessToken === null){
            accessToken = await this.getAccessToken();
        }
        const url = app.config.wxApi.qrcodeUrl.replace('TOKEN', accessToken);
        ctx.logger.info("--------------url:"+url+',,,sceneId:'+sceneId);
        var res = await ctx.curl(url, {
            method:'POST', 
            data: {
                expire_seconds: 604800, 
                action_name: "QR_SCENE", 
                action_info: {
                    scene: {
                        scene_id: sceneId
                    }
                }
            }, 
            dataType:'json', 
            contentType:'json'
        });
        if (res.status === 200){
            ctx.logger.info("-----------res----------"+JSON.stringify(res.data));
            return res.data;
        }else {
            ctx.logger.info("-----------res---eee-------"+JSON.stringify(res.data));
            return null;
        }
    }
}

module.exports = WxService;