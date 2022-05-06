import { BrowserUtil } from './../classes/BrowserUtil';
import { SceneNavigator } from './../classes/SceneNavigator';
import { CaseManager } from './../classes/CaseManager';

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Appnative } from '../classes/Appnative';
import { PopupAlert } from './../ui/PopupAlert';
import PopupManager from '../ui/PopupManager';
/**
 * Predefined variables
 * Name = home
 * DateTime = Fri Apr 22 2022 10:00:26 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = home.ts
 * FileBasenameNoExtension = home
 * URL = db://assets/script/home/home.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('home')
export class home extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    private isLogin = false;

    start () {

        this.checkLogin();

        this.detectCaseParam();

        const options = {
            title:'提示',
            content:'网络问题'
        };
        const params = {
            mode: PopupManager.CacheMode.Normal,
            priority: -1
        }
        PopupManager.show(PopupAlert.path, options, params);

        // const options2 = {
        //     title:'提示2',
        //     content:'网络问题2'
        // };
        // const params2 = {
        //     mode: PopupManager.CacheMode.Normal,
        //     priority: 0
        // }
        // PopupManager.show(PopupAlert.path, options2, params2);

        const options3 = {
            title:'提示3',
            content:'网络问题3'
        };
        const params3 = {
            mode: PopupManager.CacheMode.Frequent,
            immediately: true
        }
        setTimeout(()=>{
            // PopupManager.show(PopupAlert.path, options3, params3);
        },2000)

    }

    checkLogin(){
        if(!this.isLogin){  
            // BrowserUtil.clearUrlParam();    // 或者可先存到某个变量中，待登录完成跳转
            var source = Appnative.checkUserAgent();
            if (source == 1 || source == 2) {
                let accessToken = Appnative.getUrlParam('access_token')
                let timestamp = Appnative.getUrlParam('timestamp')
                console.log("accessToken",accessToken)
                if (accessToken !== false) {
                    // 发送登陆请求，https://third.nj.nbtv.cn/v2/open/user/get
                    // 如果不通过，则调用 Appnative.dkLogin(); 从头来过
                } else {
                    // 新版
                    Appnative.dkWeboauth()
                }
            } 
        }
    }

    detectCaseParam(){
        const caseName = Appnative.getUrlParam('case');
        if (caseName) {
            // 跳转到指定示例
            const ok = CaseManager.goCase(caseName);
            if (!ok) {
               return false;
            }
        }
    }
    

}

