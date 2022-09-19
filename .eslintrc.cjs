module.exports = {
	'env': {
    'node': true,
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'parser': '@typescript-eslint/parser',
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'ignorePatterns': ['*.d.ts'],
	'rules': {
		'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 'off',
    // 行尾分号
    semi: ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'indent': ['error', 'tab'],
    'no-tabs': ['off', { allowIndentationTabs: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prefer-const': 'off',
    // 强制关键字周围空格的一致性 (keyword-spacing)
    'keyword-spacing': ['error'],
    // 禁止重复导入
    // 'no-duplicate-imports': 'error',
    'no-mixed-operators': 0,
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 5,
        multiline: 2
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    indent: 'off',
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/html-indent': ['error', 2, { baseIndent: 1 }],
    'vue/no-v-html': 'off'
	}
};
