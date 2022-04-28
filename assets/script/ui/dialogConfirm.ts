
import { _decorator, Component, Node, Label, Button, Input } from 'cc';
const { ccclass, property } = _decorator;
import { CustomEventListener } from '../classes/CustomEventListener';

/**
 * Predefined variables
 * Name = dialogConfirm
 * DateTime = Thu Apr 28 2022 15:26:33 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = dialogConfirm.ts
 * FileBasenameNoExtension = dialogConfirm
 * URL = db://assets/script/ui/dialogConfirm.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('dialogConfirm')
export class dialogConfirm extends Component {
    @property({
        type: Label
    })
    public  title: Label = null!;

    @property({
        type: Label
    })
    public  content: Label = null!;

    @property({
        type:Button
    })
    public  btn_cancel: Button = null!;

    @property(Button)
    public  btn_sure: Button = null!;

    public onEnable(){
        this.btn_cancel.node.on(Input.EventType.TOUCH_START, this.clickCancel, this);
        this.btn_sure.node.on(Input.EventType.TOUCH_START, this.clickSure, this);
    }

    public clickCancel(){
        CustomEventListener.dispatchEvent('dialog_cancel');
    }

    public clickSure(){
        CustomEventListener.dispatchEvent('dialog_sure');
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
