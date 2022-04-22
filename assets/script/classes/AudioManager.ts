import { assetManager, AudioClip, AudioSource } from "cc";

export class AudioManager {
    private static _audioSource?: AudioSource;
    private static _cachedAudioClipMap: Record<string, AudioClip> = {};

    // init AudioManager in GameRoot component.
    public static init (audioSource: AudioSource) {
        AudioManager._audioSource = audioSource;
    }

    public static playMusic () {
        const audioSource = AudioManager._audioSource!;

        audioSource.play();
    }

    public static pauseMusic () {
        const audioSource = AudioManager._audioSource!;

        audioSource.pause();
    }

    public static playSound(name: string) {
        const audioSource = AudioManager._audioSource!;

        const path = `audio/${name}`;
        let cachedAudioClip = AudioManager._cachedAudioClipMap[path];
        console.log('cachedAudioClip',cachedAudioClip)
        if (cachedAudioClip) {
            audioSource.playOneShot(cachedAudioClip, 1);
        } else {
            assetManager.resources?.load(path, AudioClip, (err, clip) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                
                AudioManager._cachedAudioClipMap[path] = clip;
                audioSource.playOneShot(clip, 1);
            });
        }
    }
}