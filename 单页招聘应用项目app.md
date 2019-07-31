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

## 引入antd mobile，安装在生产依赖 - -save里。

**总结使用antd-mobile的使用目的、使用场景、使用方法**

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



## 总结：引入antd-mobile的步骤

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

**总结路由的使用目的、使用场景、使用方法**

此项目需要用到三个一级路由，分别用于注册、登陆、主页面。

1. 下载路由包：`react-router-dom`

   ```
   $ sudo cnpm install react-router-dom -S
   ```

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

## 引入redux

- 安装redux包

```
$ sudo cnpm install react-redux redux-thunk -S
$ sudo cnpm install redux-devtools-extension -D
```

- 创建redux文件夹下的项目文件

```
reducer.js: 包含多个reducer函数，根据老的state和指定的action返回新的state；
store.js: redux最核心的管理模块
actions.js: 包含多个action creator，异步action/同步action
action-type.js: 包含多个action type名称
```

```javascript
//reducer.js

import combineReducers from "redux";


function xxx(state=0,action){
  return state;
}
function yyy(state=0,action){
  return state;
}

export default combineReducers({
  xxx,
  yyy
});
//包含多个用于生成新的state的reducer函数提供。
```

```java
//store.js

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import composeWithDevTools from "redux-devtools-extension";

export default createStore(composeWithDevTools(applyMiddleware(thunk)))
  
  //然后在index.js项目主文件里引入store.js
```

```javascript
//index.js
import React from "react";
import ReactDOM from "react-dom";
import 

import { Provider } from "react-redux";

import store from "./redux/store";

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={ Login }></Route>
        <Route path="/register" component={ Register }></Route>
        <Route component={ Main }></Route>
      </Switch>
    </HashRouter>
  </Provider>
),document.getElementById("root"))
```

❌编写号store.js，reducer.js，index.js文件之后，npm start无法运行。错误显示：

```
Module not found: Can't resolve 'redux' in '/Users/luofei/recruit_react_app/recruit_app/node_modules/_react-redux@3.1.2@react-redux/lib/utils'
```

📓原因：经过检查之后发现自己没有安装`redux-devtools-extension`包:安装在开发依赖里面。

```
$ sudo cnpm install redux-devtools-extension -D
```

