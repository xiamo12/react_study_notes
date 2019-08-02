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
//ggzhaopin/db/models.js

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
	// 定义Model【与集合对应，可以操作集合.model基于schema定义的数据模型进行数据操作，返回的函数模型包含对数据的处理方法】
	const UserModel = mongoose.model('user',userSchema);
	// 向外暴露Model。
	//暴露方式：module.exports = xxx : 合并暴露，只暴露一次
			//exports.xxx = value 
			//exports.xxx = value  ：这种形式可以一次次向外暴露。此处用分别暴露

	exports.UserModel = UserModel;
```

2. 路由器模块routers/index.js，注册一个注册路由和一个登陆路由。

   标识登陆有两种方法：cookie和session

## 后台注册路由

```javascript
//ggzhaopin/routers/index.js,包含注册路由registrer和登陆路由login

var express = require('express');
var router = express.Router();
const { UserModel } = require("../db/models"); //处理数据库集合数据的Model模块
const md5 = require("blueimp-md5"); //用于数据加密

//注册路由
router.post("/register",function(req,res){
	const { username, password, type } = req.body; //获取请求参数数据。
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

## 登陆路由

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

- Remove()：根据id找到匹配项，然后删除该匹配项。此方法可以接收的参数包括：1⃣️查找条件；2⃣️回调函数。回调函数接收两个参数，第一个参数error表示执行错误，第二个参数doc表示执行成功之后的信息：是否成功，以及删除了几条数据/文档。

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

## 注册/登陆前台的处理

注册/登陆的前台处理包括三个部分：和后台的数据交互ajax、管理状态redux、组件component使用户能够操作

### 数据请求ajax

- 在前端代码文件夹下下载依赖包axios

  ```
  $ sudo cnpm install axios --save
  ```

- 编写api文件夹下的ajax.js文件和index.js文件。其中ajax.js使用axios封装了一个ajax请求函数，返回一个Promise对象；index.js包含n个接口请求函数的模块，是接口的默认模块。每个函数返回的都是Promise对象【引入ajax函数，每个函数对应一个接口】

- 封装ajax请求，指定默认请求方式为GET。【代码逻辑中规定如果为GET则执行get请求，如果是POST则执行post请求。】

- 发送请求需要知道请求的url，请求方法，请求的参数【url, get/post, data】。

  ```javascript
  import axios from "axios";
  export default function ajax(url,data={},type="GET"){
    if(type === "GET"){
      let paramStr = "";
      Object.keys(data).forEach(key =>{
        paramStr += key + "=" + data[key] + "&";
      });
      if(paramStr){
        paramStr = paramStr.subString(0, paramStr.length-1); //去除最后一个"&"
      }
      return axios.get(url);
    }else{
      return axios.post(url,data);
    }
  }
  ```

  隐藏与提交、修改数据可以用POST请求；查询数据一般用GET请求。

### 管理状态redux

从后台返回的数据都要进行存储，以便进行管理。我们可以用redux来管理数据。

- 编写redux/reducers函数. reducers是根据老的state和action返回新的state

- 用await/async。await表示希望得到异步结果。一旦用await去获取异步结果，await语句所在的函数就必须声明成async：

  ```javascript
  async dispath => {
    const await reqRegister
  }
  ```

- Redux/reducers：

  ```javascript
  // 包含多个reducer函数，根据老的state和指定的action返回新的state
  import { combineReducers } from "redux";
  import { AUTH_SUCCESS, ERROR_MSG } from "./actions.js";
  const initUser = {
  	username: "", //用户名
  	type: "dashen",//用户类型。不需要初始化密码，因为密码不会被后台返回
  	msg: "", //错误提示信息
  }
  //产生user状态的reducer
  function user(state=initUser, action){
  	switch (action.type){
  		case AUTH_SUCCESS: //data是user
  		return {...state, action.data } //解析以前的状态state，然后用action.data将以前的状态覆盖掉
  		case ERROR_MSG:  //data是msg
  		return { ...state, msg:action.data}
  		default:
  		return state
  	}
  }
  export default combineReducers({ user });
  
  //向外暴露的项目结构{ user: {} }
  ```

- Redux/actions.js 

  - action是把数据从应用传递到store的有效载荷，它是store数据的唯一来源。

  - 一般会通过store.dispatch()将数据从action传到store；

  - action里必须要有一个type字段来表示将要执行的动作，这个type字段通常是一个字符串常量。如果要执行的动作多，建议使用单独的action-type模块或者文件来存放action。

  - 应该尽量减少在action中传递的数据。

  - action创建函数就是生成action的方法。不要混淆两者的概念。redux中的action创建函数返回一个action。

  - 在传统的flux实现中，当调用action创建函数时，一般会触发一个dispatch。

    ```javascript
    function addTodoWithDispath(text){
      const action = {
        type: ADD_TODO,
        text
      }
      dispath(action)
    }
    ```

  - 而在Redux当中，只需把action创建函数的结果传给dispatch()方法即可发起一次dispath过程。

    ```javascript
    const AUTH_SUCCESS = "auth_success";
    const authsuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
    
    dispatch(authsuccess(user))
    ```

    

  - 语法：

    ```javascript
    const ADD_TODO = 'ADD_TODO'; //定义在action文件或者单独的action-type文件里。
    {
      type: ADD_TODO,
      text: "hello world!"   
    }
    ```

    

  ```javascript
  // 包含多个action creator：异步action和同步action
  import { AUTH_SUCCESS, ERROR_MSG } from "./action-types";
  import { reqRegister, reqLogin } from "../api/index.js";
  //授权成功的同步action，返回的是一个对象
  const authsuccess = (user) => ({ type: AUTH_SUCCESS, data: user}); //无论注册成功还是登陆成功，要管理的信息都是user。
  //错误提示信息的同步action,返回的是一个对象
  const errormsg = ()=> ({ type: ERROR_MSG, data: msg});
  //注册的异步action.此action返回的是一个函数
  
  export const register = (user)=> {
  	return async dispath => {
  		//发送注册的异步ajax请求
  		const response = await reqRegister(user);
  		const result = response.data;//data数据包括code，data
  		if (result.code === 0) {//注册成功
  			//分发授权成功的同步action
  			dispath(authsuccess(result.data));
  		}else{//注册失败
  			dispath(errormsg(result.msg));
  		}
  	}
  }
  //登陆的异步action.此action返回的是一个函数
  export const login = (user)=> {
  	return async dispath => {
  		//发送注册的异步ajax请求
  		const response = await reqLogin(user);
  		const result = response.data;//data数据包括code，data
  		if (result.code === 0) {//登陆成功
  			//分发授权成功的同步action
  			dispath(authsuccess(result.data));
  		}else{//注册失败
  			dispath(errormsg(result.msg));
  		}
  	}
  }
  ```

- action-types

  ```javascript
  // 包含多个action type名称
  export const AUTH_SUCCESS = "auth_success"; //登陆/注册成功
  export const ERROR_MSG = "error_msg"; //错误提示信息 请求前/请求后都可能产生
  ```

### 前台组件代码components

前台之前写好的组件Register/Login/Main都是UI组件，不能直接跟redux进行交互。需要将当前组件包装生成一个容器组件.用react-redux的connect方法进行包装。传递一个对象，对象包含两个参数：要传的state、登陆操作方法register

❌Register组件的编写当中，最后用react-redux的API- ->connect进行

```
// 注册路由组件

import React,{ Component } from "react";
import Logo from "../../components/logo/logo"
import { 
	NavBar, 
	WingBlank, 
	WhiteSpace,
	List, 
	InputItem,
	Radio,
	Button } from "antd-mobile";

import { connect } from "react-redux";
import { register } from "../../redux/actions";
const ListItem = List.Item;


class Register extends Component{ //Register组件是一个UI组件，不能直接跟redux进行交互
	state = {
		username: "", //用户名
		password: "", //密码
		password2: "", //确认密码
		type: "dashen" //用户类型
	}
	//点击注册调用
	register = ()=>{
		// console.log(this.state)
		this.props.register(this.state); //包含了四个数据。
	}


	//处理输入数据的改变，更新对应的状态
	handleChange = (name,val)=>{
		this.setState({
			[name] : val //属性名不是name，而是name的值。用中括号装起来，它就是一个变量，否则是一个字符串。
		})
	}

	toLogin = ()=>{
		this.props.history.replace('/login');
	}


	render(){
		const { type } = this.state;
		return <div>
			<NavBar>夏&nbsp;末</NavBar>
			<Logo />
			<WingBlank>
			<WhiteSpace/>
				<List>
					<InputItem placeholder="请输入用户名" onChange={ val =>{this.handleChange("username", val)} }>用户名：</InputItem>
					<InputItem placeholder="请输入密码" type="password" onChange={ val =>{this.handleChange("password", val)} }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
					<InputItem placeholder="校验密码" type="password" onChange={ val =>{this.handleChange("password2", val)} }>确认密码：</InputItem>
					<ListItem>
						<span>用户类型：&nbsp;&nbsp;</span>
						<Radio checked={type === "dashen"} onClick={()=>this.handleChange("type","dashen")}>大神
						&nbsp;&nbsp;&nbsp;</Radio>
						<Radio checked={type === "laoban"} onClick={()=>this.handleChange("type","laoban")}>老板</Radio>
					</ListItem>
					<WhiteSpace/>
					<Button type="primary" onClick={this.register}>注册</Button>
					<Button onClick={this.toLogin}>已有账户</Button>
				</List>
			</WingBlank>
		</div>
	}
}

export default connect( //包装容器组件，传入注册函数register
	state => ({}), //{}里指定要传的数据
	{register} //向UI组件Register传递了一个register函数
	)(Register);
```

运行报错：

```
Invariant Violation: Element ref was specified as a string (wrappedInstance) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
```

[react多副本问题的解决办法](https://github.com/reactjs/reactjs.org/blob/master/content/warnings/refs-must-have-owner.md)

这个问题还没解决【2019-8-1  14:00:00】，先看接下来的视频

### 解决跨域问题

客户端的端口号3000，服务器端口号4000，当前后端端口号不同时产生跨域请求，由于浏览器的同源策略【同一协议名、主机名、端口号为同一域名。有一个不同就是不同域名】

解决跨域问题有四种方法：jsop、cors、使用代理服务器、例如nginx反向代理、使用websocket通讯

jsop：只支持GET请求；

cors：要改服务器

代理服务器：拦截并转发浏览器的请求给服务器，再将返回的结果传给浏览器。我们这个例子中使用代理服务器。

配置ajax请求的代理：package.json

```
"poxy": "http://localhost4000";
```

表示将请求转发到这个地址。

❌：register.js中的代码报错：

```javascript
register = ()=>{
  this.props.register(this.state)
}
//控制台报错：
 //this.props.register is not a function at Register.register (register.jsx:29)
```

显示this.props.register不是函数。

❌前端代码npm start运行报错，显示react-app-rewired  is not commond.

📓：解决办法：移除node_modules文件，然后重新npm install加载。

❌npm start运行成功之后页面报错：

```
Uncaught TypeError: Cannot read property 'hasOwnProperty' of undefined
```

![Snip20190801_29](/Users/luofei/Pictures/Snip20190801_29.png)

此问题尚未解决。

问题解决了【2019-8-1  16:03:00】

📓：问题出在react-dom里。这里用的react版本为15.6.2，而react-dom版本为16.8.6。将react版本降低的原因是之前加载rudux时出现错误，为了解决报错问题降低了react版本，使得redux可以正常运行。但没有更改react-dom的版本。

因此将react-dom改成和react版本一致就解决问题了:)

- ❌redux报错：

```
TypeError: Cannot read property 'shape' of undefined：
```

- 📓解决办法：降低react的版本：

```
$ sudo cnpm install react@15.6.2 -S
```

- ❌react-dom报错：

```
Uncaught TypeError: Cannot read property 'hasOwnProperty' of undefined
```

- 📓解决办法：将react-dom和react的版本设为一致

```
sudo cnpm install react-dom@15.6.2 -S
```

 页面发送注册请求，由于浏览器的同源策略，前台端口号为3000，后台为4000，会导致请求404.可以用代理服务器来解决这个问题。

代理服务器可以拦截和转发前台发送的请求给后台，再将后台的响应数据发送给前台。代理服务器设置方法：

```json
//package.json文件里

"proxy": "http://localhost:4000" //告诉代理服务器，去请求端口号为4000的地址
```

❌设置失败,重新npm start显示错误404。

📓：原因：在package.json设置完 "proxy": "http://localhost:4000"之后，需要重新启动服务器才能生效。cd到后台文件夹下，重新npm start启动服务器。

此时如果没有发送注册请求就点击“注册”，页面出示提示信息：用户名需指定；

如果重复注册信息，点击“注册”，页面出现提示信息：此用户已存在；

如果注册时两次密码不一致，那么会出现提示信息：2次密码要一致！

我们需要在点击“注册”成功之后，跳转到主页面。因此还需要做这部分代码的编写：

reducers.js添加代码 【数据处理界面】

```javascript
const initUser = {
  ...
  //添加一条信息
  redirectTo: "" //指定需要自动重定向的路由路径- ->指定页面要跳转到哪里去
}
...
case AUTH_SUCCESS: //data是user
			return { ...action.data, redirectTo: "/"} //添加redirectTo: "/main"
```

register.js添加代码： 【注册路由界面】

```javascript
//containers/register/registers.jsx
import { Redirect } from "react-router-dom";
···
const { msg, redirectTo } = this.props.user;
if(redirectTo){
  return <Redirect to={redirectTo} />
}
  	···
  
export default connect( //包装容器组件，传入注册函数register
state => ({user: state.user}), //{}里指定要传的数据。组件读取状态值，当注册成功时成功跳转；失败时在注册列表上方出现提示信息。
{register} //向UI组件Register传递了一个register函数
)(Register);
```

login.jsx代码添加方式与register.js基本一致：

```javascript
//containers/login/login.jsx
import { login } from "../../redux/actions";
import { Redirect } from "react-router-dom"; //渲染Redirect标签可实现自动重定向
//	
···
render(){
  //
   const { msg, redirectTo } = this.props.user;
     if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>
    }
  //
  return <div>···</div>
}
```

前台组件写好之后，开始写信息页面。创建两个信息容器，一个放置laoban-info，一个放置dashen-info：

1. 编写laoban-info静态页面路由组件laoban-info.jsx

   ```javascript
   //containers/laoban-info/laoban-info.jsx
   import React,{ Component } from "react";
   import { connect } from "react-redux";
   
   class LaobanInfo extends Component{
     render(){
       return (
         <div></div>
       )
     }
   }
   
   export default connect(
     state =>({}),
     {} //放置action
   )(LaobanInfo)
   ```

2. 编写dashen-info静态页面路由组件dashen-info.jsx

   ```javascript
   //containers/dashen-info/dashen-info.jsx
   // 大神信息完善的路由容器组件
   
   import React, { Component } from "react";
   import { connect } from "react-redux";
   class DashenInfo extends Component{
   	render(){
   		return (
   			<div></div>
   		)
   	}
   }
   
   //最后将它包装成容器组件
   export default connect(
   	state =>({}),
   	{} //放置action
   ```

   3. 路由组件需要先注册。laoban-info和dashen-info是一级路由main下面的子路由。因此需要在main组件里面进行处理:

   ```javascript
   //containers/main/main.jsx
   // 主界面路由组件
   
   import React,{ Component } from "react";
   import { Switch, Route } from "react-router-dom"; //Switch用于切换，Route是路由
   import DashenInfo from "../dashen-info/dashen-info.jsx";//导入DashenInfo组件
   import LaobanInfo from "../laoban-info/laoban-info.jsx";//导入LaobanInfo组件
   
   class Main extends Component{
   	render(){
   		return <div>
   			<Switch>
   				<Route path="/dasheninfo" component={ DashenInfo } />
   				<Route path="/laobaninfo" component={ LaobanInfo } />
   			</Switch>
   		</div>
   	}
   }
   
   export default Main;
   ```

3. 观察老板组件和大神组件页面，发现有相同的模块。可以将相同的模块抽象成一个组件，以实现代码的复用。

### 【2019-8-2】今日任务：P33～P43

- components/header-selector/header-selector.jsx代码的编写：

⚠️用插值表达式表示插入的图片地址信息，不能用import，要用require；

⚠️antd-mobile的List组件中renderHeader属性，属性值为一个函数，Grid的data属性，属性值为数组；columnNum属性值为number类型

```javascript
// components/header-selector/header-selector.jsx

//选择用户头像的UI组件
import React,{ Component } from "react";
import { List, Grid } from "antd-mobile";
class HeaderSelector extends Component{
	constructor(props){
		super(props);
		//准备需要显示的头像列表数据
		this.headerList = [];
		for (let i = 0; i < 20; i++) {
			this.headerList.push({
				text: "头像" + (i+1),
				icon: require(`./images/头像${i+1}.png`) //不能使用import；此处地址使用模版字符串，用require动态加载头像对应的地址
			})
		}
	}
	render(){
		const listHeader = "请选择头像";
		return <List renderHeader={ ()=> listHeader }>
			<Grid data={this.headerList}
				  columnNum={5}></Grid> {/*columnNum需要的数值类型是number，所以用插值表达式{}来表达*/}
		</List>
	}
}
export default HeaderSelector;
```

- dashen-info.jsx组件的完善

```javascript
//containers/dashen-info/dashen-info.jsx
// 大神信息完善的路由容器组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { 
	NavBar, 
	InputItem, 
	TextareaItem,
	Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector"

class DashenInfo extends Component{
	render(){
		return (
			<div>
				<NavBar>大神信息完善</NavBar>
				<HeaderSelector />
				<InputItem placeholder="求职岗位：">求职岗位：</InputItem>
				<TextareaItem title="个人介绍：" rows={3} />
				<Button type="primary">保存</Button>
			</div>
		)
	}
}
//最后将它包装成容器组件
export default connect(
	state =>({}),
	{} //放置action
	)(DashenInfo);
```

laoban-info.jsx组件的完善

```javascript
//containers/laoban-info/laoban-info.jsx
// 老板信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
import { 
	NavBar, 
	InputItem, 
	TextareaItem,
	Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector"

class LaobanInfo extends Component{
	render(){
		return (
			<div>
				<NavBar>老板信息完善</NavBar>
				<HeaderSelector />
				<InputItem placeholder="请输入招聘职位：">招聘职位：</InputItem>
				<InputItem placeholder="请输入公司名称：">公司名称：</InputItem>
				<InputItem placeholder="请输入职位薪资：">职位薪资：</InputItem>
				<TextareaItem title="职位要求：" rows={3} />
				<Button type="primary">保存</Button>
			</div>
		)
	}
}

//最后将它包装成容器组件
export default connect(
	state =>({}),
	{} //放置action
	)(LaobanInfo);
```

✅头像容器组件`components/header-selector/header-selector.jsx`、“大神”个人信息界面`containers/dashen-info/dashen-info.jsx`、“老板”个人信息界面`containers/laoban-info/laoban-info.jsx` 的静态页面就此由antd-mobile编写完成。

接下来进行laoban-info和dashen-info的组件功能完善。

laoban-info.jsx:收集数据：

1⃣️ 在组件内部，render函数之前定义一个state，包含laoban-info.jsx组件应该获得的信息。

```
state = {
		header: '',
		post: '',
		info: '',
		company: '',
		salary: ''
	}
```

2⃣️ 增加事件处理函数

```javascript
// 老板信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
import { 
	NavBar, 
	InputItem, 
	TextareaItem,
	Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector"

class LaobanInfo extends Component{
	state = {
		header: '',
		post: '',
		info: '',
		company: '',
		salary: ''
	}
	handleChange = (name, value)=>{
		this.setState({
			[name]: value //注意：要获取的不是name，而是name的值，所以用中括号
		})
	}
	save = ()=>{
		console.log(this.state);
	}

	render(){
		return (
			<div>
				<NavBar>老板信息完善</NavBar>
				<HeaderSelector />
				<InputItem placeholder="请输入招聘职位：" onChange={val => {this.handleChange("post",val)}}>招聘职位：</InputItem>
				<InputItem placeholder="请输入公司名称：" onChange={val => {this.handleChange("company",val)}}>公司名称：</InputItem>
				<InputItem placeholder="请输入职位薪资：" onChange={val => {this.handleChange("salary",val)}}>职位薪资：</InputItem>
				<TextareaItem title="职位要求：" rows={3} onChange={val => {this.handleChange("info",val)}} />
				<Button type="primary" onClick={this.save}>保存</Button>
			</div>
		)
	}
}
//最后将它包装成容器组件
export default connect(
	state =>({}),
	{} //放置action
	)(LaobanInfo);
```

这里的header是在另外一个组件容器里。状态在父组件当中。要想在dashen-info页面改变头像状态，需要设置一个函数，点击头像容器，改变其中的某个图片：

```javascript
setHeader = (header)=>{
  this.setState({
    header
  })
}

render(){
  render(){
		return (
			<div>
				<NavBar>老板信息完善</NavBar>
				<HeaderSelector setHeader={this.setHeader}/>  //增加了这一行的内容
				<InputItem placeholder="请输入招聘职位：" onChange={val => {this.handleChange("post",val)}}>招聘职位：</InputItem>
				<InputItem placeholder="请输入公司名称：" onChange={val => {this.handleChange("company",val)}}>公司名称：</InputItem>
				<InputItem placeholder="请输入职位薪资：" onChange={val => {this.handleChange("salary",val)}}>职位薪资：</InputItem>
				<TextareaItem title="职位要求：" rows={3} onChange={val => {this.handleChange("info",val)}} />
				<Button type="primary" onClick={this.save}>保存</Button>
			</div>
		)
	}
}
```

在父组件laoban-info里设置改变header状态的函数；在子组件header-selector里引入`prop-types`

```javascript
// components/header-selector/header-selector.jsx
//选择用户头像的UI组件
import React,{ Component } from "react";
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types";

class HeaderSelector extends Component{
    ······
	static propTypes = {
		setHeader: PropTypes.func.isRequired
	}

	state = {
		icon: null //放置图片对象，默认没有值
	}

	handleClick = ({text,icon})=>{
		//更新当前组件状态
		//调用函数更新父组件状态
		this.setState({icon});
		this.props.setHeader(text)
	}
	render(){
		//头部界面
		const { icon } = this.state;
		const listHeader = !icon ? "请选择头像" : (<div>已选择头像： <img src={icon} alt="头像"/></div>);
		return <List renderHeader={()=> listHeader}><Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid></List>
	}
}

export default HeaderSelector;
```

当点击网格Grid当中的某张图片时，执行调用函数来指定图像的图片名称。将对应名称的图片放置到指定容器当中。Grid的data属性是一个数组对象，包含icon、text两个值。

- 此时redux/reducers里，需要自动重定向的路由路径不再是“/”。之前指定时“/”是因为所使用的是三个一级路由。而此时main路由下面多出了dashen-info和laoban-info子路由，注册/登陆成功之后可能跳转到“dashen-info”界面，也可能跳转到“laoban-info”界面；可能需要信息完善，也可能不需要。因此此时自动重定向的界面有四种选择
- 在utils下创建一个index.js文件，用来放置含有n个工具函数的模块。然后在其中写入读取分发路径的功能函数getRedirectTo(type, header)。在reducers里面引入这个功能函数，并使redirectTo指向getRedirectTo(type, header)。

```javascript
//utils/index.js

function getRedirectTo(type, header){
  let path = "",
  if(type === "dashen"){ //如果选择"大神"类型，则成功后跳转到"dashen"地址
    path = "/dashen"
  }else{//如果选择"laoban"类型，则成功后跳转到"laoban"地址
    path = "/laoban"
  }
  
  if(!header){ //上面确定完跳转页面之后，如果没有头像，那么跳转到信息完善界面。
    path += "info"
  }
}
```

自动跳转路由路径功能实现之后，接下来需要编写dashen-info和laoban-info前台与后台的交互。

## 后台更新路由代码的编写：routes/index.js

⚠️：清除浏览器的cookie：使用res.clearCookie("userid")。表示清除id为userid的浏览器cookie。

```javascript
//后台/routes/index.js
······
//更新用户信息的路由
//此接口有两种可能。成功：返回user，失败返回msg，并提供登陆界面
router.post('/update',function(req,res){
	//得到提交的用户数据
	//前面我们将user._id以userid的形式存储在浏览器里了。当发送请求的时候。浏览器会自动携带userid
	const userid = req.cookies.userid;
	//如果不存在，直接返回一个提示信息的结果
	if (!userid) {
		return res.send({code:1, msg: "请先登陆"})
	}
	//如果存在，则根据userid更新对应的user文档数据
	const user = req.body; //没有_id
	UserModel.findByIdAndUpdate({_id: userid},user,function(error,oldUser){//user是根据id值找到对应的项以后，要更新的属性
		if(!oldUser){
			//如果不存在user的值，通知浏览器删除userid cookie：
			res.clearCookie("userid");
			//返回一个提示信息
			res.send({code:1, msg: "请先登陆"});
		}else{
			//准备一个返回的user数据对象
			const { _id, username, type } = oldUser;
			// 此时user里没有id\username\type，olduser里有这三个数据
			const data = Object.assign(user, { _id, username, type });//对象拷贝。将后者的属性拷贝到前者中去。如果前后对象有相同的属性，那么后面覆盖前面的；否则两者属性合并成一个对象的属性
			//返回
			res.send({code: 0, data});
		}
	})
})
module.exports = router;
```

- 前台代码数据交互ajax.js，数据状态管理redux，前台组件components的编写

  - ajax.js

    ```javascript
    //前端代码/src/api/index.js
    export const reqUpdateUser = (user) => ajax("/update", user, "POST");
    ```

  - redux

    需要一个异步更新状态的异步action，用于保存操作，在异步action里发送ajax请求接口

    ```javascript
    //redux/actions
    
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from "./action-types";
    import { reqRegister, reqLogin, reqUpdateUser } from "../api/index.js";
    //接收用户的同步action
    const receiveUser = (user)=>({type: RECEIVE_USER, data: user});
    //重置用户的同步action
    const resetUser = (msg)=>({type: RESET_USER, data: msg});
    
    //更新用户状态的异步action。此action返回一个函数
    export const updateUser = (user) =>{
    	return async dispatch =>{
    		const response = await reqUpdateUser(user);
    		const result = response.data;
    		if (result.code === 0) {//更新成功 :data,分发一个同步action
    			dispatch(receiveUser(result.data));
    		}else{//更新失败： msg
    			dispatch(resetUser(result.msg));
    		}
    	}
    }
    ```
    
    

如果登陆之后跳转到信息完善界面，此时清除浏览器Application- ->cookies - ->id,那么信息保存失效，不会跳转到指定界面。

我们需要在id保存失效的时候自动跳转到登陆界面，这个功能由main主界面来完成

```javascript
//containers/main/main.jsx
// 主界面路由组件
import React,{ Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DashenInfo from "../dashen-info/dashen-info.jsx";
import LaobanInfo from "../laoban-info/laoban-info.jsx";
import { connect } from "react-redux";
class Main extends Component{
	render(){
		//检查用户是否登陆，如果没有，自动重定向到登陆界面
		const { user } = this.props;
		if (!user._id) {
			return <Redirect to='/login'/>
		}
		return <div>
			<Switch>
				<Route path="/dasheninfo" component={ DashenInfo } />
				<Route path="/laobaninfo" component={ LaobanInfo } />
			</Switch>
		</div>
	}
}
export default connect(
	state => ({user: state.user})
	)(Main)
```

## 搭建整体界面

用户注册/登陆并完善信息之后，进入的界面。

功能：

- 底部切换按钮，不同的按钮可一切换到不同的路由组件界面。根据不同的类型，呈现相应的组件页面。

- 实现自动登录的功能【通过cookie实现。cookie当中保存有用户id->userid】。userid通过发送请求得到。

  1.实现自动登录。如果cookie中有userid，就自动登录。要实现自动登录，就需要发请求，获取对应的user
  2.如果cookie中没有userid，就进入login界面。
  3.如果已经登陆了，那么是进入完善信息的路由，还是进入主界面路由。
  如果请求根路径，就根据type和header来计算出一个重定向的路径，自动重定向

- 在main组件当中完成大部分功能

  ```javascript
  //containers/main/main.jsx
  
  ```

  晚上回去捋清业务逻辑，

### 今天学习至P40【2019-8-2  18:30:00】