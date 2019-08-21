## 一、安装brew命令

- 在终端加载Homebrew：

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 二、安装nginx：

```
brew install nginx
```

几个nginx常用命令：

- 启动nginx服务器：

```
nginx
```

- 停止nginx服务器

```
sudo nginx -s stop
```

- 查看nginx是否在运行

```
ps -ef | grep ngnix
```

- 查看nginx配置日志，如果nginx不能正常打开，就需要查看是否配置成功

```
nginx -t
```

## 三、修改前端ajax请求路径

1. 打开前端项目代码，找到api接口文件夹下的请求接口相关文件,例如index.js![Snip20190821_5](/Users/luofei/Pictures/Snip20190821_5.png)

2. 把里面的ajax请求地址之前加上/api前缀【也可以是其他名称，但要统一】

![Snip20190821_8](/Users/luofei/Pictures/Snip20190821_8.png)

3. 在整个前端代码项目文件下打开一个新的终端，运行npm run build进行项目打包；得到build文件夹。

## 四、修改后端路由接口接收地址

1. 打开后端项目文件里注册路由的文件

![Snip20190821_9](/Users/luofei/Pictures/Snip20190821_9.png)

2. 修改所有的路由路径，与前端的一一对应

   ![Snip20190821_10](/Users/luofei/Pictures/Snip20190821_10.png)

3. 修改完毕后保存

## 五、将打包好的前端文件build复制到nginx的文件夹下

Mac电脑打开Finder文件夹，按住command+shift+g，输入/usr/local/etc/nginx/找到nginx文件夹

![Snip20190821_11](/Users/luofei/Pictures/Snip20190821_11.png)

## 六、nginx配置

将nginx-->nginx.conf文件拖到sublime里，重点修改http下的server里的内容：

```
server {
        listen       8888;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /usr/local/etc/nginx/build;
            index  index.html index.htm;
            proxy_pass http://localhost:5000;
        }
        location ~ /api/ {
            proxy_pass http://localhost:4000;
        }
```

| conf文件里的#是注释的意思；      |
| :------------------------------- |
| / 表示所有的地址；               |
| ～/api/表示所有以api开头的地址； |
| proxy_pass表示转发到的地址       |

这段配置的意思是：nginx监听8888端口，监听的地址为localhost。

当我们在浏览器里输入localhost:8888时，location / {}表示 nginx会将所有的请求都转发到{}里的http://localhost:5000地址，也就是我们之前build打包文件之后，执行serve build看到的前端代码运行的地址；

但是如果请求的地址是以/api开头的，就会转发到http://localhost:4000这个地址。

所以nginx起到一个代理转发的作用，解决了前端向后端发送请求时产生的跨域问题。【同一个协议、统一域名、同一端口号为同一域名。】

写好配置文件之后，保存配置

## 七、运行

假设此时所有的文件都是关闭状态。

1. mongodb文件夹下，运行：mongod

   ```
   $ mongod
   ```

2. 后端文件夹下，运行npm start

   ```
   $ npm start
   ```

3. nginx文件夹下，打开nginx

   ```
   $ nginx
   ```

4. nginx文件夹下，运行build

   ```
   serve build
   ```

   如果提示serve：command is not found，就全局加载一下serve包：

   ```
   sudo cnpm install serve -g
   ```

   