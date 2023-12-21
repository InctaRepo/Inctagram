module.exports = {
    extends: ['@it-incubator/eslint-config', 'plugin:@next/next/recommended', "plugin:storybook/recommended"],

    rules: {
        'no-console': ['warn', {allow: ['warn', 'error']}],
        'import/no-named-as-default': 0,
        "@conarti/feature-sliced/layers-slices": "error",
        "@conarti/feature-sliced/public-api": "error"
    },
    plugins: ["@conarti/feature-sliced"],
}