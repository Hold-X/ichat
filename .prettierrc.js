export default {
    // 基础格式设置
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    trailingComma: 'none',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',

    // 换行设置
    printWidth: 120,
    endOfLine: 'lf',

    // Vue 特定设置
    vueIndentScriptAndStyle: false,

    // HTML 设置
    htmlWhitespaceSensitivity: 'css',

    // 文件覆盖设置
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2
            }
        },
        {
            files: ['*.yml', '*.yaml'],
            options: {
                tabWidth: 2
            }
        },
        {
            files: '*.md',
            options: {
                proseWrap: 'preserve'
            }
        }
    ]
}
