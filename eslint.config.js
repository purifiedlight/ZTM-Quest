import globals from 'globals';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
    // Základná konfigurácia
    pluginJs.configs.recommended,
    importPlugin.flatConfigs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser, // Existujúce globálne premenné pre prehliadač
                jasmine: true,      // Pridanie globálneho objektu pre Jasmine
                describe: true,
                it: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
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
            'no-undef': 'off',
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
    // Špecifická konfigurácia pre Jasmine
    {
        files: ['**/*.spec.js', '**/*.test.js'], // Testovacie súbory
        ignores: ['**/node_modules/**'], // Ignorovanie nepotrebných adresárov
        languageOptions: {
            globals: {
                jasmine: true, // Jasmine globálne premenné
                describe: true,
                it: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
            },
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'off',
            'no-undef': 'off', // Ignorovanie `no-undef` v testoch
            'import/no-unresolved': 'off', // Ignorovanie chýb importov v testoch
            'no-console': 'off', // Povoliť `console` v testoch
        },
    },
];
