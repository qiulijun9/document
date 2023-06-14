// 业务背景;
// 在一个页面有 A, B, C 3个功能模块，A, B, C 模块渲染执行顺序不可控
// 每个模块都会调用 getUserInfo 这个方法， 这个方法是可以直接调用 requestUserInfo 获取用户信息
// 调用三次就会发起三次网络请求
// 现在需要优化 getUserInfo 这个方法， 保证 getUserInfo 方法3次调用后， 最终只会发出一次网络请求。

// 核心用户请求
let _requestTime = 0;
const requestUserInfo = () => {
  // 这个方法的实现不能修改
  return Promise.resolve().then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟 ajax 异步，1s 返回
        resolve();
      }, 1000);
    }).then(() => {
      _requestTime++;
      return {
        nick: "nick",
        age: "18",
      };
    });
  });
};
// -------- 在这里完成代码 优化getdata --------

// 调用 requestUserInfo，并优化请求次数
let userInfoPromiseCache = null;
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    if (!userInfoPromiseCache) {
      userInfoPromiseCache = requestUserInfo();
      resolve(userInfoPromiseCache);
    } else {
      userInfoPromiseCache = userInfoPromiseCache.then((res) => {
        console.log(111, res);
        return res;
      });
      resolve(userInfoPromiseCache);
    }
  });
};

function isEqual(array1, array2) {
  // 如果两个数组的长度不同，则它们不相等
  if (array1.length !== array2.length) {
    return false;
  }

  // 比较两个数组中的每个对象是否相等
  for (let i = 0; i < array1.length; i++) {
    const obj1 = array1[i];
    const obj2 = array2[i];

    // 如果两个对象的属性数量不同，则它们不相等
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }

    // 比较两个对象中的每个属性是否相等
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  // 如果两个数组的所有对象都相等，则它们相等
  return true;
}
/**
 * 以下为测试用例，无需修改
 */
const test = async () => {
  try {
    // 模拟请求
    const result = await Promise.all([
      getUserInfo(),
      new Promise((resolve) =>
        setTimeout(async () => {
          resolve(await getUserInfo());
        }, 300)
      ),
      new Promise((resolve) =>
        setTimeout(async () => {
          resolve(await getUserInfo());
        }, 2300)
      ),
    ]);

    if (
      !isEqual(result, [
        {
          nick: "nick",
          age: "18",
        },
        {
          nick: "nick",
          age: "18",
        },
        {
          nick: "nick",
          age: "18",
        },
      ])
    ) {
      throw new Error("Wrong answer");
    }
    return _requestTime === 1;
  } catch (err) {
    console.warn("测试运行失败");
    console.error(err);
    return false;
  }
};
console.log(test());
