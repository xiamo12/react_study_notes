在这个项目中，我们使用mongodb数据库来存储数据，用mongoose来操作数据库当中的数据。

其中存在一些字段，我在这里作一个记录声明。

### mongodb自动生成的文档索引：_id

- _id：这是mongodb集合中，每一个文档的主键，由mongodb自动生成，用于文档的索引；

  - ```
    _id
    ```

### 服务器文件/db/models.js

- 以下8个数据是`mongoose`基于`Schema`结构定义的数据模型`userSchema`，并调用`mongoose`的`model`方法，定义`user`文档的数据结构符合该模型。换句话说，`mongoose.model("user", Schame)`的意思是，我们现在定义一个文档名叫`user`，这个文档里面的数据都符合`userSchema`模型。

- ```javascript
  username: {type: String, required: true}, //用户名
  password: {type: String, required: true},//密码
  type: {type:String, required: true}, //用户类型
  header: {type: String}, //头像名称
  post: {type: String}, //职位
  info: {type: String}, //个人或职位简介
  company: {type: String}, //公司名称
  salary: {type: String} //工资
  ```

- 以下6个数据是mongoose基于Schema结构定义的数据模型chatSchema，并调用mongoose的model方法，定义chat文档的数据结构符合该模型

  - ```javascript
    from: {type: String, required: true}, //发送用户的id
    to: {type: String, required:true}, //接收用户的id
    chat_id: {type: String, required:true}, //from和to组成的字符串
    content: {type:String, required: true}, //内容
    read: {type: Boolean, default: false}, //标识是否已读
    create_time: {type: Number} //创建时间
    ```

### 服务器路由文件/routes/index.js

- 注册路由route.post("/register",function(req,res){})

  - ```javascript
    {code:0, msg:"用户已存在"}  //注册时由服务器通过res.send()发送回来的数据
    {code:1, data}//注册成功
    id: user._id //用UserModel.findOne()通过条件查找成功时，找到的user文档的索引值，作为id值
    userid:  //声明了一个userid为user._id，保存在浏览器的cookies里面
    ```

### 前端文件/src/containers/chat/chat.jsx聊天界面

- 消息来源的索引值：from

  在chat.jsx路由组件的componentWillMount(){}生命周期函数里面打印console.log(this.props)，将会得到一个对象。这个对象包含了chat、history、location、match等等对象属性。其中的url信息都包含在params字段里面。所以当我们要获取用户id 的时候，可以用this.props.match.params.userid来获取。

  ![image-20190816183104948](/Users/luofei/Library/Application Support/typora-user-images/image-20190816183104948.png)

  - ```javascript
    const from = this.props.match.params.userid; //from指的是对方，to指的是“我”
    const to = this.props.user._id //这里的to指的是“我”
    ```

    