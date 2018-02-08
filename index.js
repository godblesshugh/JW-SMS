'use strict';

var request = require('request');
var client_id = '';
var msg_id = '';
var MD5_td_code = '';

/**
 * Send sms
 * @param {string} mobilePhoneNumber 
 * @param {string} msg_content content in sms
 * @param {int} timeout millisecond
 */
function sendSMS(mobilePhoneNumber, msg_content, timeout = 5000) {
    return new Promise((resolve, reject) => {
        if (!client_id) {
            return reject('client_id is null');
        }
        request({
            method: 'POST',
            uri: 'http://client.cloud.hbsmservice.com:8080/post_sms.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
            },
            form: {
                id: client_id,
                msg_id: msg_id,
                MD5_td_code: MD5_td_code,
                mobile: mobilePhoneNumber,
                msg_content: msg_content,
                ext: ''
            },
            timeout: timeout // 给服务器返回加一个超时时间，默认 5s
        }, function(err, res, body) {
            if ('0#1' != body) {
                return reject('错误001：短信发送失败！');
            } else {
                return resolve(body);
            }
        });
    });
}

var JWSMSService = {
    SendSMS: sendSMS
};

function initConfig(_client_id, _msg_id, _MD5_td_code) {
    client_id = _client_id;
    msg_id = _msg_id;
    MD5_td_code = _MD5_td_code;
    return JWSMSService;
}

module.exports.SendSMS = sendSMS;
module.exports.InitConfig = initConfig;