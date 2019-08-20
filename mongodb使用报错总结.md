## mac上安装mongodb没有默认用户名和密码，需要创建用户

参考链接：https://blog.csdn.net/yolohohohoho/article/details/87893753

执行`mongod`时报错

```
luofeideMacBook-Pro:~ luofei$ mongod
2019-08-20T08:59:13.504+0800 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] MongoDB starting : pid=50366 port=27017 dbpath=/data/db 64-bit host=luofeideMacBook-Pro.local
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] db version v4.0.11
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] git version: 417d1a712e9f040d54beca8e4943edce218e9a8c
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] allocator: system
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] modules: none
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] build environment:
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten]     distarch: x86_64
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten]     target_arch: x86_64
2019-08-20T08:59:13.518+0800 I CONTROL  [initandlisten] options: {}
2019-08-20T08:59:13.519+0800 I STORAGE  [initandlisten] Detected data files in /data/db created by the 'wiredTiger' storage engine, so setting the active storage engine to 'wiredTiger'.
2019-08-20T08:59:13.519+0800 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=3584M,session_max=20000,eviction=(threads_min=4,threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),statistics_log=(wait=0),verbose=(recovery_progress),
2019-08-20T08:59:14.050+0800 E STORAGE  [initandlisten] WiredTiger error (13) [1566262754:50908][50366:0x1151435c0], wiredtiger_open: __posix_open_file, 715: /data/db/WiredTiger.turtle: handle-open: open: Permission denied Raw: [1566262754:50908][50366:0x1151435c0], wiredtiger_open: __posix_open_file, 715: /data/db/WiredTiger.turtle: handle-open: open: Permission denied
2019-08-20T08:59:14.051+0800 E STORAGE  [initandlisten] WiredTiger error (13) [1566262754:51202][50366:0x1151435c0], wiredtiger_open: __posix_open_file, 715: /data/db/WiredTiger.turtle: handle-open: open: Permission denied Raw: [1566262754:51202][50366:0x1151435c0], wiredtiger_open: __posix_open_file, 715: /data/db/WiredTiger.turtle: handle-open: open: Permission denied
2019-08-20T08:59:14.051+0800 E STORAGE  [initandlisten] WiredTiger error (13) [1566262754:51429][50366:0x1151435c0], wiredtiger_open: __posix_open_file, 715: /data/db/WiredTiger.turtle: handle-open: open: Permission denied Raw: [1566262754:51429][50366:0x1151435c0], wiredtiger_open: __posix_open_file, 715: /data/db/WiredTiger.turtle: handle-open: open: Permission denied
2019-08-20T08:59:14.051+0800 W STORAGE  [initandlisten] Failed to start up WiredTiger under any compatibility version.
2019-08-20T08:59:14.051+0800 F STORAGE  [initandlisten] Reason: 13: Permission denied
2019-08-20T08:59:14.051+0800 F -        [initandlisten] Fatal Assertion 28595 at src/mongo/db/storage/wiredtiger/wiredtiger_kv_engine.cpp 704
2019-08-20T08:59:14.051+0800 F -        [initandlisten] 

***aborting after fassert() failure
```

解决办法：输入`mongod --repair`，最后出现：

```
2019-08-20T09:01:00.877+0800 I STORAGE  [initandlisten] Shutting down session sweeper thread
2019-08-20T09:01:00.877+0800 I STORAGE  [initandlisten] Finished shutting down session sweeper thread
2019-08-20T09:01:00.959+0800 I STORAGE  [initandlisten] shutdown: removing fs lock...
2019-08-20T09:01:00.962+0800 I CONTROL  [initandlisten] now exiting
2019-08-20T09:01:00.962+0800 I CONTROL  [initandlisten] shutting down with code:0
```

此时输入

```
mongod --port 27017 --dbpath /data/db
```

端口可以正常开启

```
···
2019-08-20T09:01:31.355+0800 I NETWORK  [initandlisten] waiting for connections on port 27017
2019-08-20T09:01:48.515+0800 I NETWORK  [listener] connection accepted from 127.0.0.1:49242 #1 (1 connection now open)
2019-08-20T09:01:48.530+0800 I NETWORK  [conn1] received client metadata from 127.0.0.1:49242 conn1: { application: { name: "MongoDB Shell" }, driver: { name: "MongoDB Internal Client", version: "4.0.11" }, os: { type: "Darwin", name: "Mac OS X", architecture: "x86_64", version: "18.2.0" } }
```

## 创建mongodb用户名和密码：

此时打开一个新的终端，执行

```
mongo --port 27017
```

可以创建mongodb的用户名和密码。

```
> use admin
switched to db admin
db.createUser(
  {
    user: "xiamo",
    pwd: "xiamo121",
    roles: [{role: "userAdminAnyDatabase", db: "admin"},{role: "dbAdminAnyDatabase", db: "admin"},{role:"readWriteAnyDatabase", db: "admin"}]
  }
)
```

创建好用户名和密码之后，输入quit（）退出。

之前的页面输入ctrl+c退出。

这个时候再打开终端，使用auth重新登陆mongod

```
mongod --auth --port 27017 --dbpath /data/db
```

然后就可以用刚才创建的用户名和密码登入mongo shell

```
mongo --port 27017 -u "xiamo" -p "xiamo121" --authenticationDatabase "admin"

use admin
db.createUser(
  {
    user: "xiamo",
    pwd: "xiamo121",
    roles: [{role: "userAdminAnyDatabase", db: "admin"},{role: "dbAdminAnyDatabase", db: "admin"},{role:"readWriteAnyDatabase", db: "admin"}]
  }
)

```

