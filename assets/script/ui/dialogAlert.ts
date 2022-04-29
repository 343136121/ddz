import { find } from 'cc';
import { Prefab } from 'cc';
import { _decorator, Component, Node, Label, Button, Input,instantiate } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = dialogAlert
 * DateTime = Fri Apr 29 2022 16:11:19 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = dialogAlert.ts
 * FileBasenameNoExtension = dialogAlert
 * URL = db://assets/script/ui/dialogAlert.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('dialogAlert')
export class dialogAlert extends Component {

    @property({
        type: Label
    })
    public  content: Label = null!;

    @property(Button)
    public  btn_sure: Button = null!;


    public onEnable(){
        this.btn_sure.node.on(Input.EventType.TOUCH_START, this.clickSure, this);
    }

    public onDisable(){
        this.btn_sure.node.off(Input.EventType.TOUCH_START, this.clickSure, this);
    }

    public hide(){
        this.node.active = false;
    }

    public clickSure(){
        this.hide();
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
