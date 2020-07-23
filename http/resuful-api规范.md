# http 动词

GET（SELECT）：从服务器取出资源（一项或多项）。通过地址栏访问
POST（CREATE）：在服务器新建一个资源。表单传值访问
PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
DELETE（DELETE）：从服务器删除资源。
HEAD：获取资源的元数据。和 get 方法相似只返回请求头，不返回请求体
OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。 一般用于调试

# api 参数

?limit=10：指定返回记录的数量
?offset=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件
