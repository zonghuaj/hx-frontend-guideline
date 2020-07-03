## 文件注释规范

​单个文件注释规范，每个独立的VUE文件开头都要进行注释，表明该文件的描述信息、作者、创建时间等。


``` js
<!--
 * @FileDescription: 该文件的描述信息
 * @Author: 作者信息
 * @Date: 文件创建时间
 * @LastEditors: 最后更新作者
 * @LastEditTime: 最后更新时间
 -->
```
 
## 方法注释规范

VUE文件中method中的方法注释

``` js
/**
  * @description: 方法描述
  * @param {参数类型} 参数名称
  * @param {参数类型} 参数名称
  * @return 没有返回信息写 void / 有返回信息 {返回类型} 描述信息
  */
```

## 变量注释规范

``` js
vue文件中data声明的变量的注释

channelCount: '', // 通道总数

videoChannelCount: '', // 视频通道总数
```

## 行内注释和代码块的注释

当我们在写一个比较复杂的方法的时候，需要进行注释，这时需要确定是否使用行级注释还代码块的注释

代码块的注释

``` js
export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
```

行级代码的注释

``` js
// 添加完成, 进行展开
treeObj.expandNode(parentNode)
```