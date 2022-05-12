
import { PopupAlert } from './../ui/PopupAlert';
import { SceneNavigator } from './SceneNavigator';
import { BrowserUtil } from './BrowserUtil';

import { _decorator, Component, Node,EventTarget } from 'cc';
import PopupManager from '../ui/PopupManager';
const { ccclass, property } = _decorator;
import { CaseInfoMap, CaseInfo } from './CaseList';
const eventTarget = new EventTarget()
/**
 * Predefined variables
 * Name = CaseManager
 * DateTime = Fri May 06 2022 14:31:21 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = CaseManager.ts
 * FileBasenameNoExtension = CaseManager
 * URL = db://assets/script/classes/CaseManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 * 发射和监听普通事件
 * https://docs.cocos.com/creator/manual/zh/engine/event/event-emit.html
 * eventTarget.on(type, func, target?);
 * eventTarget.emit(type, ...args);
 * 最多只支持传递 5 个事件参数
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
            eventTarget.emit('SWITCH_CASE', 'home');
        });
    }

    /**
     * 前往对应示例
     * @param room_id 房间号
     */
    public static goGame(room_id: string) {
        // 展示遮罩
        // CaseLoading.show();
        SceneNavigator.go('game', null, () => {
            // 设置当前 URL 的参数
            BrowserUtil.setUrlParam(`room_id=${room_id}`);
            // 发射事件
            console.log('SWITCH_ROOM')
            eventTarget.emit('SWITCH_ROOM', room_id);
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
