总结复习：

## webpack部分

- 每webpack一次，html里就会引用main.js一次。

- 加载html-webpack-plugin插件的语法为：

  ```
  $ sudo cnpm install html-webpack-plugin -D
  ```

  ```javascript
  //config.js配置文件
  
  const path =reaquire("path");
  const htmlWebpackPlugin = require("html-webpack-plugin");
  const htmlPlugin = new htmlWebpackPlugin({
    template: path.join(__dirname, "./dist/index.html"),
    filename: "index.html"//内存生成的html文件名
  });
  
  module.exports = {
    mode: "development" //development|production开发模式|生产模式两种
    plugins:[htmlPlugin]
  }
  ```



## react加载安装部分

- 加载react插件、在js文件里引用react和react-dom、

  ```
  $ sudo cnpm install react react-dom -S
  ```

  ```javascript
  //js文件
  import React from "react";
  import ReactDOm from "react-dom";
  ```

- 编写react的js代码，使用ReactDOM.render()。
  - 里面有两个参数，第一个是要渲染的虚拟DOM，该虚拟DOM最外层必须要有一个元素进行包裹。如果不想让页面出现多余的<div>标签，可以用一个标签占位符<Fragment></Fragment>来进行容器包裹。
  - 第二个参数是从html文档获取的容器。

```javascript
ReactDOM.render(
  <div><App /></div>,
  document.getElementById("root")
);
```

## 启用jsx语法

- 启用jsx语法：

  - 安装babel插件：

    ```
    $ sudo cnpm install babel-core babel-loader babel-plugin-transform-runtime -D
    $ sudo cnpm install babel-preset-stage-0 -D
    $ sudo cnpm install babel-preset-react -D
    ```

  - 创建.babelrc文件，编写代码：

    ```json
    {
      "presets": ["env", "stage-0", "react"],
      "plugins": ["transform-runtime"]
    }
    ```

  - 编写config.js配置文件：

    ```javascript
    module.exports = {
      mode: "development" //development|production开发模式|生产模式两种
      module:{
        rules:[
        {test:/\.js|jsx$/, use:["babel-loader"],exclude: /\.node_modules/}
        ]
      }
    }
    ```

- 在jsx里写代码，注意：要用className代替class类名；用htmlFor代替label的for属性；

- 在jsx里写虚拟DOM的时候，所有的节点都必须要有一个唯一的根节点进行包裹。

- react|vue中的props属性是只读的，不能重新赋值。



## jsx组件的封装

- 独立封装jsx组件：

  - 在src文件夹里面创建`jsx`文件
  - :yellow_heart:import引入react文件；如果组件当中引用了css文件，那么css文件也需要在这里引用；
  - :yellow_heart:写组件代码；
  - :yellow_heart:将组件暴露出去；
  - ⚠️⚠️使用了jsx语法的文件，都要在头部引入`import React from "ract"`

  ```javascript
  import React from "react";
  import ReactDOM from "react-dom";
  
  ...
  class App extends React.Component{
    constructor(){}
  }
  ...
  
  export default App
  ```

- 在js项目文件里引入该组件：

- ```javascript
  import React from "react";
  import ReactDOM from "react-dom";
  import App from "./src/组件名称"
  
  ...
  js项目文件，其中引入了react组件
  ReactDOM.render(<div></div>)
  ...
  
  ```



## 创建组件的方式：

- 用构造函数创建组件：

  ```javascript
  function App(){
    return <div>hello</div>
  }
  ```

  **构造函数创建的是无状态组件，没有私有数据，没有生命周期函数；**

- 用class关键字创建组件

  ```javascript
  class App extends React.Component{
    constructor(){}
    render(){}
    
  }
  ```

  **class关键字创建的组件是有状态组件，有自己的私有数据，有自己的生命周期函数；**

- 实例属性/方法与静态属性/方法：

  - 实例属性/方法：通过this保存在原型对象上，实例对象可以直接访问到的属性/方法；

  - 静态属性/方法：用static关键字定义，实例对象不能访问到的属性/方法

    ```javascript
    class App extends React.Component{
      constructor(){}
      render(){}
      say = function(){}//实例方法
      static myFunc = function(){}//静态方法
    }
    
    ReactDOM.render(
      <div>
        <App />
      </div>,
      document.getElementById("root")
    )
    ```

    

## css样式表部分

终端加载插件style-loader，css-loader，(sass-loader, node-loader)

```
$ sudo cnpm install style-loader css-loader -D 
```

**Css样式文件默认是全局生效的。为了避免样式冲突，我们可以为样式文件开启模块化：**

- 终端安装sass-loader，node-sass

  ```
  $ sudo cnpm install sass-loader node-sass -D
  ```

