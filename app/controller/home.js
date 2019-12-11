'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app, service } = this;
    var token ='1234qwer';
    //获取微信服务器发来的参数
    var signature = ctx.query.signature;
    var timestamp = ctx.query.timestamp;
    var echostr = ctx.query.echostr;
    var nonce = ctx.query.nonce;
    
    ctx.body = await service.home.checkSign(token, timestamp, nonce, echostr, signature);
  }


  async qrcode(){
    const {ctx, app, service} = this;
    var timestamp = Date.parse(new Date());
    var sceneId = timestamp + ":" + Math.random().toString(36).slice(-8);
    ctx.logger.info("---RandomKey："+sceneId);
    var data = await service.home.getqrcodeurl(sceneId);
    ctx.body = JSON.stringify(data);
  }


  async wechatreplay(){
    const {ctx} = this;
    ctx.logger.info("--------wechatreplay--------", ctx.query);
  }

}

module.exports = HomeController;
