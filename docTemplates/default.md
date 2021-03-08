# meari

![npm](https://img.shields.io/npm/v/meari) [![](https://data.jsdelivr.com/v1/package/npm/meari/badge)](https://www.jsdelivr.com/package/npm/meari) ![npm bundle size](https://img.shields.io/bundlephobia/min/meari) ![npm](https://img.shields.io/npm/dm/meari) ![NPM](https://img.shields.io/npm/l/meari)

# Concept

This library because it is based only a promise constructor so is not need a browsers of higher version supporting [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) or [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) functions

> For examples `seq` and `seqAll` functions will be able to replaces `Promise.all` and `Promise.allSettled` functions

In addition, it is supporting various functions like `map` and `retry` that in the native is not supports for can using in a multiple situations     
 
# Install
 
 ```javascript
 npm i meari
 ```
 
# Support Platforms

Most of modern browsers(chrome, edge, firefox ...) that supporting [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), NodeJS
