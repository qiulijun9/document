webWorker 不会影响主线程的执行，允许运行在另一个线程。所以会把一些复杂的运算，或者长时间的请求放到 webwork 中，来提升页面性能。

引入 webwork

// 主线程
let worker = new Worker('myworks.js')
//主线程收到子线程的消息
worker.onMessage=(event)=>{}

//主线程像子线程发送消息
worker.postMessage({})

//终止线程
worker.terminate();

//web worker.js
onmessage = function(event){
// 收到
};
postMessage({
type: "debug",
message: "Starting processing..."
});
// 中止
self.close()
