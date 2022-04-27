
import { assetManager, AudioClip, AudioSource } from "cc";

/**
 * Predefined variables
 * Name = EffectManager
 * DateTime = Wed Apr 27 2022 10:15:08 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = EffectManager.ts
 * FileBasenameNoExtension = EffectManager
 * URL = db://assets/script/classes/EffectManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 

export class EffectManager {
    private static _audioSource?: AudioSource;
    private static _cachedAudioClipMap: Record<string, AudioClip> = {};

    public static init (audioSource: AudioSource) {
        EffectManager._audioSource = audioSource;
    }

    public static playMusic () {
        const audioSource = EffectManager._audioSource!;

        audioSource.play();
    }

    public static pauseMusic () {
        const audioSource = EffectManager._audioSource!;

        audioSource.pause();
    }

    public static playSound(name: string) {
        const audioSource = EffectManager._audioSource!;

        const path = `audio/${name}`;
        let cachedAudioClip = EffectManager._cachedAudioClipMap[path];
        
        if (cachedAudioClip) {
            audioSource.playOneShot(cachedAudioClip, 1);
        } else {
            assetManager.resources?.load(path, AudioClip, (err, clip) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                
                EffectManager._cachedAudioClipMap[path] = clip;
                audioSource.playOneShot(clip, 1);
            });
        }
    }
}
