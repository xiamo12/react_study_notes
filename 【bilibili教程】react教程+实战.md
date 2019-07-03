# 【bilibili教程】react教程+实战

1. 基础内容

2. 环境搭建

3. 基础语法

4. 原理进阶

5. 动画

6. redux

7. redux进阶

   

8. 《简书》实战项目

9. 环境搭建‘

10. Header

11. 首页

12. 详情页

13. 登陆校验

14. 上线



用到的工具和思维：

create-react-app这个脚手架工具的搭建和使用

组件化思维jsx模版语法

开发调试工具

虚拟DOM

生命周期

React-transition-group

Resux

Antd

UI，容器组件

无状态组件（有状态还是无状态取决于组件有没有state属性，有没有生命周期函数）



redux-thunk

redux-saga

styled-components做css样式编码，避免组件之间的相互影响。在项目样式布局时使用，

Immutable.js数据框架，这个库可以有效避免数据的误操作

redux-immutable redux中间件

axios发送ajax请求

`React JS`用react的语法，编辑网站的交互效果

`React Native`编写原生的技术应用

16之后的react被称为React Fiber



做一些复杂度高一的的项目时，可以用react js；vue.js提供更多的组件api





用脚手架工具搭建环境，官方推荐create-react-app

```
$ sudo cnpm install 
```

## 工程文件目录简介：

package.json：node的包文件，使项目文件变成一个node包

.gitignore：用git管理代码时，不想上传到git仓库的文件定义在这里

node_modules：项目依赖的第三方的包，这些包不是我们写的，是脚手架工具要实现自己的功能需要依赖的文件。

public目录：index.html首页的html模版

- noscript标签：当页面不支持script时就会显示这段代码里的内容
- mainfest.json：定义了网页当成app使用时，可以有一个快捷方式显示该app的显示方式。如果不需要就可以把它删除。记得把html里的引用也要删除掉。

src目录：项目开发时最重要的目录，放着项目所有的源代码，代码入口在index.js文件里。整个程序的入口文件在index.js里.

- App.test.js文件：自动化的测试文件
- index.js引入App组件，将组件渲染到页面上。
- serviceWorker文件：用户打开一次即可缓存页面，使得不联网的时候如果需要再次打开该网页，也能打开。

## react中的组件

一个页面可以拆分成很多个组件。将页面拆分成组件便于代码的编写和维护。这就是前端组件化的概念



## todolist增删列表项的功能

```javascript
import React from 'react';
// import ReactDOM from "react-dom";
import mystyle from './style/index.scss'


class TodoList extends React.Component{
  constructor(){
    super();
    this.state = {
      inputValue: "",
      list: [1,2,3]
    }
  }

  handleInputChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }

  handleBtnClick(){
    this.setState({
      list:[...this.state.list, this.state.inputValue],//把数组原来的项目展开，同时添加从input框里获取的新项目，添加到该数组里面
      inputValue: ""//添加完新的输入项之后，清空输入框
    })
  }

  handleItemdelete(index){
    const list = [...this.state.list];//拷贝list数组到list中
    list.splice(index, 1);//删除被点击的这个list元素
    this.setState({
      list: list
    })
  }

  render(){
    return <div>
    <input value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}/>
    <button onClick={this.handleBtnClick.bind(this)}>提交</button>
    <ul>
    {this.state.list.map( (item,index)=> {
      return <li key={index} onClick={this.handleItemdelete.bind(this, index)} title="点击删除">{item}</li>
    })}
    </ul>
    </div>
  }
}

export default TodoList;

```

jsx里的注释：{/* */}，html的多行注释外面放一层花括号。

jsx的语法里面，如果要用变量或者表达式，就要给该变量/表达式套上花括号{}

jsx里底层的一个占位符组件：`<Fragment></Fragment>`。大写字母开头的是一个组件，小写字母开头的是普通的元素

jsx里用className代替class表示类名，用htmlFor代替label标签的for属性。

