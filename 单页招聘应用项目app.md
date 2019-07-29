单页招聘应用项目app

搭建一个项目的步骤：

一、项目描述：这是一个前后端分离的招聘单页应用，包括前端和后端应用

二、项目功能

用户注册、登陆、实时聊天等模块

三、项目使用技术栈：

前端：react全家桶+es6+webpack静态模块打包工具

后端：node+express+mangodb+socketIO等技术

采用模块化、组件化、工程化的模式进行开发。

四、技术选型（当前项目用到哪些技术或者相关库）



[TOC]

概念：

拆分路由。

前端路由分为注册、登陆、主界面

测试接口是否能访问，能访问的基础上是不是和接口文档一致。必须要一致。

前后台分离

接口文档要写清除



使用create-react-app初始化项目开发

npm start：自动编译打包刷新，查看效果，此时并没有生成本地的打包文件

npm run build：进行生产环境打包，生成本地的打包文件



- 用create-react-app搭建项目结构。注意npm start开始自动编译打包项目文件，查看效果；npm run build是生成本地的打包文件；

### 引入antd mobile，安装在生产依赖 - -save里。

- ```
  sudo cnpm install antd-mobile -S
  ```

- 移动端项目编写meta：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" /> <!--设置页面的初始缩放值、允许用户的最大缩放值、允许用户的最小缩放值、是否允许用户进行缩放-->
```

- 移动端项目解决点击延迟的问题：

```html
<script	src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
  if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
      FastClick.attach(document.body); //引入FastClick库，解决点击延迟的问题
    },false);
  }
  if(!window.Promise){
    document.writeIn('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"+'>'+'<'+'/+'script>');
  }
</script>
```

- 实现组件的按需打包：加载依赖模块到开发依赖里面:

  -  babel-plugin-import:按需加载组件代码和样式，放在生产依赖里

  ```
  sudo cnpm install babel-plugin-import react-app-rewired -S
  ```

- 在项目根目录下创建一个配置文件config-overrides.js，编写配置：

  ```javascript
  const { injectBabelPlugin } = require("react-app-rewired");
  module.exports = function override(config, env){
    config = injectBabelPlugin(["import",{libraryName:'antd-mobile',style:'css'}],config);
    return config;
  }
  ```

- 修改package.json文件，将react-scripts包改成react-app-rewired。这意味着要先读取config-overrides.js里的配置才能实现按需打包

  ```json
  "scripts":{
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired --env=jsdom",
    "eject": "react-scripts eject"
  }
  ```

  在应用中使用antd-mobile组件时，injectBabelPlugin不能正常工作，出现问题：

  ```
  The "injectBabelPlugin" helper has been deprecated as of v2.0. You can use customize-cra plugins in replacement - https://github.com/arackaf/customize-cra#available-plugins
  ```

  原因是新版本的react-app-rewired移除了injectBabelPlugin方法，并把这些方法移动到一个叫做`customize-cra`的包里，而这个包依赖于`react-app-rewired@2.x` 。所以我们需要确保`customize-cra`和`react-app-rewired@2.x`都被正常加载；同时加载`less`和`less-loader`，最后修改一下配置文件：

  ```javascript
  const {
    override,
    fixBabelImports,
    addLessLoader,
  } = require("customize-cra");
  
  
  module.exports = override(
    fixBabelImports("import", {
      libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" }
    })
  );
  ```

在index.js文件里面，尝试从`antd-mobile`里引入一个Button组件

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd-mobile";

ReactDOM.render(<Button type="primary">点击按钮</Button>,document.getElementById("root"));
//渲染出的button为带蓝色样式的按钮。             
```

- ❌最开始出错，button样式渲染不出来。(?)

解决办法：将babel-plugin-import安装到开发依赖里【⚠️后来问题解决了，测试之后发现不是这个原因】

```
sudo cnpm install babel-plugin-import -D
```

- 在config-overrides配置文件里面修改primary的默认颜色，修改完以后要重新`npm start`运行，否则效果出不来

