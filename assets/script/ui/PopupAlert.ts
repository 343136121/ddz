
import { _decorator, Component, Node, Label, Button, Input } from 'cc';
const { ccclass, property } = _decorator;
import { PopupBase } from './PopupBase';

/**
 * Predefined variables
 * Name = PopupAlert
 * DateTime = Thu May 05 2022 15:32:49 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = PopupAlert.ts
 * FileBasenameNoExtension = PopupAlert
 * URL = db://assets/script/ui/PopupAlert.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('PopupAlert')
export class PopupAlert extends PopupBase<any> {

    @property(Label)
    protected title: Label = null;

    @property(Label)
    protected content: Label = null;

    @property(Button)
    protected btn_ok: Button = null;

    /** 弹窗路径 */
    public static get path() {
        return 'ui/PopupAlert';
    }

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {
        // this.btn_ok.node.on(Node.EventType.TOUCH_END, this.btn_okClick, this);
        this.btn_ok.node.on(Input.EventType.TOUCH_START,this.btn_okClick,this);
        
    }

    protected unregisterEvent() {

    }

    btn_okClick(){
        this.hide();
    }

    protected updateDisplay(options: any) {
        console.log('options',options)
        this.title.string = options.title?options.title:options;
        this.content.string = options.content?options.content:options;
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
