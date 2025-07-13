import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import babelParser from '@babel/eslint-parser'
import vueParser from 'vue-eslint-parser'

export default [
    // 忽略的文件和目录
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            '*.log',
            'coverage/**',
            '.nyc_output/**',
            'jspm_packages/**',
            '.npm/**',
            '*.tgz',
            '.env*',
            '.vscode/**',
            '.idea/**',
            '*.swp',
            '*.swo',
            '.DS_Store',
            'Thumbs.db',
            'bundle-analyzer-report.html'
        ]
    },

    // JavaScript 文件配置
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly'
            }
        },
        rules: {
            ...js.configs.recommended.rules,

            // 缩进规则 - 4个字符
            'indent': ['error', 4, {
                'SwitchCase': 1,
                'VariableDeclarator': 1,
                'outerIIFEBody': 1,
                'FunctionDeclaration': {
                    'parameters': 1,
                    'body': 1
                },
                'FunctionExpression': {
                    'parameters': 1,
                    'body': 1
                },
                'CallExpression': {
                    'arguments': 1
                },
                'ArrayExpression': 1,
                'ObjectExpression': 1,
                'ImportDeclaration': 1,
                'flatTernaryExpressions': false,
                'ignoredNodes': ['TemplateLiteral *'],
                'ignoreComments': false
            }],

            // 引号规则
            'quotes': ['error', 'single', {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }],

            // 分号规则
            // 'semi': ['error', 'never'],

            // 逗号规则
            'comma-dangle': ['error', 'never'],
            'comma-spacing': ['error', {
                'before': false,
                'after': true
            }],

            // 空格规则
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }],
            'space-in-parens': ['error', 'never'],
            'space-before-blocks': ['error', 'always'],
            'keyword-spacing': ['error', {
                'before': true,
                'after': true
            }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],

            // 换行规则
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',
            'no-multiple-empty-lines': ['error', {
                'max': 2,
                'maxEOF': 1,
                'maxBOF': 0
            }],

            // 代码质量规则
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-unused-vars': ['error', {
                'vars': 'all',
                'args': 'after-used',
                'ignoreRestSiblings': false
            }],
            'no-undef': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'error',
            'arrow-spacing': ['error', {
                'before': true,
                'after': true
            }],

            // 对象和数组规则
            'object-shorthand': ['error', 'always'],
            'dot-notation': 'error',

            // 比较规则
            'eqeqeq': ['error', 'always'],
            'no-eq-null': 'error',

            // 函数规则
            'func-style': ['error', 'declaration', {
                'allowArrowFunctions': true
            }],

            // 其他通用规则
            'camelcase': ['error', {
                'properties': 'always'
            }],
            'no-mixed-spaces-and-tabs': 'error',
            'no-tabs': 'error'
        }
    },

    // Vue 文件配置
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                parser: babelParser,
                requireConfigFile: false
            }
        },
        plugins: {
            vue
        },
        rules: {
            ...vue.configs.essential.rules,

            // Vue 特定的缩进规则
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4, {
                'baseIndent': 0,
                'switchCase': 1
            }],

            // Vue 特定规则
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/multi-word-component-names': ['error', {
                'ignores': ['index']
            }],
            'vue/no-unused-components': 'warn',
            'vue/no-unused-vars': 'error',
            'vue/require-default-prop': 'error',
            'vue/require-prop-types': 'error',
            'vue/order-in-components': ['error', {
                'order': [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError'
                ]
            }],
            // 在 Vue 文件中禁用 JS 缩进规则，使用 Vue 特定的缩进规则
            'indent': 'off'
        }
    }
]
