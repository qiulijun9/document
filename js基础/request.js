class RequestQueue {
	constructor() {
		this.limit = 4; //最大并发数量
		this.queue = [];
		this.count = 0; //当前并发数量
	}
	async run(request) {
		if (this.count >= this.limit) {
			//超出并发限制的放入请求队列,直到某个任务shift
			await this.push();
		}
		this.count++;
		try {
			//run 方法传入的是一个Promise 对象
			let resolve = await request();
			console.log('---');
			return Promise.resolve(resolve);
		} catch (err) {
			return Promise.reject(err);
		} finally {
			console.log('当前并发数:', this.count);
			this.count--; //当请求成功或失败后,count-1
			this.shift();
		}
	}
	//创建新的Promise,返回一个resolve,放入queue 队列
	push() {
		let _resolve;
		let promise = new Promise(resolve => {
			_resolve = resolve;
		});
		this.queue.push(_resolve);
		return promise;
	}
	//从队列中取出一个resolve 执行
	shift() {
		if (this.queue.length <= 0) return;
		let resolve = this.queue.shift();
		resolve();
	}
}

const request = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 1000);
	});
};
const instance = new RequestQueue();
const promises = [];
for (let i = 0; i < 10; i++) {
	promises.push(
		instance.run(request).catch(err => {
			console.log(err);
		})
	);
}

// Promise.all(promises).catch(err => console.log(err));
