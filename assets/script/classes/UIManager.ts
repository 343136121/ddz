import { _decorator, Component, Node, find, loader, Prefab, instantiate, Label } from "cc";
const { ccclass, property } = _decorator;

interface PageActive{
    show: () => {},
    hide: () => {},
}

@ccclass("UIManager")
export class UIManager {
    static _dictPanel = new Map <string, Node>();

    public static showDialog(name: string,content?,title?, cb?: Function, ...args: []){
        // const scriptName = name.substr(0,1).toUpperCase() + name.substr(1);
        const scriptName = name;
        if(this._dictPanel.has(name)){
            const panel = this._dictPanel.get(name)!;
            const parent = find('Canvas');
            panel.parent = parent;
            const comp = panel.getComponent(scriptName);
            if (comp && (comp as Component & PageActive)['show']){
                (comp as Component & PageActive)['show'].apply(comp, args);
            }

            if(cb){
                cb();
            }

            return;
        }

        const path = `ui/${name}`;
        loader.loadRes(path, Prefab, (err, prefab) => {
            if (err) {
                console.warn(err);
                return;
            }

            const panel = instantiate(prefab!);
            if(content){
                panel.getChildByName('content').getComponent(Label).string = content
            }

            if(title){
                panel.getChildByName('title').getComponent(Label).string = title
            }
            
            this._dictPanel.set(name, panel);
            const parent = find('Canvas');
            panel.parent = parent;
            console.log(panel,scriptName)
            const comp = panel.getComponent(scriptName);
            if (comp && (comp as Component & PageActive)['show']) {
                (comp as Component & PageActive)['show'].apply(comp, args);
            }
            console.log('comp',comp,(comp as Component & PageActive)['show'])

            if (cb) {
                cb();
            }
        });
    }

    public static hideDialog(name: string, cb?: Function){
        if(this._dictPanel.has(name)){
            const scriptName = name.substr(0, 1).toUpperCase() + name.substr(1);
            const panel = this._dictPanel.get(name)!;
            panel.parent = null;
            const comp = panel.getComponent(scriptName);
            if (comp && (comp as Component & PageActive)['hide']) {
                (comp as Component & PageActive)['hide'].apply(comp);
            }

            if (cb) {
                cb();
            }
        }
    }
}
