
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = HttpUtil
 * DateTime = Thu May 12 2022 16:41:33 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = HttpUtil.ts
 * FileBasenameNoExtension = HttpUtil
 * URL = db://assets/script/classes/HttpUtil.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('HttpUtil')
export class HttpUtil {
    private static baseUrl: string = "http://192.168.1.29/dknb/sites/game/web/";

    public static get(url, params: object = {}, callback) {
        let dataStr = '';
        Object.keys(params).forEach(key => {
            dataStr += key + '=' + encodeURIComponent(params[key]) + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
        url = HttpUtil.baseUrl + url;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.timeout = 5000;
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    let httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                } else {
                    callback(false, response);
                }
            }
        };
        xhr.send();
    }

    //Post请求
    public static post(url, param: object = {}, callback) {
        url = HttpUtil.baseUrl + url;
        var xhr = new XMLHttpRequest();
        let dataStr = '';
        Object.keys(param).forEach(key => {
            dataStr += key + '=' + encodeURIComponent(param[key]) + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        }
        xhr.open("POST", url, true);
        xhr.timeout = 5000;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"
        );
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let response = xhr.responseText;
                if (xhr.status >= 200 && xhr.status < 300) {
                    let httpStatus = xhr.statusText;
                    callback(true, JSON.parse(response));
                } else {
                    callback(false, response);
                }
            }
        };
        xhr.send(dataStr);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
