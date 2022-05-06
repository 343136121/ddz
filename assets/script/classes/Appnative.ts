
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Appnative
 * DateTime = Fri Apr 22 2022 09:41:03 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = Appnative.ts
 * FileBasenameNoExtension = Appnative
 * URL = db://assets/script/classes/Appnative.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 * 
 * referenceUrl = https://cdn.dknb.nbtv.cn/asset/dknb/js/appnative.bac.js
 */
 
@ccclass('Appnative')
export class Appnative {
    
    //检测设备 ios=1 android=2 other=0
    static checkUserAgent() {
        var userAgent = navigator.userAgent;
        var indexOfAndroid = userAgent.indexOf('dknbandroid');
        var indexOfIOS = userAgent.indexOf('dknbios');
        if(indexOfIOS >= 0) {
          return 1;
        } else if(indexOfAndroid >= 0) {
          return 2;
        } else {
          return 0;
        }
    }
    
    //获取url中的参数
    static getUrlParam(name):any {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null && r[2] != 0)
        return unescape(r[2]);
        return false;
    }

    /**
     * 新版IOS原生交互
     * @param functionName  方法名
     * @param params
     * 无参方法传入null或不传
     * 有参方法传入key=>value 对象，此为新版ios交互的参数格式如
     * { id => 1 }
     */
    static iosNative(functionName, params) {
        params = params ? params : null
        let that = this

        var t = setTimeout(function() {
        if(that.checkNjIos()) {
            window.webkit.messageHandlers[functionName].postMessage(params)
        } else {
            if(params) {
            // 多参兼容
            const arr = Object.values(params)
            native[functionName](...arr);
            } else {
            // 无参方法
            native[functionName]();
            }
        }
        clearTimeout(t);
        }, 0);
    }

    // 检测ios是否为新版webview
    static checkNjIos() {
        var userAgent = navigator.userAgent;
        var indexOfIOS = userAgent.indexOf('njios');
        return indexOfIOS >= 0
    }


    /**
     * [dkWeboauth 网页授权登陆并跳转]
     * @param  {string} url [跳转的url]
     */
    static dkWeboauth(url) {
        var userAgent = this.checkUserAgent();
        if(userAgent == 1) {
        this.iosNative('dkWeboauth', {
            url: url
        })
        } else if(userAgent == 2) {
        android.dkWeboauth(url);
        } else {
        console.log('dkWeboauth')
        }
    }

    /**
     * [dkLogin 弹出native登录框]
     * @param  {[string]} url [登陆后跳转地址]
     * @param  {[string]} type [1:默认;2:兑吧;]
     */
    static dkLogin(url, type) {
        url = arguments[0] == undefined ? '' : url;
        type = arguments[1] == undefined ? '1' : type;
        var userAgent = this.checkUserAgent();
        if(userAgent == 1) {
        this.iosNative('dkLogin', {
            url: url,
            type, type
        })
        } else if(userAgent == 2) {
        android.dkLogin(url, type);
        } else {
    
        }
    }
    
    /*
    * 调用native页面分享功能
    * @param {type} info
    * @param {[int]} type 1:微信好友;2:微信朋友圈;3:QQ好友;
    */
    static dkShare(info, type) {
        type = arguments[1] == undefined ? 0 : type;
        var userAgent = this.checkUserAgent();
        if(userAgent == 1) {
        this.iosNative('dkShare', {
            info: info,
            type, type
        })
        } else if(userAgent == 2) {
        android.dkShare(JSON.stringify(info), type);
        }
    }

}

