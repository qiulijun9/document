//引入模块
const http = require('http')

http.createServer((req, res) => {

  //设置响应头，响应类型
  res.writeHead(200, {
    "Content-type": "text/html;charset=:'utf-8'"
  })
  res.write()

  //结束响应
  res.end()
})