```javascript
 modifyVars: { 
      // "@primary-color": "#1DA57A",
      
     "@brand-primary": "#1cae82",
     "@brand-primary-tap": "#1DA57A",
    }
```



### 总结：引入antd-mobile的步骤

📒antd里的样式是用less写的，因此我们需要加载less和less-loader模块，对antd的一些样式模块进行重新打包；⚠️：less和less-loader放在开发依赖里(- -save-dev)

📒实现组件的按需打包：`babel-plugin-import`，`react-app-rewired`  - -save

📒项目根目录下创建配置文件config-overrides.js

📒：加载`customize-cra`和`react-app-rewired@2.x`，因为新版本的react-app-rewired将injectBabelPlugin移到了`customize-cra`包里，而这个包依赖于`react-app-rewired@2.x`。

📒：更改package.json里的scripts配置为：

```
"starts": "react-scripts start" - -> "react-app-rewired start"
"build": "react-scripts build" - -> "react-app-rewired build"
"test": "react-app-reqired --env=jsdom"
"eject": "react-scripts eject"
```

📒：在js文件里引入antd-mobile里的组件，例如button组件：

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd-mobile";

ReactDOM.render(<Button type="primary">点击</Button>,document.getElementById("root"));
```

如果需要更改button里的默认颜色，可以在配置文件config-overrides里的`modifyVars`进行修改。



## 引入路由

此项目需要用到三个一级路由，分别用于注册、登陆、主页面。

1. 下载路由包：`react-router-dom`

2. 因为我们需要用到三个一级路由，且绝大多数路由组件都会跟redux进行交互。因此需要在containers文件夹里面创建三个路由组件文件夹：register- -> register.jsx；login- - >login.jsx;  main - ->main.jsx;

3. 将这三个路由组件映射到项目入口文件index.js上

   ```javascript
   //入口js文件
   
   import React from "react";
   import ReactDOM from "react-dom";
   import { HashRouter, Route, Switch } from "react-router-dom";
   import Register from "./containers/register/register";
   import Main from "./containers/main/main";
   import Login from "./containers/login/login";
   
   
   ReactDOM.render((
   	<HashRouter>
       <Switch>
           <Route path="/register" component={ Register }></Route>
           <Route path="/login" component={ Login }></Route>
           <Route component={ Main }></Route> //main没有请求路径。当路径为以上指定路径的时候执行上述路径，其它所有的都执行main路径。
         </HashRouter>
       <Switch>
   	), document.getElementById("root"));
   ```

   ⚠️：在HashRouter路由器里配置了三个路由，只能在三个路由中选择显示其中一个路由（在三个路由中进行切换），因此需要从`react-router-dom`引入`Switch`组件

   如果不引入Switch，那么当我们选择register/login路径的时候，main组件也会显示出来

## 引入路由总结

📒：下载路由包：`react-router-dom`;

📒：在containers文件夹下面创建三个一级路由文件夹，分别存放注册界面、登陆界面、主界面路由；

📒：在三个文件夹下的路由文件里写好react代码；

📒：在项目入口文件里引入路由类型、组件

```javascript
//index.js

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";

ReactDOM.render((<HashRouter>
                   <Switch>
                      <Route path="/register" component={ Register }></Route>
                      <Route path="/login" component={ Login }></Route>
                      <Route component={ Main }></Route>
                   </Switch>
                 </HashRouter>),doucment.getElementById("root"))

```

⚠️：从路由引入的组件包括HashRouter、Route、Switch；

⚠️：同一时间只能呈现一个一级路由，因此需要用到切换路由的功能组件`<Switch>`

⚠️：路由在指定路径的情况下，执行该路由；没有指定的情况下，所有非指定路径的路由都要经过这里执行

⚠️：js文件头部引入路由类型组件HashRouter、路由组件Route、切换组件Switch；路由组件Route里要写路径path和组件名component。示例`<Route path="/register" component={ Register }>`

❓Route组件里的path路径是怎么得来的？

### 引入redux







