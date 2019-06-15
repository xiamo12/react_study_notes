# react实例：TodoList组件的制作

react组件规定：render(){}里面的return值，return到的元素最外层必须要有一个包裹元素。

react给我们提供了一个`<Fragment>`占位符，当`return`要求必须有一个外层包裹元素的时候，就可以使用这个占位符，这样dom树当中就不会出现额外的、我们不需要的`<div>`元素

```javascript
import React,{ component, Fragment} from "react";
...
render(){
  return (
    <Fragment>
      <div>
        <button>点击提交</button>
      </div>
    </Fragment>
  )
}
```



## react中的响应式设计思想和事件绑定

js数据绑定思想：找到数据，找到要绑定数据的dom，进行对应的数据绑定；

react数据绑定思想：不要操作DOM，取而代之的是操作数据。

react当中，`state`负责存储组件里面的数据；当组件被渲染的时候，首先执行的是constructor里面的代码。如果要改变组件`state`里的数据，用的是`this.setState({})`方法。

jsx中如果要用到一些js的表达式，那么就需要将这些表达式用{}包裹起来

事件绑定的时候，需要通过`.bind(this)`对事件的词法作用域进行变更。

在state里的list列表里增加数据：

```javascript
...
//组件的构造函数里面⬇️
this.state = {
  inputValue: "",
  list: [],
}
...

this.setState({
  list: [...this.state.list, this.state.inputValue],//用展开运算符，展开list数组里的每一项；再将inputValue的值添加其后。
  inputValue: "",//输入-->列表添加完数据之后，输入框清空。
})
```

state里有一个immutable的概念，他不允许我们对state的值通过`this.state.arguements = "hello"`这样的形式去做改变。要改变state的值，只能通过`this.setState({})`方法