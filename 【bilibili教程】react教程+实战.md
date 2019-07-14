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

- jsx里的注释：{/* */}，html的多行注释外面放一层花括号。

- jsx的语法里面，如果要用变量或者表达式，就要给该变量/表达式套上花括号{}

- jsx里底层的一个占位符组件：`<Fragment></Fragment>`。大写字母开头的是一个组件，小写字母开头的是普通的元素

- jsx里用className代替class表示类名，用htmlFor代替label标签的for属性。

- 输入框里输入标签。要使标签不被转译，可以用`dangerouslySetInnerHTML={{__html: item}}`【危险设置】【外层花括号表示这是一个js表达式，内层表示一个js对象】



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
- 在做大型项目的时候，可以将react与一些数据层的框架结合在一起使用，解决数据之间复杂传值的问题。这时候的react就把自身定义为视图层的框架。将视图层框架与数据层框架组合使用开发大型应用
- 函数式编程：react创建的组件里面是由一个个的函数组成。当我们创建了一个react组件的时候，首先执行的是组件里面的constructor函数。函数式编程的优点：易于维护；面向测试的开发流程中，容易测试。给函数一个数值，观察运行是否符合预期就能测试出函数是否正确
- 我们用react写出来的项目更容易实现前端自动化测试

## 安装react安装调试工具

chrome的扩展程序里安装。安装完react调试工具之后，在chrome里使用react开发的网站右上角显示红色，否则显示灰色。



## propsTypes与defaultProps的应用

### propTypes:

<u>组件接收一个传递过来的值，propTypes对这个值进行校验；</u>

### defaultProps

<u>组件接收一个传递过来的值，defaultProps对这个值定义默认值。</u>

### isRequired

每个组件都有自己的props参数，这个参数是从父组件传递过来的一些属性。propsTypes与defaultProps可以对传入的props参数类型进行校验.

使用步骤：

- 引入propTypes：

  Create-react-app脚手架工具里自带了proptypes包，所以可以直接引入

- ```
  import PropTypes from "prop-types"
  ```

- 在组件下方对组件进行校验：

- ```javascript
  class App entends React.Component {
    render{
    const { content } = this.props;
    return (<div>{content}</div>);
    }
  };
  App.propTypes = {
  content: PropTypes.string,//表示content这个prop，它的类型必须是一个string类型。此处的PropsTypes必须和上方import引入的写法要一致。
  deleteItem: PropsTypes.func,//表示deleteItem必须是一个函数
  index：PropsTypes.number,//表示index必须是一个number类型
  }
  ```

- 如果在子组件里面定义了一个父组件传递过来的变量，但是实际上父组件没有传递该变量，那么这个变量在执行的时候会被忽略。如果作校验的时候不想父组件传递过来的变量被忽略，可以增加一个`isRequired`检验：

  ```javascript
  App.propTypes = {
    test: PropTypes.string.isRequired,//test是一个string类型。且test必须要从父组件传递到子组件
    content: PropTypes.string,
    index: PropTypes.oneOfType(PropTypes.number,PropTypes.string)//表示index可以是number类型\字符串类型之一。
  }
  ```

  ```javascript
  //官方文档⬇️
  import PropTypes from 'prop-types';
  
  MyComponent.propTypes = {
    // You can declare that a prop is a specific JS type. By default, these
    // are all optional.
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
  
    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: PropTypes.node,
  
    // A React element.
    optionalElement: PropTypes.element,
  
    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: PropTypes.instanceOf(Message),
  
    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
  
    // An object that could be one of many types
    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message)
    ]),
  
    // An array of a certain type
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  
    // An object with property values of a certain type
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  
    // An object taking on a particular shape
    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),
    
    // An object with warnings on extra properties
    optionalObjectWithStrictShape: PropTypes.exact({
      name: PropTypes.string,
      quantity: PropTypes.number
    }),   
  
    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: PropTypes.func.isRequired,
  
    // A value of any data type
    requiredAny: PropTypes.any.isRequired,
  
    // You can also specify a custom validator. It should return an Error
    // object if the validation fails. Don't `console.warn` or throw, as this
    // won't work inside `oneOfType`.
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },
  
    // You can also supply a custom validator to `arrayOf` and `objectOf`.
    // It should return an Error object if the validation fails. The validator
    // will be called for each key in the array or object. The first two
    // arguments of the validator are the array or object itself, and the
    // current item's key.
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
      if (!/matchme/.test(propValue[key])) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    })
  };
  ```

  

- 此时如果父组件没有传递该值（这里是test），那么程序会报错。要解决报错的问题，可以为参数设置默认props：`defaultProps`

- ```
  App.defaultProps = {
  test: "hello world!"
  }
  ```

## Props，state与render函数

**当组件的state或者props发生改变的时候，render函数就会重新执行，页面重新渲染。**

数据发生变化时，页面会发生变化，因为页面是用render渲染出来的。数据变化的时候render函数会被重新执行一次

