# 在style当中封装样式

### 第一层封装：将样式与对象分离

将style属性写成对象的形式封装在变量里面，在组件return返回的标签里用{}引用该样式：

```javascript
import React from "react";

const itemStyle = {
  color:"red",
  backgroundColor:"#ccc",
  fontSize:"10px",
};
const userStyle = {
  color: "white",
  backgroundColor: " orange",
  border:"1px dotted black",
  boxShadow: "0 0 10px #ccc",
};
const contentStyle = {
  color:"yellow",
};

class App extends React.Component{
  render(){
    return (<div style={itemStyle}>
              <h1 style={userStyle}>My style username</h1>
              <h2 style={contentStyle}>My content</h2>
            </div>)
  }
}

export default App;
```

### 第二层封装：合并成一个大的样式对象

将这些样式以对象的形式，写在一个对象里面：

```JavaScript
const myStyle = {
		item:{
			color:"red",
			backgroundColor:"#ccc",
			fontSize:"10px",
			},
		user:{
			  color: "white",
			  backgroundColor: " orange",
			  border:"1px dotted black",
			  boxShadow: "0 0 10px #ccc",
			},
		content:{
			  color:"yellow",
			},
		};
```

### 第三层：抽离为单独的样式表模块：

可以把这些style代码单独封装成一个文件，`export default` 导出该文件，在项目文件里面`import`导入：

单独封装的style样式文件，例如路径名为`src/components/style.js`

```javascript
const myStyle = {
		item:{
			color:"red",
			backgroundColor:"#ccc",
			fontSize:"10px",
			},
		user:{
			  color: "white",
			  backgroundColor: " orange",
			  border:"1px dotted black",
			  boxShadow: "0 0 10px #ccc",
			},
		content:{
			  color:"yellow",
			},
		};

export default myStyle;
```

项目的jsx文件，假设路径名为：`src/components/Hello.jsx`

```javascript
import myStyle from "./style.js";

class Hello extends React.Component{
  render(){
    return <div style={myStyle.item}>Hello World!</div>
  }
};
```

使用导入css样式表的方式来美化项目代码，在jsx文件的开头import需要的css文件，此处的css源文件因为没有向外暴露，所以这时候对它进行操作，导出的是空对象{}。	

```javascript
import mystyle from "./style.css"
console.log(mystyle);//输出{}。原因是style.css文件没有向外暴露【即没有export default】，因此此时mystyle是一个空对象。如果此处导入的是一个由export default的js文件，那么就会输出内容了。
```

#### **<u>直接导入css样式表，默认是全局生效的，也就是说对整个项目都是生效的。</u>**因为css没有独立作用域，而js有独立作用域。只要在任何独立组件之中用到了某个css样式表，那么这个css样式表默认在全局（包括其他该项目的独立组件）都可以用到。这样就会造成样式冲突的问题。要如何解决这个问题？

在vue中，也存在css样式冲突的问题。可以通过添加scoped指令：`<style scoped></style>`的方式来解决。但是react当中没有指令的概念。