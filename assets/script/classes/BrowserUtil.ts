
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BrowserUtil
 * DateTime = Fri May 06 2022 14:34:46 GMT+0800 (中国标准时间)
 * Author = alex尘风
 * FileBasename = BrowserUtil.ts
 * FileBasenameNoExtension = BrowserUtil
 * URL = db://assets/script/classes/BrowserUtil.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('BrowserUtil')
export class BrowserUtil {

    /**
     * 清除当前 URL 的参数（修改历史记录，不会刷新当前网页）
     */
    public static clearUrlParam(): void {
        if (!window || !window.history) {
            return;
        }
        window.history.replaceState({}, null, '.');
    }

    /**
     * 设置当前 URL 的参数（修改历史记录，不会刷新当前网页）
     * @param param 参数
     */
    public static setUrlParam(param: string | { key: string, value: string }[]): void {
        if (!window || !window.history) {
            return;
        }
        if (Array.isArray(param)) {
            param = param.map(v => `${v.key}=${v.value}`).join('&');
        }
        window.history.replaceState({}, null, `?${param}`);
    }

    /**
     * 获取当前 URL 的参数
     * @param key 键
     */
    public static getUrlParam(key: string): string {
        if (!window || !window.location) {
            return null;
        }
        const query = window.location.search.replace('?', '');
        if (query === '') {
            return null;
        }
        const substrings = query.split('&');
        for (let i = 0; i < substrings.length; i++) {
            const keyValue = substrings[i].split('=');
            if (decodeURIComponent(keyValue[0]) === key) {
                return decodeURIComponent(keyValue[1]);
            }
        }
        return null;
    }

    /**
     * 获取当前 URL 的所有参数
     */
    public static getUrlParams() {
        if (!window || !window.location) {
            return [];
        }
        const query = window.location.search.replace('?', '');
        if (query === '') {
            return [];
        }
        const substrings = query.split('&'),
            params: { key: string, value: string }[] = [];
        for (let i = 0; i < substrings.length; i++) {
            const keyValue = substrings[i].split('=');
            params.push({
                key: keyValue[0],
                value: keyValue[1],
            });
        }
        return params;
    }

    /**
     * 复制文本至设备剪贴板
     * @param value 文本内容
     */
    public static copy(value: string): boolean {
        if (!document) {
            return false;
        }
        // 创建输入元素
        const element = document.createElement('textarea');
        element.readOnly = true;
        element.style.opacity = '0';
        element.value = value;
        document.body.appendChild(element);
        // 选择元素
        element.select();
        // 兼容低版本 iOS 的特殊处理
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // 复制
        const result = document.execCommand('copy');
        element.remove();
        return result;
    }

}
