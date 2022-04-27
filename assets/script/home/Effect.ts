
import { _decorator, Component, AudioSource, assert, game } from 'cc';
import { EffectManager } from '../classes/EffectManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Effect
 * DateTime = Wed Apr 27 2022 10:12:30 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = Effect.ts
 * FileBasenameNoExtension = Effect
 * URL = db://assets/script/home/Effect.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Effect')
export class Effect extends Component {
    @property(AudioSource)
    private _audioSource: AudioSource = null!;

    onLoad () {
        const audioSource = this.getComponent(AudioSource)!;
        assert(audioSource);
        this._audioSource = audioSource;
        game.addPersistRootNode(this.node);

        EffectManager.init(audioSource);
    }
}