什么情况下子组件的render函数重新运行？

1. 当state或者props发生变化时，render函数就会重新执行；
2. 当父组件的render函数被运行时，它的子组件的render都会重新运行一次；

## 虚拟DOM

DOM：浏览器中的概念，用js对象来表示页面中的元素，斌提供了操作dom对象的API

虚拟DOM：框架中的概念，是一个js对象，用来模拟页面上的DOM元素和DOM嵌套关系，实现页面的高效更新

 虚拟DOM的底层逻辑：

- 生成js对象，用一个js对象来完整描述一个DOM结构

```javascript
//<div id="root"><span>hello world!</span></div>
['div', {id: 'root'}, ['span', {}, "hello world!"] ]
```

- 当state发生变化时，生成一个新的虚拟DOM

```javascript
//<div id="root"><span>小猫咪!</span></div>
['div', {id: 'root'}, ['span', {}, "小猫咪!"] ]
```

- 比较原始虚拟DOM和新的虚拟DOM的区别，发现区别是span中的内容。js对象之间的比对所消耗的性能非常少。
- 直接操作dom，改变span中的内容
- render函数里的标签不是一个真实DOM，它是jsx的模版语法，先由jsx语法转换成js对象，再转换成一个真实的dom。react底层通过react.createElement语法，将jsx模版变成一个js对象，然后再转化成虚拟DOM

```javascript
//jsx --> React.createElement() --> js对象（虚拟DOM） --> 真实的DOM
render(){
  return React.createElement('div', {}, 'item');//React.createElement是一个更偏向底层的接口
  //等效于 return <div>item</div>
}
```

使用虚拟dom的优点

- 提升性能
- 使得跨端应用得以实现

## Diff算法

同级比对。将每一层的DOM进行逐层对比。

算法简单，比对速度快。虽然可能会造成dom上重新渲染上的浪费，但是会大大降低两个虚拟DOM之间比对算法对性能的消耗。

因为react是使用diff算法进行新旧虚拟DOM的比对，所以每个DOM节点最好有一个独一无二的、稳定的key值，避免两个虚拟DOM比对时产生对应错误。

## react中ref的使用

在react里，可以用`e.target`来代表一个事件对应的元素节点，也可以用`ref`获取dom的元素节点。

`ref`的对象里包含一个箭头函数。

```javascript
<input value={this.state.inputValue} ref={ (input)=> {this.input = input}}>//ref表示构建一个ref引用，这个引用叫做this.input,指向input对应的DOM节点
```

react里尽量用数据驱动的方式来编写代码，尽量不要直接操作DOM。

## 生命周期函数的使用场景

```javascript
class App extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    if (nextProps.content !== this.props.content){
      return true;
    }else{
      return false;
    }
  }
  render(){
    const { content } = this.props;
    return <div>{content}</div>
  }
}
```

- `shouldComponentUpdate(){}`函数在每次组件的props或者state发生改变的时候，问询组件是否进行render函数的重新渲染。避免了组件不必要的渲染，提高react组件的性能

如果需要使用`ajax`发送|接收异步请求|信息，将`ajax`代码写在`componentDidMount(){}`函数里，表示组件被调用之后执行该函数。

- `componentDidMount(){}`函数只在组件被挂载到页面上时执行一次，之后不再重复执行。
- ajax请求也可以写在`componentWillMount(){}`函数里，但当我们需要写react Native，或者一些更深的技术的时候，如果把ajax写在其中，可能会与一些更高端的技术产生冲突。因此建议把ajax请求放在`componentDidMount(){}`函数里面，这样永远都不会产生冲突。
- 也可以将ajax请求写在constructor函数里，它在组件初始化时会被执行。但可能会出现问题。

- `axios`模块可以帮助我们发送`ajax`请求

```
$ sudo cnpm install axios
```

## 使用charles实现本地数据模拟

使用ajax处理请求返回的数据。使用charles实现本地数据的模拟



## react中使用css3过渡动画

用到css3的属性transition

```css
.show{
  transition: width 2s ease-in/*规定把效果作用到哪个属性上；规定效果的时长；规定效果的时间曲线以慢速开始*/
}
```

## react中使用css3动画效果

```css
.show{
  animation: firstClass 2s ease-in forwards;/*forwards表示*/
}

@keyframes firstClass{
  0% {
    width:100px;
    height:100px;
    background-color:orange;
  }
  50% {
    width:150px;
    height:150px;
    background-color:red;
  }
  100% {
    width:200px;
    height:200px;
    background-color:blue;
  }
}
```

以上两种设置动画的方式，其局限性在于，涉及到js动画的时候就无法处理了。

## react-transition-group实现动画

github地址上查看文档，首先安装react-transition-group：

```
$ yarn add react-transition-group
```

CSSTransition的使用：CSSTransition是一个动画组件。首先用它包裹需要应用动画的