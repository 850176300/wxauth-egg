/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.EGG_SERVER_ENV = 'prod';

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575970676262_5039';

  const bodyParserConfig = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text:['text/xml', 'application/json']
    }
  };

  config.bodyParser = bodyParserConfig;
  // add your middleware config here
  config.middleware = [];

  config.redis = {
    client:{
      port: 6379,
      host: '127.0.0.1',
      password: 'Darli0912',
      db: 0
    }
  };

  config.wxApi = {
    accessTokenKey: 'WXACCESS_TOKENKEY',
    accessTokenUrl : 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3368ac6d8798843e&secret=da2f4510bac125d8c88ab0924338660f',
    qrcodeUrl: 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN'
  };

  config.cluster = {
    listen:{
      port:80
    }
  };

  config.security = {
    csrf:{
      enable:false,
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
