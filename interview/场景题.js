/**
 * 第一题
使用 React, 参考下述需求优先级和设计稿，实现倒计时抢券组件。

关键需求点
功能1: 按钮自动倒计时(此功能重要占比60%)
进入页面时，卡片中的按钮开始自动 10s 倒计时
倒计时过程中, 按钮显示剩余时间 (文案为: 10s、9s、8s、...、1s)
倒计时结束后，按钮文案变为「抢购」
功能2: 抢购功能模拟(此功能重要占比20%)
点击抢购按钮时，调用异步模拟请求方法，请求完成后按钮文字变为「已抢购」
异步请求模拟方法需自行实现，延迟 1s 后返回成功即可
功能3: 还原券css样式(此功能重要占比20%)
副标题最多支持2行, 多余2行省略号表示
*/
// import React, { FC, useEffect, useState } from "react";
// import "./style.less";

/**
 * 渲染测试数据
 */
// export const cardDataList: IDirectVoucher[] = [
//   {
//     title: "杭州市通用5元券",
//     subTitle:
//       "杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算",
//   },
//   {
//     title: "杭州市10元券",
//     subTitle: "兰州拉面非常好吃",
//   },
// ];

// /**
//  * 券卡片渲染数据类型
//  */
// export interface IDirectVoucher {
//   /** 标题 */
//   title?: string;
//   /** 副标题 */
//   subTitle?: string;
// }

// export interface ICardProps {
//   data: IDirectVoucher;
// }

// /**
//  * 卡片组件
//  */
// const Card: FC<ICardProps> = (props) => {
//   // -------- 在这里完成代码 --------
//   const { data } = props;
//   const [count, setCount] = useState(10);
//   const [isBuying, setIsBuying] = useState(false);
//   let timer = null;

//   useEffect(() => {
//     if (count <= 0) {
//       clearInterval(timer);
//       return;
//     }
//     timer = setInterval(() => {
//       const newCount = count - 1;
//       setCount(newCount);
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, [count]);

//   const fetch = (url) => {
//     return Promise.resolve(url);
//   };
//   const handleClick = () => {
//     setTimeout(() => {
//       fetch("mockRequest")
//         .then((res) => {
//           setIsBuying(true);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }, 1000);
//   };

//   return (
//     <div className="card">
//       <div className="info">
//         <div className="title">{data.title}</div>
//         <div className="subTitle">{data.subTitle}</div>
//       </div>
//       <div onClick={handleClick}>
//         {count ? `${count}s` : isBuying ? "已抢购" : "抢购"}
//       </div>
//     </div>
//   );
// };

// /**
//  * 以下为测试用例，无需修改
//  */
// export default () =>
//   cardDataList.map((data) => <Card key={data.title} data={data} />);

// ```css
//   html {
//     font-size: 60px;
//   }

//   body {
//     font-size: 16px;
//   }

//   .card {
//     background-color: #fff0f1;
//     height: 1.36rem;
//     width: 4.3rem;
//     margin: 0 auto;
//     margin-bottom: 0.1rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     border-radius: 0.12rem;
//     padding-left: 0.3rem;
//     padding-right: 0.24rem;

//     .info {
//       flex: 1;
//       overflow: hidden;

//       .title {
//         font-size: 0.24rem;
//         font-weight: 600;
//       }

//       .subTitle {
//         font-size: 0.12rem;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         padding-right: 0.1rem;
//       }
//     }
//     .btn {
//       font-size: 0.2rem;
//       width: 1.08rem;
//       height: 0.45rem;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: #f00;
//       color: #fff;
//       border-radius: 0.08rem;
//     }
//   }
//   ```;

//   2. 尝试编写一个加密程序，加密方法将明文的字母变成其前的第4个字母，字母表首尾相连。非字母符号 不加密。 例如输入"mali", 输出密文"iwhe", 输入 "ma123", 输出 "iw123"

function encrypt(text) {
  const aCharCode = "a".charCodeAt(0);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);

    if (char.match(/[a-zA-Z]/)) {
      let charCode = char.toLowerCase().charCodeAt(0);
      const shiftCharCode = ((charCode - aCharCode + 22) % 26) + aCharCode;
      result += String.fromCharCode(shiftCharCode);
    } else {
      result += char;
    }
  }
  return result;
}

// 要求
// getUserInfo 是个通用接口，在各个模块里面都有可能使用 requestUserInfo 模拟的是请求服务端真正获取用户信息的方法

// 业务背景

// 在一个页面有 A, B, C 等多个功能模块，A, B, C 模块渲染执行顺序不可控
// 每个模块都会调用 getUserInfo 这个方法， 这个方法是可以直接调用 requestUserInfo 获取用户信息
// 调用三次就会发起三次网络请求
// 现在需要优化 getUserInfo 这个方法， 保证 getUserInfo 方法3次调用后， 最终只会发出一次网络请求

// import { isEqual } from 'lodash-es';

/**
 * 第二题
 */

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

// -------- 在这里完成代码 优化getUserInfo --------
// 调用 requestUserInfo，并优化请求次数
let userInfoPromiseCache = null;
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    if (!userInfoPromiseCache) {
      userInfoPromiseCache = requestUserInfo();
      resolve(userInfoPromiseCache);
    } else {
      userInfoPromiseCache = userInfoPromiseCache.then((res) => {
        return res;
      });
      resolve(userInfoPromiseCache);
    }
  });
};

/**
 * 以下为测试用例，无需修改
 */
async () => {
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

// 实现一个compose 函数，类似koa 的洋葱模型
function compose(middlewares, ctx) {
  let middlewareIndex = 0;

  const dispatch = () => {
    if (middlewareIndex >= middlewares.length) {
      return Promise.resolve(ctx);
    }

    const currentMiddleware = middlewares[middlewareIndex];
    middlewareIndex++;

    return Promise.resolve(currentMiddleware(() => dispatch(), ctx));
  };

  return dispatch();
}

let middleware = [];
middleware.push((next) => {
  console.log(1);
  next();
  console.log(1.1);
});
middleware.push((next) => {
  console.log(2);
  next();
  console.log(2.1);
});
middleware.push((next) => {
  console.log(3);
  next();
  console.log(3.1);
});

let fn = compose(middleware);
fn();
