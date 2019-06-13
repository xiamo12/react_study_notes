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
import myStyle from "./style.js"
```

