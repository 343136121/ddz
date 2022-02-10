
import { _decorator, Component, Node, Prefab, SpriteAtlas, Sprite, instantiate, Input, Mask, UITransform, Rect } from 'cc';
const { ccclass, property } = _decorator;
import { PokeUtil } from '../classes/PokeUtil';
import Xhr from 'xhr';
import * as _ from 'lodash';
/**
 * Predefined variables
 * Name = game
 * DateTime = Thu Jan 13 2022 16:08:08 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = game.ts
 * FileBasenameNoExtension = game
 * URL = db://assets/script/game/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('game')
export class game extends Component {
    public pokeArr:string[];


    @property(SpriteAtlas)
    public myAtlas: SpriteAtlas;
    @property(Node)
    public myHand: Node;  //  手牌
    @property(Node)
    public myOut: Node;   //  出牌
    public myPoke:any[];
    public sortType:number = 1; // 1:大到小排序;2:牌型排序，炸弹最大;
    @property(Node)
    public btn_sort:Node;
    @property(Node)
    public btn_chupai:Node;
    public myPokeOut:any[];
    // 当前牌池类型与大小，判断能否出这个牌压上（后台需要时刻交互）


    @property(SpriteAtlas)
    public rightAtlas: SpriteAtlas;
    @property(Node)
    public rightHand: Node;  //  手牌
    @property(Node)
    public rightOut: Node;   //  出牌
    public rightPoke:any[];

    @property(SpriteAtlas)
    public leftAtlas: SpriteAtlas;
    @property(Node)
    public leftHand: Node;  //  手牌
    @property(Node)
    public leftOut: Node;   //  出牌
    public leftPoke:any[];

    // 地主牌位置
    @property(Node)
    public bossNode: Node;
    public bossPoke: string[];

    // 牌背
    @property(SpriteAtlas)
    public backAtlas: SpriteAtlas;

    @property(Prefab)
    public pokePrefab: Prefab;
    @property(Node)
    public pokeMask:Node;

    start () {
        // [3]
    }

    onEnable (){
        
        this.createWs();

        window.setTimeout(()=>{
            this.ws.send(JSON.stringify({
                'type':'start'
            }));
        },1000);

        this.onTouchEvent();
    }

    onDisable(){
        this.offTouchEvent();
    }

    ws: WebSocket;
    createWs(){
        let that = this;
        this.ws = new WebSocket("ws://127.0.0.1:10282");

        // this.ws = new WebSocket("ws://192.168.1.7:10282");
        // this.ws = new WebSocket("ws://118.178.129.190:10282");
        
        this.ws.onopen = function (event) {
            
        };
        this.ws.onmessage = function (event) {
            let json = event.data;
            let data = JSON.parse(json)
            console.log(data)
            // 此处判断后台传来的json数据
            switch(data.type){
                case "hand":
                    that.myPoke = data.data
                    that.createMyHand(that.myPoke.length);  
                    that.btn_sort.on(Input.EventType.TOUCH_START,that.toggleSortType,that);// 做个按钮切换sortType
                    that.btn_chupai.on(Input.EventType.TOUCH_START,that.chupai,that);// 出牌
                    break;
            }
        };
        this.ws.onerror = function (event) {
            
        };
        this.ws.onclose = function (event) {
            
        };

    }

    public positionY;
    createMyHand (num) {
        this.myHand.removeAllChildren();
        // 排序，两种方式
        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.myPoke));
        this.myPoke = poke.sort(this.sortType);

        for (var i = this.myHand.children.length; i < num; i++) {

            this.addOnePoke("poke-"+this.myPoke[i].tag, this.myHand, this.myAtlas, this.pokePrefab,i);
            // this.myHand.children[i].on(Input.EventType.TOUCH_START,this.clickMyHand,this);

            // 获取其中一张牌的y值便于以后操作
            this.positionY = this.myHand.children[i].position.y;
        }
    }

    addOnePoke (atlasName,layout,atlas,prefab,i) {
    
        var poke = instantiate(prefab);
        var frame = atlas.getSpriteFrame(atlasName);
        poke.getComponent(Sprite).spriteFrame = frame;

        let pokeMask = instantiate(this.pokeMask)
        // 以后直接做跟卡牌同等大小的圆角矩形图
        // pokeMask.active = true;
        pokeMask.getComponent(UITransform).width = poke.getComponent(UITransform).width;
        pokeMask.getComponent(UITransform).height = poke.getComponent(UITransform).height;

        layout.addChild(poke);
        poke.addChild(pokeMask)

        // 默认未被选中 
        poke.selected = false;
        poke.touched = false;

        // 将牌信息写入节点方便判断
        poke.poke = this.myPoke[i]
    }

    toggleSortType(){
        this.sortType = 3 - this.sortType;
        this.createMyHand(this.myPoke.length);
        // console.warn(
        //     "toggleSortTypeDone",this.sortType,
        //     'this.myPoke',this.myPoke,
        //     "this.myHand.children",this.myHand.children
        // );
    }

    chupai(){

        // 先清除
        this.myOut.removeAllChildren();

        // 出牌
        var length = this.pokePrepare.length;
        // console.log(this.myPoke)
        // console.log(this.myHand.children)
        for (var k=length-1;k>=0;k--) {
            this.myPoke.splice(this.pokePrepare[k],1);
        }

        for(var i in this.myPokeOut){
            this.addOnePoke("poke-"+this.myPokeOut[i].tag, this.myOut, this.myAtlas, this.pokePrefab,i);
        }

        // 重新排序手牌
        this.createMyHand(this.myPoke.length);  

    }

    update (deltaTime: number) {
        // [4]

    }

    // 滑动选牌监听

    _touchBegan;
    _touchMoved;
    onTouchEvent () {
        this.myHand.on(Input.EventType.TOUCH_START, this.touchBegan, this);
        this.myHand.on(Input.EventType.TOUCH_END, this.touchEnd, this);
        this.myHand.on(Input.EventType.TOUCH_MOVE, this.touchMoved, this);
    }

    offTouchEvent () {
        this.myHand.off(Input.EventType.TOUCH_START, this.touchBegan, this);
        this.myHand.off(Input.EventType.TOUCH_END, this.touchEnd, this);
        this.myHand.off(Input.EventType.TOUCH_MOVE, this.touchMoved, this);
    }

     /**
     * Touch begin
     * 当前触摸的点 是否在牌的区域
     * */
    _getCardForTouch (touch) {
        // 判断每张牌是否被触摸划过
        var length = this.myHand.children.length
        for (var k=0;k<length;k++) {
            // 每张牌的box
            var box = this.myHand.children[k].getComponent(UITransform).getBoundingBoxToWorld();
            // 每张牌的触摸box,如果是最后一张则整张牌均可触摸
            var rect = new Rect(box.x,box.y,k==length-1?box.width:box.width/4,box.height);
            
            this.myHand.children[k].touched = false;
            this.myHand.children[k].children[0].active = false;
            if(rect.contains(touch)){
                this.myHand.children[k].touched = true;
                this.myHand.children[k].children[0].active = true;
            }

        }
    }

    _checkSelectCardReserve(){
        // 滑动矩形框  如果不在范围内，取消选择
        var p = this._touchBegan.x < this._touchMoved.x ? this._touchBegan : this._touchMoved;
        var width = Math.abs(this._touchBegan.x - this._touchMoved.x);
        var height = Math.abs(this._touchBegan.x - this._touchMoved.x);
        height = height<5?5:height;
        var rect = new Rect(p.x,p.y,width,height);
        var length = this.myHand.children.length
        for (var k=0;k<length;k++) {
            // 每张牌的box
            var box = this.myHand.children[k].getComponent(UITransform).getBoundingBoxToWorld();
            // 每张牌的触摸box,如果是最后一张则整张牌均可触摸
            var rectPoke = new Rect(box.x,box.y,k==length-1?box.width:box.width/4,box.height);
            if(!rect.intersects(rectPoke)){
                this.myHand.children[k].touched = false;
                this.myHand.children[k].children[0].active = false;
            }else{
                this.myHand.children[k].touched = true;
                this.myHand.children[k].children[0].active = true;
            }

        }
    }

    /**
     * 开始点击  TOUCH_START回调函数，坐标均为世界坐标
     * */
     touchBegan (event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getUILocation();
        // console.warn("event",event,"touches",touches,"touchLoc",touchLoc);

        this._touchBegan = touchLoc;
        this._getCardForTouch( touchLoc);
    }

    /**
     * 移动  TOUCH_MOVE回调函数
     * */
    touchMoved (event) {
        var touches = event.getTouches();
        var touchLoc = touches[0].getUILocation();
        this._touchMoved = touchLoc;
        this._getCardForTouch(touchLoc);
        this._checkSelectCardReserve()
    }

    /**
     * 点击结束  TOUCH_END回调函数
     * 把所有touched为true的牌都转换状态
     * */
    public pokePrepare;
    touchEnd (event) {
        this.pokePrepare = [];
        for (var k in this.myHand.children) {
            // 处于触摸状态则需要切换牌的上下
            if(this.myHand.children[k].touched){
                this.myHand.children[k].selected = !this.myHand.children[k].selected;
                this.myHand.children[k].touched = false;
                this.myHand.children[k].children[0].active = false; 
            }

            if(this.myHand.children[k].selected){
                // 立起来
                this.myHand.children[k].setPosition(this.myHand.children[k].position.x,this.positionY+20);
                this.pokePrepare.push(k);
            }else{
                this.myHand.children[k].setPosition(this.myHand.children[k].position.x,this.positionY);
                this.pokePrepare.splice(k,1);
            }
                
            
        }

//         console.warn("this.pokePrepare",this.pokePrepare)
// console.warn("this.myHand.children",this.myHand.children)

        // 判断所有立起来牌的合规
        this.myPokeOut = [];
        for (var j in this.myHand.children) {
            if(this.myHand.children[j].selected){
                this.myPokeOut.push(this.myHand.children[j].poke)
            }
        }

        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.myPokeOut));
        poke.sort(2);
        let temp = poke.checkPokeOut();

        console.log(temp?"牌型合规":"牌型不合规",temp,"poke.pokeArr", poke.pokeArr)
        this.myPokeOut = poke.pokeArr;
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
