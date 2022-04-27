
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { PokeUtil } from './PokeUtil';
import { EffectManager } from './EffectManager';

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
        let sex = "男"
        let pokeUtil = new PokeUtil();

        if(checkedPokeOut.type == pokeUtil.pokeType['Dan']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/单牌${checkedPokeOut.value}`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/单牌J`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/单牌Q`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/单牌K`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/单牌A`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/单牌2`)
            }else if(checkedPokeOut.value == 16){
                EffectManager.playSound(`${sex}/单牌副`)
            }else if(checkedPokeOut.value == 17){
                EffectManager.playSound(`${sex}/单牌正`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/${checkedPokeOut.value}对`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/J对`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/Q对`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/K对`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/A对`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/2对`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui3']){
            EffectManager.playSound(`${sex}/3连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui4']){
            EffectManager.playSound(`${sex}/4连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui5']){
            EffectManager.playSound(`${sex}/5连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui6']){
            EffectManager.playSound(`${sex}/6连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui7']){
            EffectManager.playSound(`${sex}/7连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui8']){
            EffectManager.playSound(`${sex}/8连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui9']){
            EffectManager.playSound(`${sex}/9连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Dui10']){
            EffectManager.playSound(`${sex}/10连对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['San']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/3个${checkedPokeOut.value}`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/3个J`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/3个Q`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/3个K`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/3个A`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/3个2`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['San2']){
                //没配？
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDan']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/3个${checkedPokeOut.value}带1`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/3个J带1`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/3个Q带1`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/3个K带1`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/3个A带1`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/3个2带1`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDan2']){
            EffectManager.playSound(`${sex}/蝴蝶带单`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDan3']){
            EffectManager.playSound(`${sex}/3蝴蝶带单`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDan4']){
            EffectManager.playSound(`${sex}/4蝴蝶带单`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDan5']){
            EffectManager.playSound(`${sex}/5蝴蝶带单`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDui']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/3${checkedPokeOut.value}腐乳`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/3J腐乳`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/3Q腐乳`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/3K腐乳`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/3A腐乳`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/32腐乳`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDui2']){
            EffectManager.playSound(`${sex}/蝴蝶带对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDui3']){
            EffectManager.playSound(`${sex}/3蝴蝶带对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SanDui4']){
            EffectManager.playSound(`${sex}/4蝴蝶带对`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun5']){
            EffectManager.playSound(`${sex}/5个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun6']){
            EffectManager.playSound(`${sex}/6个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun7']){
            EffectManager.playSound(`${sex}/7个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun8']){
            EffectManager.playSound(`${sex}/8个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun9']){
            EffectManager.playSound(`${sex}/9个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun10']){
            EffectManager.playSound(`${sex}/10个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun11']){
            EffectManager.playSound(`${sex}/11个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['Shun12']){
            EffectManager.playSound(`${sex}/12个顺`)
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SiDan']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/4个${checkedPokeOut.value}带2`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/4个J带2`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/4个Q带2`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/4个K带2`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/4个A带2`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/4个2带2`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['SiDui']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/4个${checkedPokeOut.value}带对子`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/4个J带对子`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/4个Q带对子`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/4个K带对子`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/4个A带对子`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/4个2带对子`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['ZhaDan']){
            if(checkedPokeOut.value<=10){
                EffectManager.playSound(`${sex}/${checkedPokeOut.value}炸`)
            }else if(checkedPokeOut.value == 11){
                EffectManager.playSound(`${sex}/J炸`)
            }else if(checkedPokeOut.value == 12){
                EffectManager.playSound(`${sex}/Q炸`)
            }else if(checkedPokeOut.value == 13){
                EffectManager.playSound(`${sex}/K炸`)
            }else if(checkedPokeOut.value == 14){
                EffectManager.playSound(`${sex}/A炸`)
            }else if(checkedPokeOut.value == 15){
                EffectManager.playSound(`${sex}/2炸`)
            }
        }else if(checkedPokeOut.type == pokeUtil.pokeType['HuoJian']){
            EffectManager.playSound(`${sex}/王炸`)
        }

    }
}
