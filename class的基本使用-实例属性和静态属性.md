#### 2、用class关键字创建组件（class是es6的新特性）

- class是ES6里的关键字

```JavaScript
class Animal {
  constructor(){//每一个class中，都有一个构造器。如果没有手动指定该构造器，那么程序内部被视为是有一个隐形的构造器。
    //构造器的作用是，每当new这个类的时候，就会优先执行构造器中的代码。
    
  }
}//表示创建了一个动物类。
```

- 用class关键字可以构造一个类。这个类内部有一个默认的构造器constructor(){},通过new创建出来的实例会优先访问constructor里的代码。

  ```JavaScript
  class Animal{
    constructor(name,age){//有点像构造函数。
      this.name = name;
      this.age = age;
    }
  }
  ```

  - 通过new关键字创建的对象实例，它的属性成为【实例属性】。通过构造函数，直接访问到的属性，称为【静态属性】：

  ```javascript
  function Person(name,age){
    this.name = name;//name和age是实例属性。
    this.age = age;
  }
  Person.info = 'hello';//info属性直接挂载给了构造函数，所以它是一个静态属性。
  var p1 = new Person();
  console.log(p1.info)//输出undefined。因为info没有通过构造函数里的this挂载到内存中去，所以new出来的person实例访问不到info属性。
  ```

  - 在calss内部，与constructor构造器平级，用static修饰的属性，称为**静态属性：**

  ```javascript
  class Animal{
    constructor(name,age){
      this.name = name;
      this.age = age
    },
     static info = "aaa";
     act(){
       console.log('这是一个挂载到原型对象上的实例方法。');
     }
  }
  //new一个对象实例⬇️
  const cat = new Animal('meiqiu',3);
  console.log(cat.name);//输出meiqiu
  console.log(cat.age);//输出3
  console.log(cat.info);//输出undefined，因为info是一个静态属性。
  console.log(cat.act());//输出act()里的代码实现，因为这是一个实例方法。
  ```

在class内部，与构造器constructor平级的方法，是一个挂载到原型对象上的方法。这个方法对象实例也可以访问。

```javascript
function Person(name,age){
  this.name = name;
  this.age = age;
  this.say = function(){//实例方法
    console.log('this is a say() action');
  }
}//相当于在构造函数的原型对象上挂载了一个say方法：

Person.say = function(){}//静态方法「不是通过this挂载到内存中去的方法，而是直接保存在Person构造函数中。」

Person.prototype.say = function(){
  console.log('this is a say() action');
}
```

实例方法挂载给实例对象；静态方法挂载给构造函数；

实例方法书写方式直接和构造器constructor平级；静态方法平级外需要用static关键字定义：

```javascript
class Animal{
  costructor(){};
  say(){}//<--这里的say()方法是实例方法；
  static say(){}//<--这里的say()方法是静态方法
}
```

静态属性和静态方法（static action()）用得不多。

实例方法：挂载到原型对象上的、对象实例能够访问到的方法叫做实例方法；

静态方法：挂载到构造函数，或者直接挂载到class出来的类上，用"."来访问的方法叫做静态方法。class修饰的类里面，静态属性和静态方法都要用static关键字来修饰



**在class内部，可以写构造器、实例方法、静态方法/属性；不能写别的，不如不能定义变量。**

class内部还是用原来的方法来实现对功能的定义的，所以我们把class称为语法糖；

可以将class出来的对象new成一个对象实例：

```javascript
class Animal{
  constructor(){};
  say(){};
  static name = "eee"
};
const cat = new Animal()

```

