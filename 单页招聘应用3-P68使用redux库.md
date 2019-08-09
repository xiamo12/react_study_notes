## 。

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
  - 将函数接收到的参数











































