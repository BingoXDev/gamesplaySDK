

const axios = require("axios");
const querystring = require('querystring');
const md5 = require('md5');
const config = require('../config.js');
const utils = require('../utils.js');

//原始参数
const params = {
  app_id: config.app_id,
  token: config.demo_token,
};

//计算签名字符串
const str = utils.getSignContent(params);
const sign = md5(str + config.app_key);

//转成表单数据
const postData = querystring.stringify({ ...params, sign });
// console.log(postData);
//提交api调用
axios.post(config.baseUri + '/Player/getSendSetting', postData).then(res => {
  if (res.data.status == 200) {//成功
    console.log(res.data);
  } else {
    console.log('失败!' + res.data.mess);
    console.log(res.data.data);
  }
});
