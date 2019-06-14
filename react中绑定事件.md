## react的事件绑定机制中，事件名称用驼峰命名法。

`onClick`，`onMouseOver`，`onMouseOut`等.

为事件提供的处理函数，必须是以下格式：

```javascript
<div onClick={function}></div>//调用函数function，而不是函数返回值function()
```

对于两个平级的实例方法，在一个实例方法内部调用另一个方法，需要用this来调用：

```javascript
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      msg:"hello world!",
    }
  },
  render(){
    return <div><button onClick={this.myFunction}></button></div>
  },
  function myFunction(){
    alert('这是一个与render函数平级的函数')；
  }  
}
```

在react里，只要new了一个实例，那么构造函数constructor必然会被首先执行，而render属于一个生命周期函数。

- 事件处理函数里只接收function作为参数`onClick={function}`

- 最常用的事件处理函数绑定格式为：【**<u>在事件上绑定箭头函数；箭头函数内部调用另一个事件处理箭头函数</u>**】

```javascript
<button onClick={()=>{this.show("传参")}}>按钮</button> //点击事件调用了一个箭头函数

show = (arguments1)=>{//令show等于一个箭头函数,使箭头函数具名化，但又保留箭头函数关于this绑定的特性。
  console.log("hello")
}
```

- onclick={}里面只接收function；

- 箭头函数本身就是一个匿名函数。箭头函数在涉及this绑定规则时候的表现与普通函数完全不一致，箭头函数会舍弃所有的this绑定规则，并用当前的词法作用域覆盖掉其本来的this值。箭头函数会继承外层调用的this值

## 在react里，用this.setState({ })修改state上的数据

在react里面，如果要为state里的值重新赋值，推荐使用this.setState({ })方法修改状态值。

```javascript
//以下组件表示点击按钮，调用箭头函数，该箭头函数调用了函数myFunc，这个函数是由另一个箭头函数赋值得来的。
class App extends React.Component{
  constructor(){
    super();
    this.state={
      msg: "嘿嘿嘿"
    }
  }
  myFunc = ()=>{
    this.setState({
      msg:"哈哈哈哈😄",
    });
  }
  render(){
    return <div>
    <button onClick={()=>{this.myFunc}}>点击更改 msg 的值</button>
    {this.state.msg}
    </div>
  } 
}
```

#### 注意：

- 在setState()方法里**面，只会把对应的数据进行更新，而不会覆盖掉没有提及的数据**。也就是说，我们用this.setState({})修改了哪个数据，就只有哪个数据更新，其他数据不变。

- this.setState({})这个方法的执行是**异步的**。所以如果在执行完this.setState({})方法之后，如果想要马上用到最新的state数据，就要使用回调函数。语法`this.setState({},callback)`

- ```javascript
  this.setState({msg:"哈哈哈😄"}, function(){console.log("输出一个数值")})
  ```

  ## react中绑定文本框与state中的值

