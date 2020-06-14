js 分为基本类型和引用类型，在使用引用类型改值时，如果修改的是同一对象，对象的指针（地址）没有改变，就不能比较是否修改了

react 中的 state 都是 immutable 类型不可变的,因为在 react 中监听不到数据的改变。
，只能通过重新生成新的值来触发它的改变。
在 class 中是通过判断值(地址的改变)来 render 组件的。
在 hooks 中，是通过值的改变来重新执行方法的。

readux 不能直接修改原来的 state，所以 redux 通过 dispatch 重新生成新的值。我们在处理较复杂的对象，(嵌套层级较多的对象)时可能需要用到解构的方法，或者是深拷贝（loadsh.cloneDeep）.
深拷贝会重新开辟一块新的内存，把对象的每个属性的值都进行遍历赋值，速度会比较慢，而且会占用很大内存。

immer 中使用了 Es6 的 Proxy 对象，当需要改变某个属性值时，会生成一个草案，只需要改变它对应链上的值，其他没有改的属性还会指向原来的值，这样性能得到很大提升，而且不会占用很大内存。

new Proxy 第一个参数是目标对象，第二个参数是一个对象，对象中有 set 和 get 方法，返回一个 Proxy 对象，
因为 Proxy 只会做第一层的代理,在取值和修改值的时候都会调用 set 和 get 方法，在 get 方法中会缓存之前访问过的值。然后返回新的代理。当修改过后，就会返回新值。

```js
import produce from 'immer';

let obj = {
	name: 'xi',
	a: {
		age: 2,
	},
};
let obj2 = produce(obj, draft => {
	draft.a.age = 90;
});

let currentState = {
	a: [],
	p: {
		x: 1,
	},
};
//第二种使用
let producer = produce(draft => {
	draft.p.x = 4;
});

let obj3 = producer(currentState);

//react 中使用
let person = {
	members: [
		{
			name: 'ronffy',
			age: 30,
		},
	],
};
const [personState, setPersonState] = useState(person);
setPersonState(
	produce(person, draft => {
		draft.members[0].age = 50;
	})
);

//reducer
const reducer = (state, action) =>
	produce(state, draft => {
		switch (action.type) {
			case 'ADD_AGE':
				draft.members[0].age++;
		}
	});
```

先生成 state 的代理 draftState，再通过 get,set 方法浅拷贝修改链上的值,作为新的 immutable 对象返回

function bar() {
Promise.resolve().then(bar)
}

function foo() {
setTimeout(foo, 0)
}

哪一个会阻塞 ui 进程
