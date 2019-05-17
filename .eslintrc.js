module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": ["error", "always"],
        "indent": ["error", 4],
        "func-names": ["error", "never"],
        "guard-for-in": "warn",
        "comma-dangle": "error",
        "max-len": ["error", { "code": 140 }],
        "linebreak-style": 0,
        "global-require": 0,
        "no-param-reassign": 0,
        "no-underscore-dangle": 0
    }
};
