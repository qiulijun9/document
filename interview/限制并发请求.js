// 核心用户请求
let _requestTime = 0;
const requestProfile = (uid) => {
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
        uid,
        nick: `nick-${uid}`,
        age: "18",
      };
    });
  });
};

// 在这里完成代码，进行requestUserProfile优化

// 在这里调用requestProfile
/**
 *
 * @param uid uid
 * @param max 最多并发请求数量
 */

// 加入promise队列
const promiseQueue = [];
// 当前执行的并发数
let activeCount = 0;

function addPromise(fn, uid, max) {
  return new Promise((resolve, reject) => {
    promiseQueue.push({
      fn,
      resolve,
      reject,
      uid,
    });
    handleNextPromise(max);
  });
}

function handleNextPromise(max) {
  if (activeCount < max && promiseQueue.length) {
    activeCount++;
    const task = promiseQueue.shift();
    const { fn, uid, resolve, reject } = task;
    fn(uid).then(
      (res) => {
        resolve(res);
        activeCount--;
        handleNextPromise(max);
      },
      (err) => {
        reject(err);
        activeCount--;
        handleNextPromise(max);
      }
    );
  }
}

const requestUserProfile = (uid = "1", max = 2) => {
  return addPromise(requestProfile, uid, max);
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
    const star = Date.now();
    const result = await Promise.all([
      requestUserProfile("1"),
      requestUserProfile("2"),
      requestUserProfile("3"),
      requestUserProfile("1"),
    ]);
    console.log(result);
    console.log(Date.now() - star);
    if (Date.now() - star < 2000 || Date.now() - star >= 3000) {
      debugger;
      throw new Error("Wrong answer");
    }
    if (
      !isEqual(result, [
        {
          uid: "1",
          nick: "nick-1",
          age: "18",
        },
        {
          uid: "2",
          nick: "nick-2",
          age: "18",
        },
        {
          uid: "3",
          nick: "nick-3",
          age: "18",
        },
        {
          uid: "1",
          nick: "nick-1",
          age: "18",
        },
      ])
    ) {
      throw new Error("Wrong answer");
    }
    console.log(_requestTime);
    return _requestTime === 4;
  } catch (err) {
    console.warn("测试运行失败");
    console.error(err);
    return false;
  }
};

console.log(test());
function promiseLimit(urls, limit) {
  const results = [];
  let currentIndex = 0;
  let activeCount = 0;

  return new Promise((resolve, reject) => {
    const handleNextRequest = () => {
      if (results.length === urls.length) {
        return resolve(results);
      }

      if (activeCount > limit) {
        setTimeout(() => {
          handleNextRequest;
        }, 10000);
        return;
      }

      const currentUrl = urls[currentIndex];
      currentIndex++;
      activeCount++;

      fetch(currentUrl)
        .then((result) => {
          results.push(result);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          activeCount--;
          handleNextRequest();
        });
    };
    handleNextRequest();
  });
}

function fetch(url) {
  return Promise.resolve(url);
}

let urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
promiseLimit(urls, 3).then((resList) => console.log(resList));
