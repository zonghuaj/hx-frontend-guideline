## 基于模块开发

始终基于模块的方式来构建你的 app，每一个子模块只做一件事情。

Vue.js 的设计初衷就是帮助开发者更好的开发界面模块。一个模块是应用程序中独立的一个部分。

### 怎么做？

每一个 Vue 组件（等同于模块）[首先](https://addyosmani.com/first/)必须专注于解决一个[单一的问题](http://en.wikipedia.org/wiki/Single_responsibility_principle)，*独立的*、*可复用的*、*微小的* 和 *可测试的*。

如果你的组件做了太多的事或是变得臃肿，请将其拆分成更小的组件并保持单一的原则。一般来说，尽量保证每一个文件的代码行数不要超过 100 行。也请保证组件可独立的运行。比较好的做法是增加一个单独的 demo 示例。


## Vue 组件命名

组件的命名需遵从以下原则：

* **有意义的**: 不过于具体，也不过于抽象
* **简短**: 2 到 3 个单词
* **具有可读性**: 以便于沟通交流

同时还需要注意：

* 必须符合**自定义元素规范**: [使用连字符](https://www.w3.org/TR/custom-elements/#concepts)分隔单词，切勿使用保留字。
* **`app-` 前缀作为命名空间**: 如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。

### 为什么？

* 组件是通过组件名来调用的。所以组件名必须简短、富有含义并且具有可读性。

* 这样做可以避免跟现有的以及未来的 HTML 元素[相冲突](http://w3c.github.io/webcomponents/spec/custom/#valid-custom-element-name)，因为所有的 HTML 元素名称都是单个单词的。

### 如何做？

#### 反例

:::warning

``` js
Vue.component('todo', {
  // ...
})
```
:::

:::warning

``` js
export default {
  name: 'Todo',
  // ...
}
```
:::

正例

:::tip

```html
<!-- 推荐 -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>

<!-- 避免 -->
<btn-group></btn-group> <!-- 虽然简短但是可读性差. 使用 `button-group` 替代 -->
<ui-slider></ui-slider> <!-- ui 前缀太过于宽泛，在这里意义不明确 -->
<slider></slider> <!-- 与自定义元素规范不兼容 -->

:::