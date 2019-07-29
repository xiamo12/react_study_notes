- fetch是什么？怎么用？

fetch是可以获取异步资源的API，它提供的API返回的是一个promise对象；fetch()方法用于获取资源；

Headers：相当于request/response的头信息

Request：相当于资源请求

Response：相当于请求的响应





- 什么是promise？

fetch获取到的异步资源API返回一个promise对象，这个对象可以提供一个json()方法，该json()方法可以把返回的json字符串反序列化成对象，也被包装成一个promise



- 什么是json()方法？

Json()方法将json字符串反序列化成对象【json字符串—>对象】



- JSON.stringify({})方法作用【对象—>json字符串】

传入一个对象，序列化成一个json字符串；和json()方法作用相反