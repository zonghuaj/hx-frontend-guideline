## 组件事件命名

Vue.js 提供的处理函数和表达式都是绑定在 ViewModel 上的，组件的每一个事件都应该按照一个好的命名规范来，这样可以避免不少的开发问题，具体可见如下 **为什么**。

### 为什么？

* 开发者可以随意给事件命名，即使是原生事件的名字，这样会带来迷惑性。
* 过于宽松的事件命名可能与 [DOM 模板不兼容](https://vuejs.org/v2/guide/components.html#DOM-Template-Parsing-Caveats)。

### 怎么做？

* 事件名也使用连字符命名。
* 一个事件的名字对应组件外的一组意义操作，如：upload-success、upload-error 以及 dropzone-upload-success、dropzone-upload-error （如果需要前缀的话）。
* 事件命名应该以动词（如 client-api-load） 或是 名词（如 drive-upload-success）结尾。（[出处](https://github.com/GoogleWebComponents/style-guide#events)）



## 避免 this.$parent

Vue.js 支持组件嵌套，并且子组件可访问父组件的上下文。访问组件之外的上下文违反了[基于模块开发](#基于模块开发)的[第一原则](https://addyosmani.com/first/)。因此你应该尽量避免使用 **`this.$parent`**。

### 为什么？

* 组件必须相互保持独立，Vue 组件也是。如果组件需要访问其父层的上下文就违反了该原则。
* 如果一个组件需要访问其父组件的上下文，那么该组件将不能在其它上下文中复用。

### 怎么做？

* 通过 props 将值传递给子组件。
* 通过 props 传递回调函数给子组件来达到调用父组件方法的目的。
* 通过在子组件触发事件来通知父组件。


## 谨慎使用 this.$refs

Vue.js 支持通过 `ref` 属性来访问其它组件和 HTML 元素。并通过 `this.$refs` 可以得到组件或 HTML 元素的上下文。在大多数情况下，通过 `this.$refs`来访问其它组件的上下文是可以避免的。在使用的的时候你需要注意避免调用了不恰当的组件 API，所以应该尽量避免使用 `this.$refs`。

### 为什么？

* 组件必须是保持独立的，如果一个组件的 API 不能够提供所需的功能，那么这个组件在设计、实现上是有问题的。
* 组件的属性和事件必须足够的给大多数的组件使用。

### 怎么做？

* 提供良好的组件 API。
* 总是关注于组件本身的目的。
* 拒绝定制代码。如果你在一个通用的组件内部编写特定需求的代码，那么代表这个组件的 API 不够通用，或者你可能需要一个新的组件来应对该需求。
* 检查所有的 props 是否有缺失的，如果有提一个 issue 或是完善这个组件。
* 检查所有的事件。子组件向父组件通信一般是通过事件来实现的，但是大多数的开发者更多的关注于 props 从忽视了这点。
* **Props向下传递，事件向上传递！**。以此为目标升级你的组件，提供良好的 API 和 独立性。
* 当遇到 props 和 events 难以实现的功能时，通过 `this.$refs`来实现。
* 当需要操作 DOM 无法通过指令来做的时候可使用 `this.$ref` 而不是 `JQuery`、`document.getElement*`、`document.queryElement`。


```html
<!-- 推荐，并未使用 this.$refs -->
<range :max="max"
  :min="min"
  @current-value="currentValue"
  :step="1"></range>
```

```html
<!-- 使用 this.$refs 的适用情况-->
<modal ref="basicModal">
  <h4>Basic Modal</h4>
  <button class="primary" @click="$refs.basicModal.hide()">Close</button>
</modal>
<button @click="$refs.basicModal.open()">Open modal</button>

<!-- Modal component -->
<template>
  <div v-show="active">
    <!-- ... -->
  </div>
</template>

<script>
  export default {
    // ...
    data() {
      return {
        active: false,
      };
    },
    methods: {
      open() {
        this.active = true;
      },
      hide() {
        this.active = false;
      },
    },
    // ...
  };
</script>

```

```html
<!-- 如果可通过 emited 来做则避免通过 this.$refs 直接访问 -->
<template>
  <range :max="max"
    :min="min"
    ref="range"
    :step="1"></range>
</template>

<script>
  export default {
    // ...
    methods: {
      getRangeCurrentValue() {
        return this.$refs.range.currentValue;
      },
    },
    // ...
  };
</script>
```