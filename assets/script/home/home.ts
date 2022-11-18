
import { BrowserUtil } from './../classes/BrowserUtil';
import { SceneNavigator } from './../classes/SceneNavigator';
import { CaseManager } from './../classes/CaseManager';

import { _decorator, Component, Node, sys} from 'cc';
const { ccclass, property } = _decorator;

import { Appnative } from '../classes/Appnative';
import { PopupAlert } from './../ui/PopupAlert';
import PopupManager from '../ui/PopupManager';
import {fetch as fetchPolyfill} from 'whatwg-fetch'

/**
 * git remote set-url --add origin git@github.com:343136121/ddz.git
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
        // console.log(crypto.SHA1("Message").toString());
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
            // window.dkAccessTokenCallback = this.dkAccessTokenCallback;
            // Appnative.dkAccessToken('dkAccessTokenCallback')
        } 

    }

    dkAccessTokenCallback(data){
        console.log(data)
        var a = JSON.parse(data)
        let access_token = a.accesstoken
        let appkey = 'go9dnk49bkd9jd9ymel1kg6w0803mgq3'
        let appsecret = 'GOPtocNiBy'

       
        let that = this
        Appnative.thirdLogin(appkey,appsecret,access_token,window.location.hostname).then((res)=>{
            console.log('res',res)
            if(res.success){
                // 登陆成功就将userinfo和access_token记录在local仓库中，以供长链接使用。长链接也可使用本登陆接口
                sys.localStorage.setItem('access_token',access_token)
                sys.localStorage.setItem('host',window.location.hostname)
                sys.localStorage.setItem('userinfo',JSON.stringify(data.result))
                that.detectCaseParam();
            }else{
                sys.localStorage.removeItem('access_token')
                sys.localStorage.removeItem('host')
                sys.localStorage.removeItem('userinfo')
                Appnative.dkLogin(window.location.href)
            }
        })
        
        
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
    
