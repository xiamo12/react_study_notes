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

