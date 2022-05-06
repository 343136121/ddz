

import { _decorator, Component, Node, BlockInputEvents, tween, UITransform, UIOpacity, Vec3 } from 'cc';
import { DEV } from 'cc/env';
const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = PopupBase
 * DateTime = Thu May 05 2022 15:33:41 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = PopupBase.ts
 * FileBasenameNoExtension = PopupBase
 * URL = db://assets/script/ui/PopupBase.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('PopupBase')
export class PopupBase<Options = any> extends Component {

    @property({ type: Node, tooltip: DEV && '背景遮罩' })
    public background: Node = null;

    @property({ type: Node, tooltip: DEV && '弹窗主体' })
    public main: Node = null;

    /**
     * 展示/隐藏动画的时长
     */
    public animationDuration: number = 0.3;

    /**
     * 用于拦截点击的节点
     */
    protected blocker: Node = null;

    /**
     * 弹窗选项
     */
    protected options: Options = null;

    /**
     * 展示弹窗
     * @param options 弹窗选项
     * @param duration 动画时长
     */
    public async show(options?: Options, duration?: number) {
        console.log('show')
        // 储存选项
        this.options = options;
        // 初始化
        this.init(options);
        // 更新样式
        this.updateDisplay(options);
        // 弹窗回调
        this.onBeforeShow && await this.onBeforeShow();
        // 展示动画
        if (duration == undefined) {
            duration = duration < 0 ? 0 : this.animationDuration;
        }
        await this.playShowAnimation(duration);
        // 弹窗回调
        this.onAfterShow && this.onAfterShow();
    }

    /**
     * 隐藏弹窗
     * @param suspended 是否被挂起
     * @param duration 动画时长
     */
    public async hide(suspended: boolean = false, duration?: number) {
        const node = this.node;
        // 动画时长不为 0 时拦截点击事件（避免误操作）
        if (duration !== 0) {
            let blocker = this.blocker;
            if (!blocker) {
                blocker = this.blocker = new Node('blocker');
                blocker.addComponent(BlockInputEvents);
                blocker.setParent(node);
                blocker.addComponent(UITransform);
                blocker.getComponent(UITransform).setContentSize(node.getComponent(UITransform).contentSize);
            }

            blocker.active = true;
        }
        // 弹窗回调
        this.onBeforeHide && await this.onBeforeHide(suspended);
        // 播放隐藏动画
        if (duration == undefined) {
            duration = duration < 0 ? 0 : this.animationDuration;
        }
        await this.playHideAnimation(duration);
        // 关闭拦截
        this.blocker && (this.blocker.active = false);
        // 关闭节点
        node.active = false;
        // 弹窗回调
        this.onAfterHide && this.onAfterHide(suspended);
        // 弹窗完成回调
        this.finishCallback && this.finishCallback(suspended);
    }

    /**
     * 播放弹窗展示动画（派生类请重写此函数以实现自定义逻辑）
     * @param duration 动画时长
     */
    protected playShowAnimation(duration: number): Promise<void> {
        return new Promise<void>(res => {
            // 初始化节点
            const background = this.background,
                main = this.main;
            this.node.active = true;
            background.active = true;
            const backgroundOpacity = background.getComponent(UIOpacity)
            backgroundOpacity.opacity = 0
            main.active = true;
            const mainOpacity = main.getComponent(UIOpacity)
            mainOpacity.opacity = 0;
            // 背景遮罩
            tween(backgroundOpacity)
                .to(duration * 0.5, { opacity: 255 })
                .start();
            // 弹窗主体
            tween(mainOpacity)
                .to(duration, { opacity: 255 }, { easing: 'backOut' })
                .call(res)
                .start();
        });
    }

    /**
     * 播放弹窗隐藏动画（派生类请重写此函数以实现自定义逻辑）
     * @param duration 动画时长
     */
    protected playHideAnimation(duration: number): Promise<void> {
        return new Promise<void>(res => {
            // 背景遮罩
            tween(this.background.getComponent(UIOpacity))
                .delay(duration * 0.5)
                .to(duration * 0.5, { opacity: 0 })
                .start();
            // 弹窗主体
            tween(this.main.getComponent(UIOpacity))
                .to(duration, { opacity: 0 }, { easing: 'backIn' })
                .call(res)
                .start();
        });
    }

    /**
     * 初始化（派生类请重写此函数以实现自定义逻辑）
     * @param options 弹窗选项
     */
    protected init(options: Options) {

    }

    /**
     * 更新样式（派生类请重写此函数以实现自定义逻辑）
     * @param options 弹窗选项
     */
    protected updateDisplay(options: Options) {

    }

    /**
     * 弹窗展示前（派生类请重写此函数以实现自定义逻辑）
     */
    protected onBeforeShow(): Promise<void> {
        return new Promise(res => res());
    }

    /**
     * 弹窗展示后（派生类请重写此函数以实现自定义逻辑）
     */
    protected onAfterShow() {

    }

    /**
     * 弹窗隐藏前（派生类请重写此函数以实现自定义逻辑）
     * @param suspended 是否被挂起
     */
    protected onBeforeHide(suspended: boolean): Promise<void> {
        return new Promise(res => res());
    }

    /**
     * 弹窗隐藏后（派生类请重写此函数以实现自定义逻辑）
     * @param suspended 是否被挂起
     */
    protected onAfterHide(suspended: boolean) {

    }

    /**
     * 弹窗被挂起（派生类请重写此函数以实现自定义逻辑）
     */
    protected onSuspended(): Promise<void> {
        return new Promise(res => res());
    }

    /**
     * 弹窗流程结束回调（注意：该回调为 PopupManager 专用，重写 hide 函数时记得调用该回调）
     */
    protected finishCallback: (suspended: boolean) => void = null;

}