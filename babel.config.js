module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['react-native-reanimated/plugin'],
    }
}

module.exports = {
    presets: [
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    plugins: ["transform-remove-comments"],
}