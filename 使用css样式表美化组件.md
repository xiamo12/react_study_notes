# 使用css样式表美化组件

- 写好css文件,保存在`src/components/mycss.css`

```css
.title{
  color:red;
  font-size: 32px;
}
```

- 在jsx当中需要import引入css样式表。而使用webpack的时候，默认不能识别JavaScript以外的文件。因此需要安装style-loader和css-loader插件：【建议先安装style-loader再安装css-loader】

```
$ sudo cnpm install style-loader css-loader -D
```

- 配置文件里配置一下：

```javascript
module.exports = {
  mode: "development",
  module:{
    rules:[{text: /\.(sa|sc|c)ss$/,use: ["style-loader","css-loader"]//程序按照从右往左的顺序解析。顺序不要写反了！
    }],
  },
};
```

- jsx组件文件里面导入css文件：假设该jsx组件路径为`src/components/Hello.jsx`

```javascript
import mycss from "./mycss.css";//import给一个对象mycss来接收，接收之后再给mycss一个路径

//...
//⬆️组件代码
```

- 在组件标签里面引入该css样式：

- ```javascript
  import mycss from "./mycss.css";
  
  class Hello extends React.Component{
    constructor(){
      super();
      this.state = {
        msg: "hello world!",
      }
    }
    render(){
      return <div className="title">{this.stata.msg}</div>
    }
  }
  ```

## 注意事项：

安装style-loader和css-loader插件的时候，按照先后顺序安装；

在配置文件里面写`use: ["style-loader","css-loader"]`的时候，也要按照先后顺序写，且后缀的`-loader`不能省略。省略后缀名的是webpack.1.x的写法，新版本的都不允许省略。

如果使用css样式表导入的方法添加jsx标签样式，那么导入的样式用`className = "title"`这种格式，写在标签内。

修改配置文件之后需要重启终端才能更新。

css文件没有作用域，如果在一个组件里面引入一个css文件，那么默认这个css文件是全局生效的，也就是说其他组件会自动引用这个css样式表。这样会引起样式冲突。**<u>解决样式冲突的方法：在配置文件的css配置里面，css-loader通过？追加参数modules，表示为普通css样式启用模块化：</u>**

```javascript
use:["style-loader","css-loader?modules"]//通过？追加参数modules，启用css样式模块化。
```

**<u>使css样式表模块化的重点：</u>**安装style-loader,css-loader并配置；在use里为css-loader通过？追加参数modules；

将css模块化处理之后，在目标组件里引入css文件的时候，用`className={mystyle.title}`的格式引入css样式。

`mystyle`表示在jxs里import进入的文件`import mystyle from "./style.css"`，`title`表示css样式里面的类名。

css模块化只对类选择器和ID选择器有效，对标签选择器无效。

```javascript
<div className={mystyle.title}>Hello world!</div>
<div id={mystyle.myid}>Hello world!</div>
```





步骤：打开配置文件，为css-loader后面用？追加modules启用模块化。这样每个模块在使用的时候只需在头部导入该css文件，在标签上写上className={模块名称.类名/id名}；