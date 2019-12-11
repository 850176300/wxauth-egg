'use strict';



exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.security = {
  xframe:{
    enable:false,
  }
}


