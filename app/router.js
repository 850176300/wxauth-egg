'use strict';
const wechat = require('wechat');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/qrcode', controller.home.qrcode);
  router.use('/', controller.home.wechatreplay);
};
