import { CaseManager } from './../classes/CaseManager';

import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import { AudioManager } from "../classes/AudioManager";
/**
 * Predefined variables
 * Name = btn_to_game
 * DateTime = Thu Jan 13 2022 11:05:41 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = btn_to_game.ts
 * FileBasenameNoExtension = btn_to_game
 * URL = db://assets/script/home/btn_to_game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('btn_to_game')
export class btn_to_game extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    toGame (){
        // director.loadScene("game")
        CaseManager.goGame('1')
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
