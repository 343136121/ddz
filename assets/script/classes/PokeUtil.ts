
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PokeUtil
 * DateTime = Thu Jan 13 2022 17:07:47 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = PokeUtil.ts
 * FileBasenameNoExtension = PokeUtil
 * URL = db://assets/script/classes/PokeUtil.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('PokeUtil')
export class PokeUtil {
    public pokeArr: any[];   // 原始牌型
    public pokeSort: any[];  // 顺序记录牌型 王炸-4张-3张-对子-单牌


    sort(sortType: number) {

        this.pokeArr.sort((a, b) => {
            return b.sort - a.sort;
        })

        if (sortType == 1) {
            return this.pokeArr;
        } else if (sortType == 2) {
            this.pokeSort = [];
            this.dealLian(4)
            this.dealLian(3)
            this.dealLian(2)
            this.pokeArr = this.pokeSort.concat(this.pokeArr);
            return this.pokeArr;
        }
    }

    // 检测有几张牌相连，将它删除并push进手牌
    dealLian(num = 4) {

        var delArr = [];
        var s=new Set();// 避免添加已有的牌

        // 记录所有符合n连的索引
        for (var i = 0; i < this.pokeArr.length; i++) {
            var indexArr = [];
            for (var j = i; j < this.pokeArr.length; j++) {
                if (this.pokeArr[j].point == this.pokeArr[i].point) {
                    indexArr.push(j)
                }
            }

            if (indexArr.length == num&& !s.has(this.pokeArr[i].point)) {
                s.add(this.pokeArr[i].point);
                delArr = delArr.concat(indexArr)
            }

        }

        for (var k = 0; k < delArr.length; k++) {
            // push到手牌数组
            this.pokeSort.push(this.pokeArr[delArr[k]])
            // 删除相连的牌用0代替
            this.pokeArr.splice(delArr[k], 1, 0);
        }

        // 删除为0的元素
        this.pokeArr = this.pokeArr.filter(item => item != 0);

    }

    // 对象互换键值方法
    reverseObj(obj) {
        let objNew = JSON.parse(JSON.stringify(obj))
        for (let k in objNew) {
            let value = objNew[k]; //将原来的value赋值给一个变量
            objNew[value] = k; // 为cluster_info赋新key，不能直接使用cluster_info = {cluster_info[k] : k},会报语法错误
            delete objNew[k]; // 删除原来的属性
        }
        return objNew;
    }

    // 依次判断牌型与大小权值
    public pokeType = {
        'Dan' : 1,

        'Dui' : 10,
        'Dui3': 11,    // 三连对起步
        'Dui4': 12, 
        'Dui5': 13,   
        'Dui6': 14,   
        'Dui7': 15,    
        'Dui8': 16,  
        'Dui9': 17,  
        'Dui10': 18,     // 最高地主的十连对 

        'San' : 20,  // 333
        'San2' : 21, // 333444
        'San3' : 22,
        'San4' : 23,
        'San5' : 24,
        'San6' : 25,      // 最高六连顺 333444555666777888

        'SanDan' : 30, //  三带一 3334
        'SanDan2' : 31,   //  33344456
        'SanDan3' : 32, 
        'SanDan4' : 33, 
        'SanDan5' : 34, //  最高五连

        'SanDui' : 40, //  三带二(对) 33344
        'SanDui2' : 41,   // 3334445577
        'SanDui3' : 42, 
        'SanDui4' : 43,// 最高四连 

        'Shun5' : 50,    // 顺子五个起步
        'Shun6' : 51,
        'Shun7' : 52,
        'Shun8' : 53,
        'Shun9' : 54,
        'Shun10' : 55,
        'Shun11' : 56,
        'Shun12' : 57,   // 345678910JQKA

        'SiDan':60,   // 四带二单牌     5555+3+8
        'SiDui':70, //四带二对子     4444+55+77

        'ZhaDan':80,   //  三人只有一种普通炸
        'HuoJian': 90,
    };
    public pokeNum = {
        'type':0, //表示牌型
        'value':0,  //区分最大的牌，决定牌的大小
    }

    checkPokeOut() {

            if(this.pokeArr.length == 0){
                return false;
            }

            if(this.isDan()){
                return this.isDan()
            }else if(this.isDui()){
                return this.isDui()
            }else if(this.isDuiX()){
                return this.isDuiX()
            }else if(this.isSan()){
                return this.isSan()
            }else if(this.isSanDan()){
                return this.isSanDan()
            }else if(this.isSanDui()){
                return this.isSanDui()
            }else if(this.isSanX()){
                return this.isSanX()
            }else if(this.isSanDanX()){
                return this.isSanDanX()
            }else if(this.isSanDuiX()){
                return this.isSanDuiX()
            }else if(this.isShun()){
                return this.isShun()
            }else if(this.isSiDan()){
                return this.isSiDan()
            }else if(this.isSiDui()){
                return this.isSiDui()
            }
            
    }

