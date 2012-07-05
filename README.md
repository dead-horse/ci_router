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

详细用法见test.js文件。

