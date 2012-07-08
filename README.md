ci_router
=========

## 一个PHP CI框架风格的路由    
url字符串有着和它唯一对应的controller，url的各个部分如下：  
```
example.com/controller/function/id/
```
路由path的第一段映射到controller文件，第二段映射到这个controller的方法。第二段之后的所有url段都将会作为参数存放到req.param里。   

有些情况下想采用这种原型：   
```
example.com/product/1/
example.com/product/2/
example.com/product/3/
example.com/product/4/ 
```
这时可以通过url的重写规则来将他映射到对应的url。如上可能可以写成：  
```
rewrite: {
  "/product/[0-9]+":"/catelog/product_lookup"
  }
```
## Usage   

```
//for connect
var connect = require('connect');
var router = require('../');
var app = connect();
app.use(connect.favicon());
app.use(
  router({
    path: __dirname + '/controllers',
    deepth: 3,
    root: '/ctr_1',
    index: 'index',
    rewrite: {
      '/u/[0-9]+': '/folder_1/ctr_1/action_1'
    }
  })
);
app.listen(8081);
```
   
```
//for http
var http = require('http');
var router = require('../');

http.createServer(router({
    path: __dirname + '/controllers',
    deepth: 3,
    root: '/ctr_1',
    index: 'index',
    rewrite: {
      '/u/[0-9]+': '/folder_1/ctr_1/action_1'
    }
  })).listen(8082);
```
   
## Router options       
 * path: controller文件所在目录   
 * deepth: controller文件夹读取的子文件夹深度，默认值1，不读取该文件夹下子文件夹   
 * root: 访问网站主页映射到的url   
 * index: controller文件的默认方法名，默认为'index'。e.x:example.com/test将会指向controller文件夹下的test.js文件的index方法   
 * rewrite: url重写的配置，key支持正则   
 * pageNotFound: 404的处理函数，如果没有则使用默认   

## License   
(The MIT License)   
   
Copyright (c) 2012 dead_horse<heyiyu.deadhorse@gmail.com> 
   
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:   
   
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.   
   
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.   

## Todo   
 * Benchmark && 优化