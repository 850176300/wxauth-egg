'use strict';

const Controller = require('egg').Controller;
var parseString = require('xml2js').parseString;
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
    try{
      ctx.logger.info("---------on----data-----dd-----"+JSON.stringify(ctx.params)+',,,'+JSON.stringify(ctx.queries));
      var buffer = [];
      ctx.req.on('readable', function(){
        ctx.logger.info("---------on----readable-----dd-----");
      });

      ctx.req.on('data', function(data){
        ctx.logger.info("---------on----data----------");
        buffer.push(data);
      });

      ctx.req.on('end', function(){
        ctx.logger.info("---------on----end----------");
        parseMessage(Buffer.concat(buffer), ctx);
      });

      ctx.req.on('error', function(err){
        ctx.logger.info("---------on----error----------"+err);
      });

      ctx.req.on('close', function(){
        ctx.logger.info("---------on----close----------");
      });

    }catch(e){
      ctx.logger.error(e);
    }
  }

  parseMessage(str, ctx){
    parseString(str, {explicitArray:false}, function(err, result){
      if (err){
        ctx.logger.error(err);
      }else{
        ctx.logger.info(result);
        var xmlResult = result.xml;
        var toUser = xmlResult.ToUserName; //接收方微信
        var fromUser = xmlResult.FromUserName;//发送仿微信
        if(xmlResult.Event=='subscribe'){//订阅
          //回复消息
          var xml=returntext(fromUser,toUser,'欢迎来到坚果宝宝的公众号');
          ctx.logger.info(xml);
          ctx.body = xml;
        }else if(xmlResult.Event=='unsubscribe'){//取消订阅
          ctx.logger.info(result.ToUserName+'取消订阅了公众号');
        } else{
          var xml=returntext(fromUser,toUser,xmlResult.Content);
          ctx.logger.info(xml);
          ctx.body = xml;
        }
      }
    });
  }



  returntext(toUser, fromUser, content){
    var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
    xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
    xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
    xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
    xmlContent += "<Content><![CDATA["+ content +"]]></Content></xml>";
    return xmlContent;
  }

}

module.exports = HomeController;
