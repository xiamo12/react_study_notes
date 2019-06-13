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
import mycss from "./mycss.css";

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

- 安装style-loader和css-loader插件的时候，按照先后顺序安装；
- 在配置文件里面写`use: ["style-loader","css-loader"]`的时候，也要按照先后顺序写，且后缀的`-loader`不能省略。省略后缀名的是webpack.1.x的写法，新版本的都不允许省略。
- 如果使用css样式表导入的方法添加jsx标签样式，那么导入的样式用`className = "title"`这种格式，写在标签内。
- 修改配置文件之后需要重启终端才能更新。



