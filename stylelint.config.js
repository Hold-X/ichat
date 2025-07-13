export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-vue'
    ],

    plugins: [
        '@stylistic/stylelint-plugin',
        'stylelint-scss'
    ],

    rules: {
        // 缩进规则 - 4个字符
        '@stylistic/indentation': 4,

        // 禁用一些可能与项目冲突的规则
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,

        // 允许第三方库的类名格式（忽略 Element Plus 等第三方库的类名）
        'selector-class-pattern': [
            '^([a-z][a-z0-9]*(-[a-z0-9]+)*|el-.*)$',
            {
                'resolveNestedSelectors': true,
                'message': 'Expected class selector to be kebab-case'
            }
        ],

        // Vue 特定规则
        'selector-pseudo-element-no-unknown': [true, {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
        }],
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['deep', 'global', 'slotted']
        }],

        // SCSS 特定规则
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'function-no-unknown': null,
        'scss/function-no-unknown': [true, {
            ignoreFunctions: ['lighten', 'darken', 'saturate', 'desaturate', 'mix', 'rgba']
        }],
        'declaration-property-value-no-unknown': null
    },
    overrides: [
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html'
        },
        {
            files: ['**/*.html'],
            customSyntax: 'postcss-html'
        },
        {
            files: ['**/*.scss'],
            customSyntax: 'postcss-scss'
        }
    ]
}
