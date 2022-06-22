# clean
clean为true时，dist文件夹将先被清空再生成新的文件
```js
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "dist"),
    clean: true,
}
```