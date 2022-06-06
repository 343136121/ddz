
import { BrowserUtil } from './../classes/BrowserUtil';
import { SceneNavigator } from './../classes/SceneNavigator';
import { CaseManager } from './../classes/CaseManager';

import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

import { Appnative } from '../classes/Appnative';
import { PopupAlert } from './../ui/PopupAlert';
import PopupManager from '../ui/PopupManager';
import { HttpUtil } from '../classes/HttpUtil';
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

    private room_id:any = 0;

    start () {

        this.checkLogin();

        // this.detectCaseParam();

        // const options2 = {
        //     title:'提示2',
        //     content:'网络问题2'
        // };
        // const params2 = {
        //     mode: PopupManager.CacheMode.Normal,
        //     priority: 0
        // }
        // PopupManager.show(PopupAlert.path, options2, params2);
        
        // const options = {
        //     title:'提示',
        //     content:'网络问题'
        // };
        // const params = {
        //     mode: PopupManager.CacheMode.Normal,
        //     priority: 1
        // }
        // PopupManager.show(PopupAlert.path, options, params);

        // const options3 = {
        //     title:'提示3',
        //     content:'网络问题3'
        // };
        // const params3 = {
        //     mode: PopupManager.CacheMode.Frequent,
        //     immediately: true
        // }
        // setTimeout(()=>{
        //     PopupManager.show(PopupAlert.path, options3, params3);
        // },2000)

    }

    checkLogin(){
        this.room_id = BrowserUtil.getUrlParam('room_id');
       
        var source = Appnative.checkUserAgent();
        if (source == 1 || source == 2) {
            let access_token = BrowserUtil.getUrlParam('access_token')
            alert(access_token)
            console.log('accessToken',access_token)
            if (access_token !== null) {
                if(parseInt(access_token) == 0 ){
                    let redirectUrl = sys.localStorage.getItem('redirectUrl')
                    sys.localStorage.removeItem('redirectUrl')
                    Appnative.dkLogin(redirectUrl)
                }

                let host = window.location.hostname

                HttpUtil.get('ddz/user/login',{
                    access_token:access_token,
                    host:host
                },(succ,data)=>{
                    console.log('succ and data',succ,data)
                    succ = true;
                    if(succ){
                        this.detectCaseParam();
                    }else{
                         // 如果不通过，则记录需要跳转的房间，再调用 Appnative.dkLogin();
                        let redirectUrl = sys.localStorage.getItem('redirectUrl')
                        sys.localStorage.removeItem('redirectUrl')
                        Appnative.dkLogin(redirectUrl)
                    }
                });


            } else {
                // 新版
                console.log('Appnative.dkWeboauth')
                sys.localStorage.setItem('redirectUrl',window.location.href)
                Appnative.dkWeboauth(window.location.href)
            }
        } 

    }

    detectCaseParam(){
        console.log(this.room_id)
        if (!!this.room_id) {
            // 跳转到指定示例
            const ok = CaseManager.goGame(this.room_id);
            if (!ok) {
               return false;
            }
        }
    }
    

}