    isDan(){
        if(this.pokeArr.length != 1){
            return false
        }

        this.pokeNum.type = this.pokeType.Dan;
        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isDui(){
        if(this.pokeArr.length != 2){
            return false
        }

        if(this.pokeArr[0].num != this.pokeArr[1].num){
            return false
        }

        this.pokeNum.type = this.pokeType.Dui;
        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isDuiX(){
        if(this.pokeArr.length % 2 != 0){
            return false
        }

        this.pokeArr.sort((a, b) => {
            return a.num == 15?1:b.sort - a.sort;
        })
        
        var flag = 0;   // 连对数
        for(var i = 0;i<this.pokeArr.length;i=i+2){
            if(this.pokeArr[i].num >14){
            // 如果单牌大于A，则不合规
                return false;
            }

            if(this.pokeArr[i].num != this.pokeArr[i+1].num){
                return false;
            }

            if(this.pokeArr[i+2]){
                // 如果不是最后一对，判断是否比后面一对大1
                if(Math.abs(this.pokeArr[i].num - this.pokeArr[i+2].num) != 1){
                    return false;
                }
            }
            

            flag ++;
        }


        if(flag == 0 || flag == 2 || flag > 10){
            return false;
        }else{
            if(flag == 1){
                this.pokeNum.type = this.pokeType.Dui;
            }else if(flag >= 3){
                this.pokeNum.type = this.pokeType['Dui'+flag];
            }else {
                return false;
            }
        }

        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isSan(){
        if(this.pokeArr.length != 3){
            return false
        }

        if(this.pokeArr[0].num != this.pokeArr[1].num || this.pokeArr[0].num != this.pokeArr[2].num){
            return false
        }
        this.pokeNum.type = this.pokeType.San;
        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isSanDan(){
        if(this.pokeArr.length != 4){
            return false
        }

        if(
            this.pokeArr[0].num == this.pokeArr[1].num 
            && this.pokeArr[0].num == this.pokeArr[2].num 
            && this.pokeArr[0].num != this.pokeArr[3].num
        ){
            this.pokeNum.value = this.pokeArr[0].num;
        }else {
            this.pokeArr.sort((a, b) => {
                return a.sort - b.sort;
            })
            if(
                this.pokeArr[0].num == this.pokeArr[1].num 
                && this.pokeArr[0].num == this.pokeArr[2].num 
                && this.pokeArr[0].num != this.pokeArr[3].num
            ){
                this.pokeNum.value = this.pokeArr[0].num;
            }else{
                return false;
            }
            
        }
        this.pokeNum.type = this.pokeType.SanDan;

        return this.pokeNum;
    }

    isSanDui(){
        if(this.pokeArr.length != 5){
            return false
        }

        if(
            this.pokeArr[0].num == this.pokeArr[1].num 
            && this.pokeArr[0].num == this.pokeArr[2].num 
            && this.pokeArr[0].num != this.pokeArr[3].num
            && this.pokeArr[3].num == this.pokeArr[4].num
        ){
            this.pokeNum.value = this.pokeArr[0].num;
        }else {
            this.pokeArr.sort((a, b) => {
                return a.sort - b.sort;
            })
            if(
                this.pokeArr[0].num == this.pokeArr[1].num 
                && this.pokeArr[0].num == this.pokeArr[2].num 
                && this.pokeArr[0].num != this.pokeArr[3].num
                && this.pokeArr[3].num == this.pokeArr[4].num
            ){
                this.pokeNum.value = this.pokeArr[0].num;
            }else{
                return false;
            }
            
        }
        this.pokeNum.type = this.pokeType.SanDui;

        return this.pokeNum;
    }

    private flagSanX(count: number){
        // 先排序，遇到2和王，均放到最末尾
        var num = 3;
        this.pokeSort = [];
        var delArr = [];
        var s=new Set();// 避免添加已有的牌

        // 记录所有符合3连的索引
        for (var i = 0; i < this.pokeArr.length; i++) {
            // 遇到2和王跳过
            if([15,16,17].includes(this.pokeArr[i].num)){
                continue;
            }
            var indexArr = [];
            for (var j = i; j < this.pokeArr.length; j++) {
                if (this.pokeArr[j].point == this.pokeArr[i].point) {
                    indexArr.push(j)
                }
            }

            if (indexArr.length == num&& !s.has(this.pokeArr[i].point)) {
                s.add(this.pokeArr[i].point);
                delArr = delArr.concat(indexArr)
            }

        }

        for (var k = 0; k < delArr.length; k++) {
            // push到手牌数组
            this.pokeSort.push(this.pokeArr[delArr[k]])
            // 删除相连的牌用0代替
            this.pokeArr.splice(delArr[k], 1, 0);
        }

        // 删除为0的元素
        this.pokeArr = this.pokeArr.filter(item => item != 0);
        this.pokeArr = this.pokeSort.concat(this.pokeArr);

        console.log("flagSanX",this.pokeArr)

        var flag = 0;   // 连数
        for(var i = 0;i<count*3;i=i+3){


            if(this.pokeArr[i].num != this.pokeArr[i+1].num || this.pokeArr[i].num != this.pokeArr[i+2].num){
                return false;
            }

            if(i<=(count-2)*3){
                // 如果不是最后，判断是否比后面大1
                if(Math.abs(this.pokeArr[i].num - this.pokeArr[i+3].num) > 1){
                    return false;
                }
            }
            

            flag ++;
        }

        return flag;
    }


    isSanX(){
        if(this.pokeArr.length % 3 != 0){
            return false
        }

        var flag = this.flagSanX(this.pokeArr.length/3)

        if(flag < 1 || flag > 6){
            return false;
        }else{
            if(flag == 1){
                this.pokeNum.type = this.pokeType.San;
            }else{
                this.pokeNum.type = this.pokeType['San'+flag];
            }
        }

        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isSanDanX(){
        if(this.pokeArr.length % 4 != 0){
            return false
        }

        var count = this.pokeArr.length/4;
        var flag = this.flagSanX(count)

        if(flag < 1 || flag > 5){
            return false;
        }else{
            if(flag == 1){
                this.pokeNum.type = this.pokeType.SanDan;
            }else{
                this.pokeNum.type = this.pokeType['SanDan'+flag];
            }
        }
        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isSanDuiX(){
        if(this.pokeArr.length % 5 != 0){
            return false
        }

        var count = this.pokeArr.length/5;
        var flag = this.flagSanX(count)
        // 判断后面是否是对子，假如二连飞机，则前0～5为三连，67和89为对子
        for(var i = count*3;i<this.pokeArr.length;i=i+2){
            if(this.pokeArr[i].num != this.pokeArr[i+1].num){
                return false;
            }
        }

        if(flag < 1 || flag > 4){
            return false;
        }else{
            if(flag == 1){
                this.pokeNum.type = this.pokeType.SanDui;
            }else{
                this.pokeNum.type = this.pokeType['SanDui'+flag];
            }
        }

        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isShun(){
        if(this.pokeArr.length < 5){
            return false
        }

        for(var i = 0;i<this.pokeArr.length;i++){
            if(this.pokeArr[i].num >14){
            // 如果单牌大于A，则不合规
                return false;
            }

            if(this.pokeArr[i+1]){
                // 如果不是最后，判断是否比后面正好大1
                if(Math.abs(this.pokeArr[i].num - this.pokeArr[i+1].num) != 1){
                    return false;
                }
            }

        }

        if(i < 5 || i > 12){
            return false;
        }else{
            this.pokeNum.type = this.pokeType['Shun'+i];
        }

        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isSiDan(){
        if(this.pokeArr.length != 6){
            return false
        }

        this.pokeSort = [];
        this.dealLian(4)
        this.pokeSort.sort((a, b) => {
            return b.sort - a.sort;
        })
        this.pokeArr = this.pokeSort.concat(this.pokeArr);

        if(
            this.pokeArr[0].num != this.pokeArr[1].num 
            || this.pokeArr[0].num != this.pokeArr[2].num
            || this.pokeArr[0].num != this.pokeArr[3].num
        ){
            return false;
        }

        this.pokeNum.type = this.pokeType.SiDan;
        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isSiDui(){
        if(this.pokeArr.length != 8){
            return false
        }

        this.pokeSort = [];
        this.dealLian(4)
        this.pokeSort.sort((a, b) => {
            return b.sort - a.sort;
        })
        this.pokeArr = this.pokeSort.concat(this.pokeArr);

        if(
            this.pokeArr[0].num != this.pokeArr[1].num 
            || this.pokeArr[0].num != this.pokeArr[2].num
            || this.pokeArr[0].num != this.pokeArr[3].num
            || this.pokeArr[4].num != this.pokeArr[5].num
            || this.pokeArr[6].num != this.pokeArr[7].num
        ){
            return false;
        }

        this.pokeNum.type = this.pokeType.SiDui;
        this.pokeNum.value = this.pokeArr[0].num;
        return this.pokeNum;
    }

    isZhaDan(){
        
    }

    isHuoJian(){

    }
}