输入框里输入标签。要使标签不被转译，可以用`dangerouslySetInnerHTML={{__html: item}}`【危险设置】【外层花括号表示这是一个js表达式，内层表示一个js对象】



## 拆分组件与组件之间的传值

创建新的下一层组件TodoItem.js

此时顶层组件为TodoList.js，包含了TodoItem组件

通过属性的形式，从父组件传递要显示的数据给子组件。用props属性的形式传递。

```html
//父组件中
<ul>
  {this.state.list.map((item, index)=>{return <div>
  <TodoItem content={item}></TodoItem>
  </div>})}
</ul>
//子组件中
class TodoItem extends React.Component{
  constructor(){}
  render(){
    return <div>{this.props.content}</div>
  }
}
```

表示当我们使用子组件`TodoItem`的时候，将list中的`item`项传递给`content`,组件见通过`this.props.content`

父组件向子组件传递内容，通过props的方式；父组件写属性，子组件通过`this.props.content`的方式引用父组件的该content属性的内容

子组件如何调用父组件的方法，来更改父组件的内容。

子组件如何调用父组件方法，然后更改父组件里的数据呢？

父组件里设置属性，子组件里用{this.props.propertyName}来传递

本节主要介绍了父子组件之间如何传递值和方法。父组件向子组件传值：将值以属性的形式写在父组件中，在子组件中通过`this.props.property`访问；

子组件通过this.props.action(this.props.property)的语法来接收父组件传递过来的方法。注意在父组件中，传递方法时要绑定this 的指向。

```javascript
//父组件中
render(){
  return (<div>
    <TodoItem content={item} index={index} deleteItem={this.handleItemDelete.bind(this)}><\TodoItem>
  </div>)
}
```

TodoList代码优化

做结构赋值

```
this.props.content ==> 
const content = {this.props};
然后写this.props.content的地方改成{ content };
```

this指向的绑定建议放在顶部constructor函数内部。

```
constructor(props){
  super(props);
  this.state = {};
  this.myfunction = this.myfunction.bind(this)//将myfunction函数的this指向该组件
}
```

旧版的setState()里接受一个对象作为参数；

新版的setState()里可以接收一个函数作为参数：setState( ()=> { return { inputValue: e.target.value}})

setState里面如果传入一个函数，那么这个函数可以接受一个`prevState`参数。这个参数表示修改这个数据之前，这个数据`state`是什么。也就是`prevState`可以指代`this.state`。

如果对数组项进行循环迭代，那么循环中的每一项我们需要给它一个key值，来确定每一项都是不重复的。key值应该放在循环的最外层元素上。



## 围绕react衍生出来的思考

react是一种声明式的开发方式。与之相对应的是命令式的开发方式。

react是面向数据来编程的，只要数据构建好了，react会根据数据来构建网站。react可以帮助我们节约掉操作dom部分的代码。

react可以与其它jquery等其它框架并存，每个库只管理自己负责的那部分代码。

react的开发，是一种组件式的开发。我们通过class继承component来定义一个react组件。组件标签以大写字母开头，普通元素的标签以小写字母开头。

一个完整的组件是一个树状结构。

react之中如何做父子组件的通信：

- 父组件的属性和方法通过props传递给子组件；
- 子组件如果想要传值给父组件，可以通过调用父组件传递过来的方法。
- 单向数据流：父组件可以向子组件传值，但是子组件只能使用这个值，不能改变这个值。因为如果数据流是双向的，那么如果一个父组件里包含了多个子组件，多个子组件又引用了父组件的同一个属性，如果这个数据出现了bug，很难排查bug出现在哪里，不利于代码的调试。
- 如果子组件要修改父组件的值，那么需要在子组件中调用父组件传递过来的方法，底层的修改操作依然是由父组件来进行的。
- react是一个视图层的框架
- react采用虚拟dom，通过diff算法，减少dom重复渲染的次数，提高性能。