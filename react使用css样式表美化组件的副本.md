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

# 样式表的模块化

- ## 使用<u>modules</u>启用css样式表的模块化

css文件没有作用域，如果在一个组件里面引入一个css文件，那么默认这个css文件是全局生效的，也就是说其他组件会自动引用这个css样式表。这样会引起样式冲突。**<u>解决样式冲突的方法：在配置文件的css配置里面，css-loader通过？追加参数modules，表示为普通css样式启用模块化：</u>**

```javascript
use:["style-loader","css-loader?modules"]//通过？追加参数modules，启用css样式模块化。
```

- ## 使用<u>localIdentName</u>来自定义模块化的类名

在项目配置文件config.js里面配置：

```javascript
module.exports = {
  mode:"production",
  module:{
    rules:[
      {test:/\.css$/,use:["style-loader","css-loader?modules&[path][name]-[local]-[hash:5]"]}
    ]
  },
};
```

[path]：样式表相对于项目根目录的路径；

[name]：样式表文件名称；

[local]：样式的类定义名称；

[hash:length]：32位的防止类名重复的哈希值。一般取前5、6位就可以区分各个不同的样式了。

自定义生成的类名格式如下：

```
{title:"src-css-itemstyle-title-53923", content:"src-css-itemstyle-content-83738, box:"src-css-itemstyle-box-83827"}
```

- ## 通过local和global来设置类名是否被模块化

被`:global`包裹起来的类名不会被模块化，而是会全局生效；

被`:local`包裹起来的类名将会被模块化，只能通过className={mystyle.title}的格式被调用；如果css文件被模块化了，那默认所有的类名和id都被模块化，这个功能就会很少用到。

`:global(.title)`写在style.css文件里面，设置.title类为全局属性，那么.title就不会被模块化了：

```css
/*style.css文件*/
.title{
  color:red;
  font-size:10px;
}

:global(.test){
  color:yellow;
  font-weight:bold;
}
```

```javascript
//text.js文件

import mystyle from "./src/style.css";
class App extends React.Component{
  render(){
    return <div className={[mystyle.title,"test"].join(" ")}>该行表示此div同时引用title类和test类，其中title为模块化css类，test为全局css类。同时引用多个不同类型的类时，写在数组里，并用数组的join("")方法连接两个类，显示出来的效果是"<div class="title test">...</div>"
</div>
  }
}
```

### 在一个标签里面加类名的两种方法：

**方法一：类名写在数组里，用join(" ")方法拼接；**

```javascript
<div className={[mystyle.title,"test"].join(" ")}></div>
```

**方法二：类名用"+"号拼接，注意每个类名之间用空格隔开；**

```javascript
<div className={mystyle.title + " test"}></div> //注意test前面有一个空格。
```

## 在项目中为scss或者less文件启用模块化

如果模块当中需要用到bootstrap等第三方样式表，就需要安装配置这些第三方文件：

以bootstrap为例：

1. 安装bootstrap文件：

1. ```
   $ sudo cnpm install bootstrap@3.3.7 -S
   ```

2. 在jsx文件里面引入：

   ```javascript
   import bootcss from "bootstrap/dist/css/bootsrap.css";
   
   class App extends React.Component{
     render(){
       return <div><button className="btn-primary">点击提交</button></div>
     }
   };
   ```

3. 如果在引用某个包的时候，这个包被安装在了`node_modules`目录里面，那么引用的时候路径名就可以省略`node_modules`，直接以报名开始引入自己的模块。`bootstrap/dist/css/bootstrap.css`

4. 字体图标文件默认webpack处理不了，需要在终端安装url-loader,

   ```
   $ sudo cnpm install url-loader -D
   $ sudo cnpm install file-loader -D
   ```

5. 再在配置文件里写配置：

6. ```javascript
   {test:/\.ttf|woff|woff2|eot|svg$/,use:"url-loader"}//打包处理字体文件的loader
   ```

   我们自己可以规定，第三方的样式表都以.css后缀结尾，自己写的样式表都以.scss，.less结尾。也就是说只为.scss和.less启用模块化：

   ```
   $ sudo cnpm install sass-loader node-sass -D
   ```

   步骤：

   - 为自己的样式表定位为.scss文件，第三方文件依然是.css文件；

   - 只为自己的.scss文件启用模块化

   - 加载sass-loader和node-loader -D

   - 在config.js文件里编写配置

     ```
  {test: /\.css$/, use:["style-loader", "css-loader"]},
     {test:/\.scss$/, use:["style-loader", "css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]", "sass-loader"]}
  ```
   
     
   
### 总结一下：
   
在项目中启用样式表模块化，并使用第三方css样式表：
   
   - 把自己的样式表定位为`.scss`文件
   
- 第三方的样式表还是以`.css`结尾
   
   - 只需要为自己的`.scss`启用模块化即可：
   
   - 在终端运行`$ sudo cnpm install sass-loader node-sass -D`安装能够解析scss文件的loader
   
   - 在配置文件里配置sass-loader
   
   - ```javascript
     {test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]}//打包处理scss文件的loader
     ```
   
     要使得样式表自定义生成模块化的类名：
   
     ```javascript
     {test:/\.scss$/,use:["style-loader", "css-loader?modules&[path][name]-[local][hash:5]", "sass-loader"]}
     ```
   
     

每次使用&localIdentName=[path][name]-[local]-[hash:5]时，终端会报错







