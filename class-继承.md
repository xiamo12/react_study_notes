在class类中，可以用extends关键字，实现 子类继承父类。

```javascript
//class 子类 extends 父类 {}
class Person{//父类为Person
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
};

class Chinese extends Person{//子类一为Chinese
}
class American extends Person{//子类二为American
  
}
```

目前为止，与class有关的知识总结：

- 所有的class出来的对象，内部都有一个默认的constructor构造器。如果我们没有指定构造器内容，则构造器是隐藏的、不可见的。

- 实例属性/实例方法

  实例属性：指的的挂载到原型对象上，对象实例能够访问到的属性称为实例属性。

- 静态属性/静态方法：指的是挂载到构造函数或者class出来的对象上，用"."来访问，实例对象无法访问到的属性/方法。class关键字修饰出来的对象，里面的静态属性/方法用static关键字来修饰。

- 继承:class出来的对象我们可以通过extends关键字，使子类继承父类。语法为：

  ```javascript
  class Chinese extends Person{
    constructor(){
      super()
    }
  };
  //如果要在该子类里面定义属性，则构造器里面要调用super()函数;
  //如果只调用super()函数而不传入参数，那么子类Chinese原本继承来的属性会变成undefined。
  //因为super()是子类当中对父类constructor构造函数的一个引用，因此如果继承父类属性，就需要向super里面传入参数
  
  ```

  关于super()

  - 如果在子类当中，用extends关键字继承了父类，那么必须在构造函数constructor中优先调用super()函数。也就是说，class关键字修饰的子类对象，通过extends继承父类时，constructor与super()是并行存在的。
  - super()是一个函数，它是父类构造器在子类当中的引用。子类中的super()，实际上就是对父类中，constructor的引用。

  ```javascript
  class App extends React.Component{
    constructor(props){
      super(props);
      this.setState = {
        
      }
    }
  }
  ```

  子类当中，某个子类独有的属性不适合挂载到父类上，应该直接挂载在该子类上。