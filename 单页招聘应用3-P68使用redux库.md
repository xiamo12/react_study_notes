## P68 使用redux库

课程目标：

- 实现mini版redux
- 实现mini版react-redux

1. 理解redux模块

   1. redux模块整体是一个对象模块

   2. 内部包含几个函数：

      1. createStore(reducers) // reducers:  function(state, action){ return newstate}

      2. combineReducers(reducers) // reducers: { reducers1, reducers2 } ，返回function(state,action){ return newState }

      3. store对象的功能

         getState() //返回当前state

         dispatch(action) //分发action：调用reducers()函数得到新的总state，执行所有已注册的监听函数

         subscibe(listener) //订阅监听：将监听函数保存起来

- connect函数：
  - 输出格式：export default connect( (state)=>{}, {} )(Xxx)
  - mapStateToProps：函数，用来确定一般属性。这里的map是映射的意思，将state映射到props上；
  - mapDispatchToProps：对象，用来确定函数属性【内部会使用dispatch方法】。表示将Dispatch函数映射到props上

- 透传：
  - 将函数接收到的参数，原样传给内部函数调用

### 一些细节bug

❌：在antd-mobile的<ListItem>聊天对话框里输入内容的时候，如果内容很多，发出来有一部分会变成省略号...

📓：解决办法：使用<ListItem>的wrap属性，令wrap={true}



❌：未读消息的显示出现错误，当对方发消息过来时，底部的未读消息进行了累加，不会因为点开未读消息列表而消失

📓：似乎是弄错了用户类型，用laoban与dashen对话就解决了



❌：Grid网格组件做表情网格的时候，可以看到后面list的线。



❌：移动端点击发送，消息无法渲染到消息列表上



## react相关知识整理。

- ref属性:  可以将它绑定到render输出的任何组件上，然后引用render()返回相应的支撑实例。可以确保总是拿到正确的实例：

```javascript
handleSub = （）=>{
  this.refs.myName.innerHTML = "HisName"
}

render(){
  return <div>
    <span ref="myName">MyName</span>
    <span ref="HisName">HisName</span>
    <button onClick={this.handleSub}>提交</button>
    </div>
}
```









































