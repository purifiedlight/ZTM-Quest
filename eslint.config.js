import globals from 'globals';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';

export default [
    pluginJs.configs.recommended,
    importPlugin.flatConfigs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                test: true,          // Pridaj "test" globálnu premennú pre Jest
                expect: true,        // Pridaj aj "expect"
                beforeEach: true,    // Pridaj "beforeEach"
                afterEach: true,     // Pridaj "afterEach"
            },
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        files: ['src/**/*.js'],
        ignores: ['.github/*', 'node_modules/*', 'public/*', 'dist/*'],
        rules: {
            'no-unused-vars': [
                'error',
                {
                    vars: 'local',
                    args: 'none',
                    caughtErrors: 'all',
                    ignoreRestSiblings: false,
                    reportUsedIgnorePattern: false,
                },
            ],
            'no-undef': 'off',  // Vypnutie pravidla pre nedefinované premenné
            'no-console': 'warn',
        },
    },
    {
        plugins: ['jest'],
        extends: ['plugin:jest/recommended'],
    },
];
