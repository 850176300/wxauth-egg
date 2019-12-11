'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const wechat = app.middleware.wechat({
    token:'1234qwer',
    appid:'wx3368ac6d8798843e',
    encodingAESKey:''
  });
  // router.get('/', controller.home.index);
  router.get('/qrcode', controller.home.qrcode);
  router.get('/', wechat);
  router.post('/', wechat);
};
