module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'prettier',
		'standard',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['prettier', 'standard', '@typescript-eslint'],
	rules: {
		indent: [2, 'tab'],
		'prettier/prettier': 'error',
		'@typescript-eslint/no-explicit-any': [0],
		'@typescript-eslint/explicit-module-boundary-types': [0],
		'no-tabs': [0],
		'no-mixed-spaces-and-tabs': [0]
	}
}
