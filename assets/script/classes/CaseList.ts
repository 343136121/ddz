/**
 * 示例名称到示例信息的映射表
 */
 export const CaseInfoMap: { [caseName: string]: CaseInfo } = {
    game: {
        name: '游戏页',
        scene: 'game'
    },
}

/**
 * 关卡信息类型
 */
export type CaseInfo = {
    name: string;
    scene: string;
}
