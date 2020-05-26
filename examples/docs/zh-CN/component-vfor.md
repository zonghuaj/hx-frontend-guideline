### 为 `v-for` 设置键值

**总是用 `key` 配合 `v-for`。**

在组件上*总是*必须用 `key` 配合 `v-for`，以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的[对象固化 (object constancy)](https://bost.ocks.org/mike/constancy/)，也是一种好的做法。


假设你有一个待办事项列表：

``` js
data: function () {
  return {
    todos: [
      {
        id: 1,
        text: '学习使用 v-for'
      },
      {
        id: 2,
        text: '学习使用 key'
      }
    ]
  }
}
```

然后你把它们按照字母顺序排序。在更新 DOM 的时候，Vue 将会优化渲染把可能的 DOM 变更降到最低。即可能删掉第一个待办事项元素，然后把它重新加回到列表的最末尾。

这里的问题在于，不要删除仍然会留在 DOM 中的元素。比如你想使用 `<transition-group>` 给列表加过渡动画，或想在被渲染元素是 `<input>` 时保持聚焦。在这些情况下，为每一个项目添加一个唯一的键值 (比如 `:key="todo.id"`) 将会让 Vue 知道如何使行为更容易预测。

根据我们的经验，最好*始终*添加一个唯一的键值，以便你和你的团队永远不必担心这些极端情况。也在少数对性能有严格要求的情况下，为了避免对象固化，你可以刻意做一些非常规的处理。


#### 反例

``` html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

#### 好例子

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```


### 避免 `v-if` 和 `v-for` 用在一起<sup data-p="a">必要</sup>

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。

- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。


当 Vue 处理指令时，`v-for` 比 `v-if` 具有更高的优先级，所以这个模板：

``` html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

将会经过如下运算：

``` js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```

因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。

通过将其更换为在如下的一个计算属性上遍历：

``` js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

``` html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

我们将会获得如下好处：

- 过滤后的列表*只*会在 `users` 数组发生相关变化时才被重新运算，过滤更高效。
- 使用 `v-for="user in activeUsers"` 之后，我们在渲染的时候*只*遍历活跃用户，渲染更高效。
- 解耦渲染层的逻辑，可维护性 (对逻辑的更改和扩展) 更强。

为了获得同样的好处，我们也可以把：

``` html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

更新为：

``` html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

通过将 `v-if` 移动到容器元素，我们不会再对列表中的*每个*用户检查 `shouldShowUsers`。取而代之的是，我们只检查它一次，且不会在 `shouldShowUsers` 为否的时候运算 `v-for`。


#### 反例

``` html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

``` html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

#### 好例子

``` html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

``` html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
