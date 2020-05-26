## 提供组件 API 文档

使用 Vue.js 组件的过程中会创建 Vue 组件实例，这个实例是通过自定义属性配置的。为了便于其他开发者使用该组件，对于这些自定义属性即组件API应该在 `README.md` 文件中进行说明。

## 为什么？

* 良好的文档可以让开发者比较容易的对组件有一个整体的认识，而不用去阅读组件的源码，也更方便开发者使用。
* 组件配置属性即组件的 API，对于组件的用户来说他们更感兴趣的是 API 而不是实现原理。
* 正式的文档会告诉开发者组件 API 变更以及向后的兼容性情况。
* `README.md` 是标准的我们应该首先阅读的文档文件。代码托管网站（GitHub、Bitbucket、Gitlab 等）会默认在仓库中展示该文件作为仓库的介绍。

### 怎么做？

在模块目录中添加 `README.md` 文件：

```
range-slider/
├── range-slider.vue
├── range-slider.less
└── README.md
```

在 README 文件中说明模块的功能以及使用场景。对于 vue 组件来说，比较有用的描述是组件的自定义属性即 API 的描述介绍。

# Range slider

## 功能

range slider 组件可通过拖动的方式来设置一个给定范围内的数值。

该模块使用 [noUiSlider](http://refreshless.com/nouislider/) 来实现跨浏览器和 touch 功能的支持。

## 如何使用

`<range-slider>` 支持如下的自定义属性：


| attribute | type | description
| --- | --- | ---
| `min` | Number | 可拖动的最小值.
| `max` | Number | 可拖动的最大值.
| `values` | Number[] *optional* | 包含最大值和最小值的数组.  如. `values="[10, 20]"`. Defaults to `[opts.min, opts.max]`.
| `step` | Number *optional* | 增加减小的数值单位，默认为 1.
| `on-slide` | Function *optional* | 用户拖动开始按钮或者结束按钮时的回调函数，函数接受 `(values, HANDLE)` 格式的参数。 如： `on-slide={ updateInputs }`,  `component.updateInputs = (values, HANDLE) => { const value = values[HANDLE]; }`.
| `on-end` | Function *optional* | 当用户停止拖动时触发的回调函数，函数接受 `(values, HANDLE)` 格式的参数。


如需要自定义 slider 的样式可参考 [noUiSlider 文档]((http://refreshless.com/nouislider/more/#section-styling))


## 提供组件 demo

添加 `index.html` 文件作为组件的 demo 示例，并提供不同配置情况的效果，说明组件是如何使用的。

### 为什么？

* demo 可以说明组件是独立可使用的。
* demo 可以让开发者预览组件的功能效果。
* demo 可以展示组件各种配置参数下的功能。


## 对组件文件进行代码校验

代码校验可以保持代码的统一性以及追踪语法错误。.vue 文件可以通过使用 `eslint-plugin-html`插件来校验代码。你可以通过 `vue-cli` 来开始你的项目，`vue-cli` 默认会开启代码校验功能。

### 为什么？

* 保证所有的开发者使用同样的编码规范。
* 更早的感知到语法错误。

### 怎么做？

为了校验工具能够校验 `*.vue`文件，你需要将代码编写在 `<script>` 标签中，并使[组件表达式简单化](#保持组件表达式简单化)，因为校验工具无法理解行内表达式，配置校验工具可以访问全局变量 `vue` 和组件的 `props`。

#### ESLint

[ESLint](http://eslint.org/) 需要通过 [ESLint HTML 插件](https://github.com/BenoitZugmeyer/eslint-plugin-html#eslint-plugin-html)来抽取组件中的代码。

通过 `.eslintrc` 文件来配置 ESlint，这样 IDE 可以更好的理解校验配置项：

```json
{
  "extends": "eslint:recommended",
  "plugins": ["html"],
  "env": {
    "browser": true
  },
  "globals": {
    "opts": true,
    "vue": true
  }
}
```

运行 ESLint

```bash
eslint src/**/*.vue
```

#### JSHint

[JSHint](http://jshint.com/) 可以解析 HTML（使用 `--extra-ext`命令参数）和抽取代码（使用 `--extract=auto`命令参数）。

通过 `.jshintrc` 文件来配置 ESlint，这样 IDE 可以更好的理解校验配置项。

```json
{
  "browser": true,
  "predef": ["opts", "vue"]
}
```

运行 JSHint
```bash
jshint --config modules/.jshintrc --extra-ext=html --extract=auto modules/
```

注：JSHint 不接受 `vue` 扩展名的文件，只支持 `html`。

## 只在需要时创建组件

### 为什么？

Vue.js 是一个基于组件的框架。如果你不知道何时创建组件可能会导致以下问题：

* 如果组件太大, 可能很难重用和维护;
* 如果组件太小，你的项目就会（因为深层次的嵌套而）被淹没，也更难使组件间通信;

### 怎么做?

* 始终记住为你的项目需求构建你的组件，但是你也应该尝试想到它们能够从中脱颖而出（独立于项目之外）。如果它们能够在你项目之外工作，就像一个库那样，就会使得它们更加健壮和一致。
* 尽可能早地构建你的组件总是更好的，因为这样使得你可以在一个已经存在和稳定的组件上构建你的组件间通信（props & events）。

### 规则

* 首先，尽可能早地尝试构建出诸如模态框、提示框、工具条、菜单、头部等这些明显的（通用型）组件。总之，你知道的这些组件以后一定会在当前页面或者是全局范围内需要。
* 第二，在每一个新的开发项目中，对于一整个页面或者其中的一部分，在进行开发前先尝试思考一下。如果你认为它有一部分应该是一个组件，那么就创建它吧。
* 最后，如果你不确定，那就不要。避免那些“以后可能会有用”的组件污染你的项目。它们可能会永远的只是（静静地）待在那里，这一点也不聪明。注意，一旦你意识到应该这么做，最好是就把它打破，以避免与项目的其他部分构成兼容性和复杂性。


---

## 尽可能使用 mixins

### 为什么?

Mixins 封装可重用的代码，避免了重复。如果两个组件共享有相同的功能，则可以使用 mixin。通过 mixin，你可以专注于单个组件的任务和抽象的通用代码。这有助于更好地维护你的应用程序。

### 怎么做?

假设你有一个移动端和桌面端的菜单组件，它们共享一些功能。我们可以抽象出这两个组件的核心功能到一个 mixin 中，例如：

```js
const MenuMixin = {
  data () {
    return {
      language: 'EN'
    }
  },

  methods: {
    changeLanguage () {
      if (this.language === 'DE') this.$set(this, 'language', 'EN')
      if (this.language === 'EN') this.$set(this, 'language', 'DE')
    }
  }
}

export default MenuMixin
```
要使用 mixin，只需将其导入到两个组件中（我只展示移动组件）。

```html
<template>
  <ul class="mobile">
    <li @click="changeLanguage">Change language</li>
  </ul>
</template>

<script>
  import MenuMixin from './MenuMixin'

  export default {
    mixins: [MenuMixin]
  }
</script>
```