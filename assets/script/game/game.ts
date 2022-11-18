import { AudioManager } from './../classes/AudioManager';
import { PopupAlert } from './../ui/PopupAlert';
import { Appnative } from './../classes/Appnative';
import { find, sys } from 'cc';
import { CustomEventListener } from './../classes/CustomEventListener';
import { EffectManager } from './../classes/EffectManager';

import { _decorator, Component, Node, Prefab, SpriteAtlas, Sprite, instantiate, Input, Mask, UITransform, Rect, Label, Button,EventTarget } from 'cc';
const { ccclass, property } = _decorator;
import { PokeUtil } from '../classes/PokeUtil';
import { AudioPoke } from '../classes/AudioPoke';
import { UIManager } from '../classes/UIManager';
import * as _ from 'lodash';
import PopupManager from '../ui/PopupManager';
const eventTarget = new EventTarget();
import { EventManager } from '../classes/EventManager';
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
    @property(Node)
    public myName: Node;   //  名字
    public myPoke:any[];
    public sortType:number = 1; // 1:大到小排序;2:牌型排序，炸弹最大;
    @property(Node)
    public btn_ready:Node;
    @property(Node)
    public btn_sort:Node;
    @property(Node)
    public btn_jiao:Node;
    @property(Node)
    public btn_bujiao:Node;
    @property(Node)
    public btn_chupai:Node;
    public if_chupai:boolean = false;
    @property(Node)
    public btn_pass:Node;
    public myPokeOut:any[];
    public checkedPokeOut:Object;
    // 当前牌池类型与大小，判断能否出这个牌压上
    public checkedPokeOutNow:Object;



    @property(SpriteAtlas)
    public rightAtlas: SpriteAtlas;
    @property(Node)
    public rightHand: Node;  //  手牌
    @property(Node)
    public rightOut: Node;   //  出牌
    @property(Node)
    public rightName: Node;   //  名字
    public rightPoke:any[];
    public rightPokeOut:any[];

    @property(SpriteAtlas)
    public leftAtlas: SpriteAtlas;
    @property(Node)
    public leftHand: Node;  //  手牌
    @property(Node)
    public leftOut: Node;   //  出牌
    @property(Node)
    public leftName: Node;   //  名字
    public leftPoke:any[];
    public leftPokeOut:any[];

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

    public mySeat: number;
    public leftSeat:number;
    public rightSeat:number;
    public seats: Object[];
    public room_id:number;
    public seatChupai:number;   //当前牌河内的出牌seat
    public seatNow:number;  //当前该出牌的seat
    public game_id:number;


    start () {
        // [3]
        
    }

    switch_room(room_id){
        console.log('room_id',room_id)
        AudioManager.playMusic();
        this.room_id = room_id;
        this.createWs();
    }

    onEnable (){
        console.log('onEnable')
        EventManager.on('SWITCH_ROOM', this.switch_room, this);

        // const options4 = {
        //     title:'提示4',
        //     content:'网络问题4'
        // };
        // const params4 = {
        //     mode: PopupManager.CacheMode.Frequent,
        //     immediately: true
        // }
        // setTimeout(()=>{
        //     PopupManager.show(PopupAlert.path, options4, params4);
        // },2000)

        this.btn_ready.on(Input.EventType.TOUCH_START,this.ready,this);// 绑定准备按钮

        this.onTouchEvent();
    }

    onDisable(){
        this.offTouchEvent();
    }

    ws: WebSocket;
    createWs(){
        console.log('createWs',sys.localStorage.getItem('access_token'))
        let that = this;

        that.btn_sort.on(Input.EventType.TOUCH_START,that.toggleSortType,that);// 做个按钮切换sortType
        that.btn_jiao.on(Input.EventType.TOUCH_START,that.jiao,that);// 叫地主
        that.btn_bujiao.on(Input.EventType.TOUCH_START,that.bujiao,that);// 不叫地主
        that.btn_chupai.on(Input.EventType.TOUCH_START,that.chupai,that);// 出牌
        that.btn_pass.on(Input.EventType.TOUCH_START,that.pass,that);// 过

        // this.ws = new WebSocket("ws://127.0.0.1:10282");

        this.ws = new WebSocket("ws://192.168.1.29:10282");
        // this.ws = new WebSocket("ws://118.178.129.190:10282");
        
        this.ws.onopen = function (event) {
            // 登陆测试
            that.ws.send(JSON.stringify({
                'type':'login',
                'access_token':sys.localStorage.getItem('access_token'),
                'host':sys.localStorage.getItem('host')
            }));
            console.log("sys.localStorage.getItem('access_token')",sys.localStorage.getItem('access_token'))

            that.ws.send(JSON.stringify({
                // 'type':'start',
                'type':'sit',
                'room_id':that.room_id
            }));
        };
        this.ws.onmessage = function (event) {
            let json = event.data;
            let data = JSON.parse(json)
            console.log(data)
            // 此处判断后台传来的json数据
            switch(data.type){
                case "sit":
                    that.mySeat = data.data.seat
                    break;
                case "seats":
                    that.room_id = data.data.room_id;

                    let my = data.data.seats[that.mySeat['seat']-1]         
                    that.myName.getComponent(Label).string = my.client_id

                    that.leftSeat = (that.mySeat['seat']+2)%3 == 0 ? 3 : (that.mySeat['seat']+2)%3 ;
                    let left = data.data.seats[that.leftSeat-1]
                    if(left.status >0){
                        that.leftName.getComponent(Label).string = left.client_id
                    }

                    that.rightSeat = (that.mySeat['seat']+1)%3 == 0 ? 3 : (that.mySeat['seat']+1)%3 ;
                    let right = data.data.seats[that.rightSeat-1]
                    if(right.status >0){
                        that.rightName.getComponent(Label).string = right.client_id
                    }
                    break;
                case "ready":
                    if(that.mySeat['seat'] == data.data.seat){
                        that.btn_ready.active = false;
                    }
                    // 此处写其他人已准备
                    break;
                case "start":
                    that.game_id = data.data.game_id

                    that.myPoke = data.data['player'+that.mySeat['seat']]
                    that.createMyHand(that.myPoke.length);  
                    that.rightPoke = data.data['player'+that.rightSeat]
                    that.createRightHand(that.rightPoke.length);  
                    that.leftPoke = data.data['player'+that.leftSeat]
                    that.createLeftHand(that.leftPoke.length);  
                    that.bossPoke = data.data['boss'];
                    that.createBoss(that.bossPoke.length);  
                    
                    // 按钮隐藏与显示
                    that.btn_ready.active = false;
                    that.btn_sort.active = true;
                    that.seatNow = data.data['seat'];

                    console.warn('that.seatNow',that.seatNow,'that.mySeat',that.mySeat)
                    if(that.seatNow == that.mySeat['seat']){
                        // 显示叫地主 或 不叫 按钮
                        that.btn_jiao.active = true;
                        that.btn_bujiao.active = true;
                    }

                    break;
                case "jiao":
                    that.seatNow = data.data.seatNext;

                    if(that.seatNow == that.mySeat['seat']){
                        // 显示叫地主 或 不叫 按钮
                        that.btn_jiao.active = true;
                        that.btn_bujiao.active = true;
                    }else{
                        that.btn_jiao.active = false;
                        that.btn_bujiao.active = false;
                    }
                    break;
                case "jiao_over":
                    // 最好还是和上面jiao整合一下咯
                    // 叫地主结束,从对应seat位置(地主)开始出牌了
                    that.seatNow = data.data.seatNext
                    that.seatChupai = data.data.seatChupai
                    if(that.seatNow == that.mySeat['seat']){
                        that.if_chupai = true;
                        that.btn_jiao.active = false;
                        that.btn_bujiao.active = false;
                        that.btn_chupai.active = true;
                        // that.btn_pass.active = true;

                        that.myPoke = that.myPoke.concat(that.bossPoke)
                        that.createMyHand(that.myPoke.length); 
                    }else{
                        that.btn_jiao.active = false;
                        that.btn_bujiao.active = false;

                        if(that.seatNow == that.rightSeat) {
                            that.rightPoke = that.rightPoke.concat(that.bossPoke)
                            that.createRightHand(that.rightPoke.length); 
                        } else if(that.seatNow == that.leftSeat){
                            that.leftPoke = that.leftPoke.concat(that.bossPoke)
                            that.createLeftHand(that.leftPoke.length); 
                        }
                    }

                    that.bossPoke = [];
                    that.createBoss(that.bossPoke.length);  
                    break;
                case "chupai":
                    that.seatNow = data.data.seatNext
                    that.seatChupai = data.data.seatChupai
                    that.checkedPokeOutNow = data.data.checkedPokeOut  // 牌型大小！

                    if(that.seatNow == that.mySeat['seat']){
                        that.if_chupai = true;
                        that.btn_chupai.active = true;
                        that.btn_pass.active = true;
                        that.btn_pass.getComponent(Button).interactable = true;
                        that.myOut.removeAllChildren();
                        if(that.seatChupai == that.seatNow){
                            that.btn_pass.active = false;
                        }    
                    }else{
                        that.btn_chupai.active = false;
                        that.btn_pass.active = false;
                        if(that.seatNow == that.rightSeat){
                            that.rightOut.removeAllChildren();
                        }else if (that.seatNow == that.leftSeat){
                            that.leftOut.removeAllChildren();
                        }
                    }

                   
                    

                    if(that.seatChupai == that.rightSeat) {
                        that.rightPoke = data.data.pokeHand
                        that.rightPokeOut = data.data.pokeOut
                        console.warn('data.data.pokeOut1',data.data.pokeOut)
                        if(data.data.pokeOut && data.data.pokeOut.length>0){
                            that.createRightHand(that.rightPoke.length);     
                            that.createRightOut(); 
                            
                        }  
                    } else if(that.seatChupai == that.leftSeat){
                        that.leftPoke = data.data.pokeHand
                        that.leftPokeOut = data.data.pokeOut
                        console.warn('data.data.pokeOut2',data.data.pokeOut)
                        if(data.data.pokeOut && data.data.pokeOut.length>0){
                            that.createLeftHand(that.leftPoke.length); 
                            that.createLeftOut();
                        }
                    }

                    // 播放音效，判断是否是pass
                    if(data.data.pokeOut){
                        AudioPoke.playSound(that.checkedPokeOutNow);
                    }else{
                        // AudioManager.playSound('A/pass')
                    }

                    break;    
                case 'win':
                    PopupManager.show(PopupAlert.path,
                        {
                            title:'提示',content:'游戏结束，获胜者'+data.data.seat['client_id']
                        },
                        {
                            mode: PopupManager.CacheMode.Frequent,
                            immediately: true
                        }
                    )
                    // 额外要加获胜者出牌的逻辑
                    break;
            }
        };
        this.ws.onerror = function (event) {
            console.log(event)
        };
        this.ws.onclose = function (event) {
            console.log(event)
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

            this.addOnePoke("poke-"+this.myPoke[i].tag, this.myHand, this.myAtlas, this.pokePrefab,i,this.myPoke);
            // this.myHand.children[i].on(Input.EventType.TOUCH_START,this.clickMyHand,this);

            // 获取其中一张牌的y值便于以后操作
            this.positionY = this.myHand.children[i].position.y;
        }
    }

    createRightHand(num) {
        this.rightHand.removeAllChildren();
        // 排序，两种方式
        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.rightPoke));
        this.rightPoke = poke.sort(this.sortType);

        for (var i = this.rightHand.children.length; i < num; i++) {
            this.addOnePoke("poke-"+this.rightPoke[i].tag, this.rightHand, this.rightAtlas, this.pokePrefab,i,this.rightPoke);
        }
    }

    createRightOut(){
        // 先清除
        this.rightOut.removeAllChildren();

        // 排序，两种方式
        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.rightPokeOut));
        this.rightPokeOut = poke.sort(this.sortType);

        for(var i in this.rightPokeOut){
            this.addOnePoke("poke-"+this.rightPokeOut[i].tag, this.rightOut, this.rightAtlas, this.pokePrefab,i,this.rightPokeOut);
        }
    }

    createLeftHand(num) {
        this.leftHand.removeAllChildren();
        // 排序，两种方式
        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.leftPoke));
        this.leftPoke = poke.sort(this.sortType);

        for (var i = this.leftHand.children.length; i < num; i++) {
            this.addOnePoke("poke-"+this.leftPoke[i].tag, this.leftHand, this.leftAtlas, this.pokePrefab,i,this.leftPoke);
        }
    }

    
    createLeftOut(){
        // 先清除
        this.leftOut.removeAllChildren();

        // 排序，两种方式
        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.leftPokeOut));
        this.leftPokeOut = poke.sort(this.sortType);

        for(var i in this.leftPokeOut){
            this.addOnePoke("poke-"+this.leftPokeOut[i].tag, this.leftOut, this.leftAtlas, this.pokePrefab,i,this.leftPokeOut);
        }
    }

    createBoss(num){
        this.bossNode.removeAllChildren();
        // 排序，两种方式
        let poke = new PokeUtil()
        poke.pokeArr = JSON.parse(JSON.stringify(this.bossPoke));
        this.bossPoke = poke.sort(this.sortType);

        for (var i = this.bossNode.children.length; i < num; i++) {
            this.addOnePoke("poke-"+this.bossPoke[i].tag, this.bossNode, this.backAtlas, this.pokePrefab,i,this.bossPoke);
        }
    }

    addOnePoke (atlasName,layout,atlas,prefab,i,pokeArr) {
    
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
        poke.poke = pokeArr[i]
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

    ready(){
        EffectManager.playSound(`click`)
        
        this.ws.send(JSON.stringify({
            'type':'ready',
            'room_id':this.room_id,
            'seat':this.mySeat['seat']
        }));
    }

    jiao(){
        this.ws.send(JSON.stringify({
            'type':'jiao',
            'room_id':this.room_id,
            'game_id':this.game_id,
            'room_seat_id':this.mySeat['id'],
            'jiao':1
        }));
    }

    bujiao(){
        this.ws.send(JSON.stringify({
            'type':'jiao',
            'room_id':this.room_id,
            'game_id':this.game_id,
            'room_seat_id':this.mySeat['id'],
            'jiao':0
        }));
    }

    chupai(){
        if(!this.if_chupai){
            PopupManager.show(PopupAlert.path,
                {
                    title:'提示',content:'不能这么出牌'
                },
                {
                    mode: PopupManager.CacheMode.Normal
                }
            )
            return false;
        }

        // 先清除
        this.myOut.removeAllChildren();

        // 出牌(是否考虑移到服务器回调中？以防服务器没有响应)
        var length = this.pokePrepare.length;
        // console.log(this.myPoke)
        // console.log(this.myHand.children)
        for (var k=length-1;k>=0;k--) {
            this.myPoke.splice(this.pokePrepare[k],1);
        }

        for(var i in this.myPokeOut){
            this.addOnePoke("poke-"+this.myPokeOut[i].tag, this.myOut, this.myAtlas, this.pokePrefab,i,this.myPokeOut);
        }

        // 重新排序手牌
        this.createMyHand(this.myPoke.length);  

        this.ws.send(JSON.stringify({
            'type':'chupai',
            'room_id':this.room_id,
            'game_id':this.game_id,
            'room_seat_id':this.mySeat['id'],
            'seatChupai':this.mySeat['seat'],
            'pokeOut':this.myPokeOut,
            'pokeHand':this.myPoke,
            'checkedPokeOut':this.checkedPokeOut,
        }));
    }

    pass(){
        this.ws.send(JSON.stringify({
            'type':'chupai',
            'room_id':this.room_id,
            'game_id':this.game_id,
            'room_seat_id':this.mySeat['id'],
            'seatChupai':this.seatChupai,
            'pokeOut':null,
            'pokeHand':this.myPoke,
            'checkedPokeOut':this.checkedPokeOutNow,
        }));
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
        this.checkedPokeOut = poke.checkPokeOut();

        console.log(this.checkedPokeOut?"牌型合规":"牌型不合规",this.checkedPokeOut,"poke.pokeArr", poke.pokeArr)
        this.myPokeOut = poke.pokeArr;

        if(!this.checkedPokeOut){
            // 牌型不合规
            this.if_chupai = false;
        }else{
            this.if_chupai = true;
            if(this.checkedPokeOutNow && this.seatChupai != this.seatNow){
                // 判断牌型与大小后才可继续
                this.if_chupai = PokeUtil.checkBS(this.checkedPokeOut,this.checkedPokeOutNow)  
            }
        }

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
