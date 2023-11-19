module.exports = {
    extends: ['@it-incubator/eslint-config', 'plugin:@next/next/recommended', "plugin:storybook/recommended", "plugin:@conarti/feature-sliced/recommended"],
    rules: {'no-console': ['warn', {allow: ['warn', 'error']}], 'import/no-named-as-default': 0},
}