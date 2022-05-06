import { EventManager } from './EventManager';
import { PopupAlert } from './../ui/PopupAlert';
import { SceneNavigator } from './SceneNavigator';
import { BrowserUtil } from './BrowserUtil';

import { _decorator, Component, Node } from 'cc';
import PopupManager from '../ui/PopupManager';
const { ccclass, property } = _decorator;
import { CaseInfoMap, CaseInfo } from './CaseList';

/**
 * Predefined variables
 * Name = CaseManager
 * DateTime = Fri May 06 2022 14:31:21 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = CaseManager.ts
 * FileBasenameNoExtension = CaseManager
 * URL = db://assets/script/classes/CaseManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('CaseManager')
export class CaseManager {
    /**
     * 前往首页
     */
     public static goHome() {
        // 清除当前 URL 的参数
        BrowserUtil.clearUrlParam();
        // 跳转
        SceneNavigator.goHome(null, false, () => {
            // 事件
            EventManager.emit('SWITCH_CASE', 'home');
        });
    }

    /**
     * 前往对应示例
     * @param name 示例名称
     */
    public static goCase(name: string) {
        // 展示遮罩
        // CaseLoading.show();
        // 获取示例信息
        console.log('name',name)
        const info = this.getCaseInfo(name);
        if (!info) {
            PopupManager.show(PopupAlert.path,{title:'提示',content:'啊哦，没有找到这个示例'});
            // CaseLoading.hide();
            return false;
        }
        const sceneName = info.scene;
        SceneNavigator.go(sceneName, null, () => {
            // 设置当前 URL 的参数
            BrowserUtil.setUrlParam(`case=${name}`);
            // 发射事件
            EventManager.emit('SWITCH_CASE', sceneName);
            // 隐藏遮罩
            // CaseLoading.hide();
        });
        return true;
    }

    /**
     * 获取示例信息
     * @param name 示例名称
     */
    public static getCaseInfo(name: string): CaseInfo {
        return CaseInfoMap[name];
    }
    
}
