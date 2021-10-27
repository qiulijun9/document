class MessageQueue {
  constructor(queue = [], options) {
    const {
      cacheUsedQueue = false,
        consumerFun = () => {}
    } = options || {};
    this.queue = queue;
    this.usedQueue = [];
    this.cacheUsedQueue = cacheUsedQueue;
    this.consumerFun = consumerFun;
  }

  push(message) {
    const isEmpty = this.queue.length ? false : true;
    if (Array.isArray(message)) {
      this.queue.push(...message);
    } else {
      this.queue.push(message);
    }
    isEmpty && this.consumerFun();
  }

  shift() {
    if (this.cacheUsedQueue && this.queue.length) {
      this.usedQueue.push(this.queue[0]);
    }
    return this.queue.shift();
  }

  shiftAll() {
    if (this.cacheUsedQueue && this.queue.length) {
      this.usedQueue.push(...this.queue);
    }
    const allQueue = [...this.queue];
    this.queue = [];
    return allQueue;
  }

  clearQueue() {
    this.queue = [];
  }

  clearUsedQueue() {
    this.usedQueue = [];
  }

  clear() {
    this.queue = [];
    this.usedQueue = [];
  }
}


// 使用
const mq = new MessageQueue([1, 2, 3, 4, 5, 6, 7], {
  consumerFun
});

mq.push(10);

// 消费函数
async function consumerFun() {
  if (mq.queue.length) {
    const currentMessage = mq.shift();
    await doSomething(currentMessage);
    consumerFun();
  }
}

function doSomething(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, 1000);
  });
}

setTimeout(() => {
  mq.push([20, 21, 22]);
}, 15000);

consumerFun();

/**
 * 消息队列在前端和后端都有用到
 * 前端主要用来解决同时上传很多图片，发很多请求，页面卡的问题，
 * 在引入消息队列后，用户上传或者拖动很多张图片时 ，都把它放到消息队列中，
 * 然后等上传的时候，开始从消息队列里去取值，这样可以控制同时上传的图片数量，也不会发很多请求，优化了性能
 * 
 * 后端主要解决数据丢失的问题，
 * 那数据是怎么丢失的呢，
 * 上传是异步的，比如已经上传了123，那当4和5 同时来的时候，本来要向数据库插入的1234 就会被同时来的1235 替换掉，这样就丢失了信息
 * 在没有找到数据库的锁，所以引入了消息队列，
 * 我们会把接受到需要上传的图片都放入消息队列，然后从消息队列里拿出现存的全部消息，组合好，然后向数据库插入，如果有队列中没有值，再重新拿新的队列
 
 * 
 */