
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
        // [3]
        if(!this.isLogin){
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

        const options = {
            title:'提示',
            content:'网络问题'
        };
        const params = {
            mode: PopupManager.CacheMode.Frequent
        }
        PopupManager.show(PopupAlert.path, options, params);

        const options2 = {
            title:'提示2',
            content:'网络问题2'
        };
        PopupManager.show(PopupAlert.path, options2, params);

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