- 配置文件里写配置

  ```javascript
  {test: /\.scss$/, use:["style-loader","css-loader","sass-loader"]}
  ```

**因此如果为jsx同时启用自定义样式文件和第三方样式文件，终端安装完插件之后，可以按照如下规则进行配置：**

```javascript
module.exports = {
  mode: "production",
  module:{
    rules:[
      {test: /.css$/,  use:["style-loader","css-loader"]},
      {test: /.scss$/, use:["style-loader","css-loader","sass-loader"]}
    ]
  }
}
```

- 将样式独立成单独的js/css文件：js文件写成对象的形式；

```javascript
//js样式文件
const mystyle = {
  header:{
    color: "red",
    backgroudColor: "orange",
    fontSize: "10px",
  },
  content:{
    color: "red",
    backgroudColor: "orange",
    fontSize: "10px",
  },
}
export default mystyle;
```

```javascript
import mystyle from "./src/index.js"
...
  return <div className={mystyle.header}></div>
```

- css样式文件



## todolist组件的编写：

1. 将state里的数据显示在输入框上

2. 获取输入框的数据

3. 将获取到的输入框数据绑定回state上。

   ```javascript
   import React from "react";
   import ReactDOM from "react-dom";
   import bootcss from 'bootstrap/dist/css/bootstrap.css'
   import mycss from "./style/index.scss";
   
   class TodoList extends React.Component{
   	constructor(){
   		super();
   		this.state = {
   			inputValue: "",//文本框里的项
   			list: [],//列表项内容
   		};
   	}
   //#region 改变文本框里的值将会调用这个函数
   	inputValueChange = (e)=>{
   		this.setState({
   			inputValue: e.target.value,
   		})
   	}
   //#endregion
   
   //#regoin 点击button按钮将会调用这个函数
   	inputOnclick = ()=>{
   		this.setState({
   			list: [...this.state.list, this.state.inputValue],
   			inputValue: "",
   		})
   	}
   //#endregoin
   
   
   //#region 点击列表项，删除该项
   	handleDelete = (index)=>{
   		const list =[...this.state.list];
   		list.splice(index,1);
   		this.setState({
   			list: list
   		})
   	}
   
   //#endregoin
   
   	render(){
   		return (<div>
   			<div>
   				<input className={mycss.inputbox} value={this.state.inputValue}  onChange={(e)=>{this.inputValueChange(e)}}/>
   				<button onClick={()=>{this.inputOnclick()}} className="btn btn-primary">点击提交</button>
   			</div>
   			<ul>
   				{this.state.list.map((item,index)=>{
   					return (<li 
   						key={index} 
   						onClick={this.handleDelete.bind(this,index)}
   						title="点击删除"
   						className={mycss.list}
   						>
   						{item}
   						</li>)
   				})}
   			</ul>
   		</div>)
   	}
   }
   
   export default TodoList;
   ```

## 代码出现的bug：

⚠️在删除列表中，如果表示删除的事件处理函数直接用箭头函数，并且传入参数：

```javascript
...
<ul>
  {this.state.list.map((item,index)=>{
    return <li onClick={(index)=>{this.myDelete(index)}}>{item}</li>
  })}
</ul>
...

myDelete = (index)=>{
  const list = [...this.state.list];//获得了list数组的一份拷贝
  list.splice(index,1);
  this.setState({
    list: list
  })
}
```

这样会导致每次删除一项之后，目标项的前一项被删除，目标项变成其前一项。

原因：❓

正确写法：将事件函数用bind(this, index)方法绑定this`onClick={this.myDelete.bind(this,index)}`

```javascript
...
<ul>
  {this.state.list.map((item,index)=>{
    return <li onClick={this.myDelete.bind(this,index)}>{item}</li>//用bind(this,args)方法
  })}
</ul>
...

myDelete = (index)=>{
  const list = [...this.state.list];//获得了list数组的一份拷贝
  list.splice(index,1);
  this.setState({
    list: list
  });
}
```

## jsx语法细节补充

- 大写字母开头的标签，实际上我们把它当成是一个组件

- jsx语法当中的注释格式：{/*   */}。如果要用`//`来写注释的话，就要把注释写成单行的格式。

- 如果想要在jsx的input输入框里面写标签，同时希望标签不被转译，那么就要在标签显示出来的位置标签写上`dangerouslySetInnerHTML={{}}`【外层花括号表示这是一个表达式，里层表示这是一个js对象。】

- ```javascript
  <ul>
    {this.state.list.map((item,index) => {
      return (<li key={index} dangerouslySetInnerHTML={{__html:item}}> {item} </li>)
    })}
  </ul>
  ```

- <label></label>里的for属性用htmlFor代替：

- ```JavaScript
  <label htmlFor="inputArea">输入内容</label>
  <input id="inputArea" value={this.state.inputValue} />
  ```

  