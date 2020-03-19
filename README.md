# eslint-plugin-lodash-to-native

ESLint плагин, заменяющий _.map из _lodash_ на нативный Array#map.

## Установка

Сначала необходимо установить [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Затем установить плагин `eslint-plugin-lodash-to-native`:
```
$ npm install -S https://github.com/vamedyakov/eslint-plugin-lodash-to-native.git
```

## Пример использования

Добавьте `lodash-to-native` в секцию плагинов вашего конфигурационного файла `.eslintrc.js`. Вы можете опускать префикс `eslint-plugin-`. Затем сконфигурируйте правила, который хотите использовать:

```js
/* .eslintrc.js */

module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  "plugins": [
    "lodash-to-native"
  ],
  "rules": {
    "lodash-to-native/map": "warn"
  },
};
## Тестирование

Для теста используется команда:
```
$ npm run test
```