Stack overflow上有解决方案：[redux报错TypeError: undefined is not an object (evaluating 'PropTypes.shape')](https://stackoverflow.com/questions/46781664/react-native-undefined-is-not-an-objectevaluating-react3-default-proptype-shap)

❌解决上述问题之后，npm start运行仍然报错

```
TypeError: Cannot read property 'shape' of undefined：
```

原因：react版本过高，

解决办法：重新安装15.6.2版本的react：

```
$ sudo cnpm install react@15.6.2 -S
```

重新安装低版本的react之后页面不再报错，但会出现一个警告

```
lowPriorityWarning.js:37 Warning: Accessing PropTypes via the main React package is deprecated, and will be removed in  React v16.0. Use the latest available v15.* prop-types package from npm instead. For info on usage, compatibility, migration and more, see https://fb.me/prop-types-docs
```

打开页面之后想要显示redux插件界面，需要在chrome浏览器里先安装Redux-Devtools

```
下载redux-devtools插件
在chrome浏览器里安装此插件
右键可以打开
```

## 开始写文件

- ### 图片logo文件：

创建图片js文件。因为图片无需数据交互，所以可以直接写一个函数组件将图片封装起来。

```javascript
//components-->logo-->logo.jsx

import React from "react";
import logo from "./logo";
import "./logo.less";

export default function Logo(){
  return (<div className="logo-container">
              <img src={logo} alt="logo" className="logo-img"/>
          </div>)
}
```

- ### 注册路由register.jsx页面代码编写

  需要引入一些antd-mobile里的样式组件

```javascript
import React,{ Component } from "react";

import { NavBar, WingBlank, WhiteSpace, List, InputItem, Radio, Button } from "antd-mobile";
import Logo from "../../components/logo/logo";

const ListItem = List.Item;
class Register extends Component{
  render(){
    return (<div>
            <Navbar>导航栏</Navbar>
            <Logo />
            <WingBlank>
            <WhiteSpace />
              <List>
                <InputItem>输入框1</Inputitem>
                <InputItem>输入框2</Inputitem>
                <InputItem>输入框3</Inputitem>
                <ListItem>
                    <span>用户类型</span>
                    <radio>老板</Radio>
                    <Radio>大神</Radio>
                </ListItem>
                <Button>注册</Button>
                <Button>已有账号</Button>
              </List>
            </WingBlank>
            </div>)
  }
}
```

## 注册路由“注册”按钮的交互代码编写

**输入框**里用onChange(this.handler(name,val))函数，当输入框里的内容改变的时候就执行这个函数，而这个onchange()函数会调用里面的handler(name,val)方法，这个方法接收两个参数，一个是模块给出的输入框里的值val，另一个是该输入框里对应的要被改变的值。

```
<InputItem onChange={ val => {this.handlerChange("username",val)} }> 用户名： </InputItem>
<InputItem onChange={ val => {this.handlerChange("password",val)} }> 密  码： </InputItem>

handerChange = (name, val)=> {
  this.setState({
    [name]: val //不加方括号的时候name表示一个字符串；加了方括号以后name表示一个变量。当执行handerChange函数的时候，调用该函数的元素用val的值替换掉name的值。属性名不是name，而是name的值。
  })
}
```

**“用户类型”**选项按钮也可以用onChange事件处理函数，当点击按钮的时候执行某个方法：

```
<Radio checked={type === "dashen"} onChange={this.handerChange("type","dashen")}>大神</Radio>
<Radio checked={type === "laoban"} onChange={this.handerChange("type","laoban")}>老板</Radio>
```

**"注册"和"登陆"**的事件处理函数：

```
<Button onClick={this.register}>注册</Button>
<Button onClick={this.toLogin}>已有账号</Button>

register = ()=>{
  
}

toLogin = ()=>{
  this.props.history.replace("/register");
}
```

## 注册路由代码编写总结：

📒：代码写在登陆界面register.jsx里面，记得首先要引入react、Component

📒：引入antd-mobile里的一些模块可以直接实现界面的布局和样式：

```javascript
import { NavBar, WingBlank, WhiteSpace, Button, List, Radio, InputItem}
```

📒：ListItem需要定义：`const ListItem = List.Item;`

📒：导入的logo模块的地址为"../../components/logo/logo"，js/jsx格式的文件可以不加后缀，react脚手架工具可以自动帮我们解析。但是png、less文件就需要加后缀了。

📒：`<InputItem>`输入框的事件处理函数会自动获得输入框里的值，这个值用“val”进行标记。当输入框里的内容改变时，onChange事件处理函数会调用目标函数，我们可以通过目标函数去设置state的改变或者其他一些操作；onClick函数会在我们点击按钮的时候执行操作，调用一个函数，我们可以通过这个函数设置state的改变，或者其他一些操作。

📒：`<Radio>`单选按钮如何表示“选中”状态？也就是当我们点击单选按钮的时候，系统怎么知道我们选中它了？这里可以用到onClick事件处理函数。当我们点击按钮的时候，事件处理函数设置相应的type值，然后通过在checked属性里判断表达式属性值是否成立，如果成立那么这个按钮就被选中

```
<Radio checked={ type==="dashen" } onClick={this.handerChange("type","dashen")}>大神</Button>
```



## 登陆路由代码编写

登陆路由的页面结构和注册路由的登陆结构基本一致，我们复制一份注册路由的代码，删除“用户类型”组件，将注册、登陆按钮改成“登陆”、“还没有账户”；编写“登陆”和“还没有账户”的指向函数login()和toRegister()

```javascript
import React,{ Component } from "react";
import { Navbar, WingBlank, WhiteSpace, InputItem, List, Button} from "antd-mobile";

export default class Login extends Component{
  state={
    username: "",
    password: "",
    password2: "",
    type: "dashen"
  }
  login = ()=>{
    
  }
  toRegister = ()=>{
    this.props.history.replace("/register")
  }
  
  render(){
    return (<div>
              <WingBlank>
                <WhiteSpace />
                <List>
                  <InputItem onChange={val =>{this.handlerChange("username",val)}}>用户名：</InputItem>
                  <InputItem onChange={val =>{this.handlerChange("password",val)}}>密码：</InputItem>
                <Button onClick={this.login}>登陆</Button>
                <Button onClick={this.toRegister}>注册</Button>
                </List>
              </WingBlank>
            </div>)
  }
}
```

## 前端部分总结：

项目框架搭建顺序：

1. 终端npm install加载依赖
2. 在源代码文件里面import引入包、模块、组件
3. 编写js项目代码。

代码编写顺序：

```
//引入antd-mobile
//引入路由react-router-dom，操作项目文件夹containers
//引入redux，创建redux文件夹下的项目文件
        store.js
        reducers.js
        actions.js
        action-type.js
//编写项目文件：
        图片logo文件【conponents-->logo-->logo.jsx】
        注册界面【containers-->register-->register.jsx】
        登陆界面【containers-->login-->login.jsx】

```

## 搭建后台应用

- #### 创建node+express应用:

1. 全局安装express和express-generator；

2. 创建后端项目根目录，例如命名为app的项目：app；

3. express app；

4. 初始化该app项目：cd app，npm install

5. 启动服务器：npm start。启动之后不会有提示，需要手动在浏览器里输入地址。初始地址为：localhost:3000。

   - 地址端口号在bin-www下面查看：

   `var port = normalizePort(process.env.PORT || '3000');`

   - 页面显示的文件内容实际上是routers-->index渲染出来的
   - 我们需要的后台服务器不需要渲染页面，只需要提供数据
   - 搭建出来的服务器我们需要关注两个文件：bin-www可以查看路径和端口号，routers- ->index.js注册我们自己需要的路由

```
$ sudo cnpm install express express-generator -g
$ mkdir app
$ cd app
$ npm install
$ npm start
```

- #### 后台简单编码及测试【用postman软件来测试接口】

  指定服务器端口号为4000；

  提供用户注册的接口。**在后台项目文件的routes- - >index.js里注册路由**

  - 1）path为/register；
    2）请求方式为POST【复习一下GET/POST的区别】
    3）接收username和password参数
    4）admin是已注册用户
    5）注册成功返回一组数据
    6）注册失败返回一组数据

    ```javascript
    router.post('/register',function(req,res){ //req代表处理请求，res代表返回响应
    		console.log("reagisrer()")
    	//1、获取请求参数
    	const { username,password } = req.body //解构以便快速取出参数，在req.body里取出username和password
    	//2、处理请求
    	if (username === "admin") { //注册失败
    		res.send({code:1, msg:"此用户已存在"})
    	}else{//注册成功
    		res.send({code:0, data: {id: "abc123", username, password}}) //username的数据用data存储。
    	}
    })
    ```

  - 用postman测试接口，查看接口能够正常工作，和文档描述是否一致。选择post方法，x-www-form-urlencoded

❓每次后台项目修改过后需要重新npm start 之后才能重新运行。如何使后台项目能够自动编译打包运行？

- 解决办法：

  - 下载依赖包：nodemon【一个带监视器的node,监视代码的改变】

  ```
  $ sudo cnpm install nodemon -D
  ```

  - 配置package.json文件

  ```
  "start": "nodemon./bin/www"
  ```

## 使用mongoose操作数据库

定义：mongoose是在node.js环境下对mongodb进行便捷操作的对象模型工具。它基于schema结构去定义数据模型

1. 加载依赖mongoose、用于加密的库blueimp-md5，这个库可以将明文的密码转换成密文后保存

```
sudo cnpm install mongoose blueimp-md5 -S
```

2. 编写一个测试文件，来测试如何使用mongoose来操作mangodb数据库【db_test】

3. 要连接mangodb数据库必须要保证服务器是开启状态。

4. 文件db_test.js写好之后，在终端运行node db/db_test.js出错。报错信息如下：

   ```
   (node:58212) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
   (node:58212) UnhandledPromiseRejectionWarning: MongoNetworkError: failed to connect to server [localhost:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
   ···【省略了中间的一些报错信息】
   (node:58212) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
   (node:58212) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
   ```

   url字符串解析的解决办法：mongoose.connect除了url参数之外，还需要增加两个参数

```javascript
mongoose.connect("mongodb://localhost:27017/ggzhaopin_test", { useNewUrlParser: true }, function(err){
  if(err){
    console.log('Connection Error:' + err)
  }else{
    console.log('Connection success!')
  }
}) 
```

**mongodb运行仍然出错，报错信息：猜测是url里的数据库路径不对。**

```
Connection Error:MongoNetworkError: failed to connect to server [localhost:27017] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]
//连接错误，无法连接到[localhost:27017]服务器
```

花了将近四个小时解决这个问题。问题还是没解决。url最后的地址是一个数据库名称，但现在还不知道数据库放在哪里了。视频里也没找到。先进行接下来的学习。【2019-7-31，10:51:00】

解决问题：数据库放在哪里



mongodb有两个概念：文档和集合

文档：对象类型

集合：数组类型

mongoose.Schema方法：定义文档的结构。mongoose是基于schema结构去定义数据模型



**安装和使用mongodb的方法：[https://www.jianshu.com/p/7241f7c83f4a](https://www.jianshu.com/p/7241f7c83f4a)，**

1. 官网下载mongodb for Mac：[MongoDB Download Center | MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)

2. 将解压后的文件放到/usr/local文件夹下。这个文件夹默认是隐藏的，需要我们打开Finder - ->按住shift+command+G，输入/usr/local后回车，就可以看到这个文件夹了。把解压后的mongodb文件夹放到这个目录下。

3. 配置环境变量：打开终端，输入"open -e .bash_profile"，在打开的文件中加入

   ```
   export PATH=${PATH}:/usr/local/MongoDB/bin
   ```

4. command+s保存配置并关闭，再打开一个新的终端窗口，输入“source .bash_profile”使配置生效。输入"mongodb -version"，如果能看到版本号就说明安装成功了。

5. 在根目录下创建一个/data/db文件夹。这个文件夹在安装mongodb时并不会自动生成，我们需要手动创建。

6. 运行：终端输入mongod，如果连接成功的话会显示一个等待客户端连接的界面。打开浏览器输入地址：localhost:27017，会出现下面的界面：

   ![Snip20190731_28](/Users/luofei/Pictures/Snip20190731_28.png)

   如果不成功的话就查看一下data/db是不是正确创建了，如果出现以下报错信息：

   ```
   2019-07-31T12:06:28.891+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
   2019-07-31T12:06:28.947+0800 I CONTROL  [initandlisten] MongoDB starting : pid=60232 port=27017 dbpath=/data/db 64-bit host=luofeideMacBook-Pro.local
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten] db version v4.0.11
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten] git version: 417d1a712e9f040d54beca8e4943edce218e9a8c
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten] allocator: system
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten] modules: none
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten] build environment:
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten]     distarch: x86_64
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten]     target_arch: x86_64
   2019-07-31T12:06:28.948+0800 I CONTROL  [initandlisten] options: {}
   2019-07-31T12:06:28.951+0800 I STORAGE  [initandlisten] exception in initAndListen: IllegalOperation: Attempted to create a lock file on a read-only directory: /data/db, terminating
   2019-07-31T12:06:28.952+0800 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
   2019-07-31T12:06:28.952+0800 I NETWORK  [initandlisten] removing socket file: /tmp/mongodb-27017.sock
   2019-07-31T12:06:28.952+0800 I CONTROL  [initandlisten] now exiting
   2019-07-31T12:06:28.952+0800 I CONTROL  [initandlisten] shutting down with code:100
   ```

   执行

   ```
   sudo chown username(username是你的电脑用户名) /data/db
   ```

   可以解决这个问题。

**按照上述方法安装并配置了mongodb之后，再回到后端代码文件下下打开终端，运行node db/db_test.js，可以成功运行！因此前次失败的原因可能为mongodb没有成功安装配置上。【2019-7-31 12:30】**

2019-7-31

mongodb里的mongoose.connect()方法接收三个参数，url、 { useNewUrlParse: true }、回调函数

其中url的格式是：【mongodb://localhost:27017/数据库库名】



加载插件mongodb plugin ，作用：1⃣️不用离开编辑器就可以查看数据；2⃣️免费插件

连接数据库的步骤：

1. 在后端文件夹下打开终端，运行npm start。此时显示[nodemon] starting `node ./bin/www`，表示打开了后端文件夹下的bin/www里指定的地址；
2. 执行mongod命令，运行成功后会显示正在等待客户端连接；
3. 在后台文件夹下再打开一个终端，运行node db/db_test.js



mongodb的数据操作：

mongoose基于Schema结构定义数据模型；将获取到的数据通过Model的方法进行save()、find()、findOne()、findByIdAndUpdate()、remove()的操作【增删改查CRUD】

```javascript
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true}
}); //基于schema结构定义数据模型

const UserModel = mongoose.model("user",userSchema);  //基于userSchema结构数据模型的文档

//Model的Save()方法存储数据
function testSave(){
  const userModel = new UserModel({username:"Tom",password:md5("123"),type:"dashen"});
  userModel.save(function(error,user){
    console.log("save()",error,user);
  });
}

//Model的find()方法查询多个符合条件的数据；findOne()方法查询单个符合条件的数据。
function testFind(){
  UserModel.find({_id:""},function(error,users){ //传入的是users，一个数据集合【数组格式】
    console.log("find()",error,user)
  })
}
function testFindOne(){
  UserModel.findOne({_id:""},function(error,user){ //传入的是user，一个文档【对象格式】
    console.log("find()",error,user)
  }))
}

//Model的findByIdAndUpdate()方法更新数据
function testUpdate(){
  UserModel.findByIdAndUpdate({id:""},{username:"Jack"},function(error,oldUser){
    console.log("findByIdAndUpdate()",error,oldUser)
  })
}
```

## 注册/登陆后台处理

1. #### 在db下新建一个models文件，此文件包含多个操作数据库集合数据的Model模块

```javascript
// 包含n个操作数据库集合数据的Model模块。

// 1、连接数据库
	// 引入mongoose
	// 连接指定数据库（url只有数据库是变化的）
	// 获取链接对象
	// 绑定完成的监听【用来提示连接成功】
// 2、定义出对应特定集合的Model并向外暴露
	// 字义schema【描述文档结构】
	// 定义Model【与集合对应，可以操作集合】
	// 向外暴露Model。


	// 引入mongoose
	const mongoose = require("mongoose");
	// 连接指定数据库（url只有数据库是变化的）
	mongoose.connect("mongodb://localhost:27017/gzhipin", { useNewUrlParse: true}) 
	// 获取连接对象
	const conn = mongoose.connection;
	// 绑定完成的监听【用来提示连接成功】
	conn.on('connected',()=>{
		console.log("db connect success!")
	});

	// 字义schema【描述文档结构】
	const userSchema = mongoose.Schema({
		username: {type: String, required: true}, //用户名
		password: {type: String, required: true},//密码
		type: {type:String, required: true}, //用户类型
		header: {type: String}, //头像名称
		post: {type: String}, //职位
		info: {type: String}, //个人或职位简介
		company: {type: String}, //公司名称
		salary: {type: String} //工资
	})
	// 定义Model【与集合对应，可以操作集合】
	const UserModel = mongoose.model('user',userSchema);
	// 向外暴露Model。
	//暴露方式：module.exports = xxx : 合并暴露，只暴露一次
			//exports.xxx = value 
			//exports.xxx = value  ：这种形式可以一次次向外暴露。此处用分别暴露

	exports.UserModel = UserModel;
```

2. 路由器模块routers/index.js，注册一个注册路由和一个登陆路由。

   标识登陆有两种方法：cookie和session

### 注册路由

```javascript
var express = require('express');
var router = express.Router();
const { UserModel } = require("../db/models"); //处理数据库集合数据的Model模块
const md5 = require("blueimp-md5");

//注册路由
router.post("/register",function(req,res){
	//获取请求参数数据
	const { username, password, type } = req.body;
	//处理请求
		//判断用户是否已经存在，如果存在，返回错误提示信息；如果不存在，保存信息。
		//通过userModel查询(根据username)
		UserModel.findOne({username}, function(err,user){
			if (user) {
				res.send({code: 1, msg: "此用户已存在！"});//用户存在则通过res返回响应
			}else{
				//password是解构过来的数据，因此需要写成键值对的形式：password:md5(password)
       
        //返回包含user的json格式数据，响应数据中不要携带密码
        new UserModel({username, password:md5(password), type}).save(function(err,user){
					const data = { username, type, id: user._id };
					console.log(username);
					//生成cookie(userid: user._id)来交给浏览器保存
					res.cookie('userid', user._id, {maxAge: 1000*60*60*24});
					res.send({code:0, data });
				}); //如果用户不存在则保存数据
			}
		})
});
```

### 登陆路由

```javascript
router.post("/login",function(req,res){
  const { username, password } = req.body;
  UserModel.findOne({username,password:md5(password)}, filter, function(error,user){
    if(user){
      res.cookie("userid", user._id, {maxAge:1000*60*60*24})//生成cookie交给浏览器保存
      res.send({ code:0, data:user });
    }else{
      res.send({ code:1, msg:"用户名或者密码不正确！"});
    }
  })
})
```

2019-7-31，今天的进度：

✅：找到了mongodb不能正常运行的方法：安装错误，重新安装完之后，按照  `后台文件夹- ->打开终端- - >运行npm start;`  - ->  `终端运行mongod`  - ->  `后台文件夹- ->打开新的一个终端- ->运行node db/models.js`可以正常连接服务器，从服务器获取数据。

✅：后台操作数据库集合数据的Model模块在db/models.js文件里，登陆/注册路由在routers/index.js里。后台的两个主要文件写完了。

✅：了解了mongoose操作mongodb数据库的两大要点：mongoose基于Schema结构定义数据模型；基于Model方法处理数据。mongoose.model()接收两个参数，第一个是数据文档名称，第二个是它所使用的数据模型。也就是由schema定义的数据模型。mongoose.model返回的函数对象包含几个对数据的操作方法：

- save()：假设返回的对象名称为UserModel，那么通过new UserModel({})创建的对象实例userModel存在save()方法，存储实例中列举的数据。可以通过userModel.save(function(error, user){})来处理数据

- find()：UserModel.find()可以查找数据，获得包含所有匹配项的数组。此方法接受三个参数：1⃣️查找条件,封装在一个对象里；2⃣️过滤属性(可省略)；3⃣️对查找结果进行处理的回调函数。

- findOne()：UserModel.findOne()方法可以查找单个数据，包含含有匹配项的对象。此方法接受的参数和find()的一样。

- findByIdAndUpdate()：根据id找到匹配项，然后进行数据更新。此方法可以接收三个参数：1⃣️指定的id值；2⃣️要更改的属性的新值；3⃣️处理函数.处理函数接收两个参数，第一个是错误信息处理，第二个是根据id查到到的旧值。

  ```javascript
  function testSave(){
    const userModel = new UserModel({username:"xiamo", password:"123", type:"laoban"});
    userModel.save(function(error,user){});
  }
  function testFind(){
    UserModel.find({_id:"5d411f5c10303cec184feda8"},function(error, users){});
    UserModel.findOne({_id:"5d411f5c10303cec184feda8"},function(error, users){});
  }
  function testUpdate(){
    UserModel.findByIdAndUpdate({_id:"5d411f5c10303cec184feda8"},{username:"Jack"},function(error,oldUser){});
  }
  function dataDelete(){
    UserModel.remove({_id:"5d411f5c10303cec184feda8"},function(error,doc){});
  }
  ```

  