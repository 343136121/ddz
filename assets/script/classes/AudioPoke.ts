
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PokeUtil } from './PokeUtil';
import { AudioManager } from './AudioManager';

/**
 * Predefined variables
 * Name = AudioPoke
 * DateTime = Tue Apr 26 2022 16:50:35 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = AudioPoke.ts
 * FileBasenameNoExtension = AudioPoke
 * URL = db://assets/script/classes/AudioPoke.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('AudioPoke')
export class AudioPoke {
    // 根据牌型播放对应语音
    static playSound(checkedPokeOut){
        let sex = "A"
        let pokeUtil = new PokeUtil();

        if(checkedPokeOut.type == pokeUtil.pokeType['Dan']){
            if(checkedPokeOut.value<=10){
                AudioManager.playSound(`${sex}/单牌${checkedPokeOut.value}`)
            }else if(checkedPokeOut.value == 11){
                AudioManager.playSound(`${sex}/单牌J`)
            }else if(checkedPokeOut.value == 12){
                AudioManager.playSound(`${sex}/单牌Q`)
            }else if(checkedPokeOut.value == 13){
                AudioManager.playSound(`${sex}/单牌K`)
            }else if(checkedPokeOut.value == 14){
                AudioManager.playSound(`${sex}/单牌A`)
            }else if(checkedPokeOut.value == 15){
                AudioManager.playSound(`${sex}/单牌2`)
            }else if(checkedPokeOut.value == 16){
                AudioManager.playSound(`${sex}/单牌副`)
            }else if(checkedPokeOut.value == 17){
                AudioManager.playSound(`${sex}/单牌正`)
            }
        }

    }
}
