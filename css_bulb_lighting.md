## html文件中

将灯泡分成四个区域。

```html
<div class="bulb-hover">
		<div class="bulb-area1"></div>
		<div class="bulb-area2"></div>
		<div class="bulb-neck1"></div>
		<div class="bulb-neck2"></div>
</div>
```

## css文件

### 第一部分：

#### 灯泡上半部分💡：

```css
.bulb-area1{
	width: 280px;
	height: 280px;
	margin: 0 auto; /*居中显示*/
	background-color: #807d7d;
	border-radius: 50%;/*使其成圆形*/
	transition: 0.6s;
}
```

- transition属性：
  - transition-property：要设置过渡效果的属性名称。
    - transition-property：all【默认】
    - transition-property：none【没有属性获得过渡效果】
    - transition-property：width【width属性获得过渡效果】
  - transition-duration：transition过渡效果需要多少秒或者毫秒才能完成；
  - transition-timing-function：过渡效果曲线
  - transition-delay：过渡效果开始的时间

### 第二部分：

#### 灯泡下半部分💡：【分为上、中、下三小部分】

1. ##### 下--中间部分

```css
.bulb-area2{
	width: 142px;
	height: 0;
	margin: -12px auto 0 auto;
	border-left: 16px solid transparent;
	border-right: 16px solid transparent;
	border-top: 40px solid #807d7d;
	position: relative;
	transition: 0.6s;
}
```

- border-left: 16px solid transparent;里将颜色设置为 transparent的做法经常用来写三角形。
- 这部分是一个梯形，为了使灯泡的形状看起来更真实。

```css
/*上三角形：*/
#id{
  width: 0;
  height: 0;
  border: 16px solid transparent;
  border-bottom: 16px solid red;
}
```

##### 2.  下--上半部分：

```css
.bulb-area2:before{
	content: "";
	margin: -93px auto 0 auto;
	width: 172px;
	height: 0;
	border-left: 32px solid transparent;
	border-right: 32px solid transparent;
	border-top: 54px solid #807d7d;
	position: absolute;
	left: -47px;
	transition: 0.6s;
}
```

- 伪元素`:before`：在被选元素的内容前面插入新内容。用content属性来指定要插入的内容。

- **这部分是一个梯形**，作用是连接灯泡上半部分和下半部分。💡的上半部分是一个圆形，为了使灯泡的形状看起来更真实，设置一个平滑的梯形作为过渡。

##### 3. 下--下部分：

```css
.bulb-area2:after{
	content: "";
	width: 144px;
	height: 55px;
	margin: -4px auto 0 auto;
	padding: 0;
	border-radius: 0 0 200px 200px;
	background: #728b4b; /*灯头浅绿色部分*/
	position: absolute;
	top: 0px;
	left: -1px;
}
```

- 伪元素`:after`：在被选元素内容的后面插入新内容，新内容用content指定。
- 这部分是一个矩形，作为灯泡的灯头连接部分。我们用border-radius属性为这个矩形设置了左下角和右下角的圆角。并用margin、position为它进行定位。

### 第三部分

#### 金属螺纹部分：【before、neck、after三部分】

```css
.bulb-neck1{
	background: #807d7d;
	width: 120px;
	height: 12px;
	margin: 32px auto 0;
	padding: 14px 0;
	position: relative;
}
```

- ⬆️这部分是金属螺纹的中间部分，是一个矩形。用width/height定义宽高，margin/position定义元素位置。

```css
.bulb-neck1:before,.bulb-neck1:after{
	content: "";
	background: #694b8b;
	width: 120px;
	height: 16px;
	/*padding: 0;*/
	position: absolute;
	left: 0;
	top: 0;
}
```

- ⬆️这是金属螺纹的上、下部分。用伪元素`:before/:after`插入到`.bulb-neck1`选择器绑定的元素之前、之后。
- content：""表示在被选元素内容之前/之后插入空内容。并为该插入的内容设置样式。用width/height设置宽高；用position指定位置。

```css
.bulb-neck1:after{
	top: auto;
	bottom: 0px;
}
```

- 为金属螺纹最后的那部分修改位置。

### 第四部分

#### 灯泡连接点

```css
.bulb-neck2{
	margin: -1px auto 0px;
	/*padding: 0;*/
	width: 75px;
	height: 0;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	border-top: 25px solid #728b4b;
	border-radius: 8px;
	position: relative;
}
```

- 要设置一个梯形：width设值；height为0；border用三角形的写法。
- border-radius设置圆角，使连接处更平滑

```css
.bulb-neck2:after{
	content: "";
	margin: 0 auto;
	/*padding: 0;*/
	width: 25px;
	height: 0;
	border-left: 36px solid transparent;
	border-right: 36px solid transparent;
	border-top: 20px solid #222;
	position: relative;
	top: 20px;
	left: 0;
}
```

在灯泡接触点的最后用伪元素`:after`插入一个一个下三角形。

### 整个灯泡

```css
.bulb-hover:hover .bulb-area1{
	background: #eaec68;
	box-shadow: 0 0 55px 25px rgba(255,255,0,0.4);
}
.bulb-hover:hover .bulb-area2,
.bulb-hover:hover .bulb-area2:before{
	border-top-color: #eaec68;
}
```

- .bulb-hover:hover .bulb-area1选择器表示：将鼠标悬停在选定的`.bulb-hover:`元素上时，在` .bulb-area1`选择器指定的元素上执行以下操作：
  - box-shadow：这是一个CSS3的属性，表示向框添加一个或者多个阴影。
  - 语法：box-shadow: h-shadow  v-shadow  blur  spread  color  inset.
    - h-shadow: 阴影的水平位置
    -  v-shadow：阴影的垂直位置
    - blur：阴影的模糊半径
    -  spread：阴影的半径
    - color：阴影的颜色
    - inset：将外部阴影改成内部阴影【outset反过来】