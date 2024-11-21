import globals from 'globals';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';  // Pridanie Jest pluginu

export default [
    pluginJs.configs.recommended,
    importPlugin.flatConfigs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,  // Existujúce globálne premenné pre prehliadač
                jest: true,           // Pridanie globálneho objektu pre Jest
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
            'no-prototype-builtins': 'off',
            'no-constant-condition': 'off',
            'no-async-promise-executor': 'off',
            'no-unsafe-optional-chaining': 'off',
            'no-unsafe-negation': 'off',
            'no-unsafe-regex': 'off',
            'no-unsafe-return': 'off',
            'no-unsafe-finally': 'off',
            'no-unsafe-assignment': 'off',
            'no-unsafe-member-access': 'off',
            'no-unsafe-call': 'off',
            'no-unsafe-argument': 'off',
            'no-unsafe-regular-expressions': 'off',
            'import/no-unresolved': 'error',
            'import/namespace': 'off',
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',
            'import/default': 'off',
            'no-console': 'warn',
        },
    },
    {
        plugins: ['jest'],  // Pridanie Jest pluginu do zoznamu pluginov
        extends: ['plugin:jest/recommended'],  // Aktivovanie Jest pravidiel
    },
];
