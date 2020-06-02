# set

接收的是实现 iterable 接口的数据结构

1.类似于数组，但成员都是唯一的，无重复值

2.可以遍历,方法：forEach(),keys(),values(),entries()

3.操作方法：add()has()delete()clear()

数组去重：
function dedepe(array){
return Array.from(new Set(array))
}

# weakSet

1.值不能重复，成员只能是对象，不能是其他类型的值

2.无法遍历

3.操作方法：add() has() delete()

4.成员都是弱引用，可以随时消失，不用就会被垃圾回收，不容易造成内存泄露

# map

1.以键值对的形式存储类似于 Object，可以存储不重复的值

2.操作方法： set(key,value) ,get(key),has(key),delete(key),clear()

3.遍历方法：keys(),values(),entries(),forEach()

# weakMap

1.只接受对象作为键名(null 除外)，不接受其他类型的值作为键名

2.无法遍历

3.操作方法：get(),set(), has() delete()

4.键名可以被垃圾回收

deepclone 时用到了 map

```js
function deepClone(source, map = new Map()) {
	if (map.get(source)) return source;
	if (isObject(source)) {
		map.set(source, true);
		let cloneTarget = Array.isArray(source) ? [] : {};
		for (let i in source) {
			if (source.hasOwnProperty(i)) {
				cloneTarget[i] = deepClone(source[i]);
			}
		}
		return cloneTarget;
	} else {
		return source;
	}
}
```
