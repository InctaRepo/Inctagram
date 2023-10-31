module.exports = {
    extends: '@it-incubator/eslint-config',
    rules: {'no-console': ['warn', {allow: ['warn', 'error']}], 'import/no-named-as-default': 0},
}