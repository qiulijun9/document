# 记录用户操作轨迹的意义

1. 对开发者来说更能追溯线上出现的问题 bug
2. 对于 pm,能够收集用户的偏好，获取多数用户的需求取向
3. 测试也能更好的去复现 bug,解决了因浏览器版本，系统版本，网络环境等不同引发的难以复现的问题

# 简介

rrweb 是 'record and replay the web' 的简写，旨在利用现代浏览器所提供的强大 API 录制并回放任意 web 界面中的用户操作。

# 组成

rrweb-snapshot: dom 序列化的操作
rrweb: 录屏和回放
rrweb-player：ui 播放器

# 运行流程

录屏：dom 快照 ----》 监听 Dom 变化，增量操作 ----》 JSON

回放：JSON---》 重建全屏快照 ---》重建增量数据

### dom 快照

document.documentElement.cloneNode() 作为基础的 dom 结构

### 增量更新

rrweb 并不是每几秒就生成一次 dom 快照，那对一直交互的页面频繁的生成 dom 快照开销太大了，如总体积也会⾮常⼤，同样时⻓的视频⽂件,那增量更新是只对如下事件做了记录：

1. dom 变化

- dom 的创建和销毁
- 属性变化
- 文本变化

主要是通过 mutationObserver 来监听 dom 的变化

2. 全局事件

- 鼠标事件 （mouse up、mouse down、click、double click、context menu、focus、blur 、touch start、touch move、touch end）
- 元素的滚动
- 页面的大小改变

主要通过全局的监听来实现,如 document.addEventListener('mousemove', e => {})

3. input 输入 input change ,劫持 setter
4. canvas 劫持 setter
5. css 代理 cssStylesheet

增量更新时是在以上发生变更时才去更新 dom 快照，但是在由于操作频繁在生成的结够上会有大量的数据重复，他们采用的 diff 的对比，将每一个快照与前一个快照对比后再去更改，来做优化。

### 唯一 ID

在序列化之前要为每个 dom 添加一个唯一的 id.
如果点击了某个按钮,我们记录的格式应该为如下,通过 clickOp.node.onClick 来触发点击事件

```js
type clickOp = {
  source: 'MouseInteraction',
  type: 'Click',
  node: HTMLButtonElement,
}
```

但是远程的 dom 快照在初始化的时候已经生成好了，没有办法将被交互的 DOM 节点和已存在的 DOM 关联在⼀起。所以利用 id 将他们联系在一起

```js
type clickSnapshot = {
  source: 'MouseInteraction',
  type: 'Click',
  id: Number,
}
```

### 序列化 json

以下 dom 树：

```html
<html>
  <body>
    <header></header>
  </body>
</html>
```

被序列化成的结构

```json
{
  "type": "Document",
  "childNodes": [
    {
      "type": "Element",
      "tagName": "html",
      "attributes": {},
      "childNodes": [
        {
          "type": "Element",
          "tagName": "head",
          "attributes": {},
          "childNodes": [],
          "id": 3
        },
        {
          "type": "Element",
          "tagName": "body",
          "attributes": {},
          "childNodes": [
            {
              "type": "Text",
              "textContent": "\n    ",
              "id": 5
            },
            {
              "type": "Element",
              "tagName": "header",
              "attributes": {},
              "childNodes": [
                {
                  "type": "Text",
                  "textContent": "\n    ",
                  "id": 7
                }
              ],
              "id": 6
            }
          ],
          "id": 4
        }
      ],
      "id": 2
    }
  ],
  "id": 1
}
```

## rrweb 源码

```js
// dom 加载完
if (
  document.readyState === 'interactive' ||
  document.readyState === 'complete'
) {
  init()
} else {
  // ...
  on(
    'load',
    () => {
      init()
    },
    window,
  )
}

const init = () => {
  takeFullSnapshot() // 生成dom 快照
  handlers.push(observe(document)) //增量更新，添加监听器
}

const takeFullSnapshot  = (isCheckout = false) => {
// 调用 rrweb-snapshot 中 snapshot方法来生成快照 ，接收一些参数
  const [node, idNodeMap] = snapshot(document, {
    // ... 配置项
  })
}

function snapshot( n, options ) {
 // .. 进行一些初始赋值
  return [
    serializeNodeWithId(n, {
     // .. options
    }),
    idNodeMap,
  ]
}

// 序列化一个带有ID的DOM
function serializeNodeWithId(){
  const _serializedNode = serializeNode(n, {
    doc,
    blockClass,
    blockSelector,
    maskTextClass,
    maskTextSelector,
    inlineStylesheet,
    maskInputOptions,
    maskTextFn,
    maskInputFn,
    recordCanvas,
    keepIframeSrcFn,
  });

  // 获取序列化的id
  let id = genId();
  // 绑定ID
  const serializedNode = Object.assign(_serializedNode, { id });

  if (
    (serializedNode.type === NodeType.Document ||
      serializedNode.type === NodeType.Element) &&
    recordChild
  ) {

    // 递归childNode 绑定id
    for (const childN of Array.from(n.childNodes)) {
      const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
      if (serializedChildNode) {
        serializedNode.childNodes.push(serializedChildNode);
      }
    }

 // 对iframe 的一些处理 等其他的处理

  return serializedNode;
}

// 序列化dom
function serializeNode(
  n: Node,
  options
) {
// 对不同的节点做的处理
  switch (n.nodeType) {
    case n.DOCUMENT_NODE:
      return {
        type: NodeType.Document,
        childNodes: [],
        rootId,
      };
    case n.DOCUMENT_TYPE_NODE:
      return {
        type: NodeType.DocumentType,
        name: (n as DocumentType).name,
        publicId: (n as DocumentType).publicId,
        systemId: (n as DocumentType).systemId,
        rootId,
      };
    case n.ELEMENT_NODE:
      const needBlock = _isBlockedElement(
        n as HTMLElement,
        blockClass,
        blockSelector,
      );
      // 给 node 添加属性
      const tagName = getValidTagName(n as HTMLElement);
      let attributes: attributes = {};
      for (const { name, value } of Array.from((n as HTMLElement).attributes)) {
        attributes[name] = transformAttribute(doc, tagName, name, value);
      }

      // 处理css，给attributes 添加css
      if (
        tagName === 'style' &&
        (n as HTMLStyleElement).sheet
      ) {
        const cssText = getCssRulesString(
          (n as HTMLStyleElement).sheet as CSSStyleSheet,
        );
        if (cssText) {
          attributes._cssText = absoluteToStylesheet(cssText, getHref());
        }
      }

      // ... 对form 的处理,隐藏密码框等输入信息
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select'
      ) {
        const value = (n as HTMLInputElement | HTMLTextAreaElement).value;
        if (
          attributes.type !== 'radio' &&
          attributes.type !== 'checkbox' &&
          attributes.type !== 'submit' &&
          attributes.type !== 'button' &&
          value
        ) {
          attributes.value = maskInputValue({
            type: attributes.type,
            tagName,
            value,
            maskInputOptions,
            maskInputFn,
          });
        }
      }

      // iframe 的处理
      if (tagName === 'iframe' && !keepIframeSrcFn(attributes.src as string)) {
        delete attributes.src;
      }
      return {
        type: NodeType.Element,
        tagName,
        attributes,
        childNodes: [],
        isSVG: isSVGElement(n as Element) || undefined,
        needBlock,
        rootId,
      };
    // .. 对其他节点的处理
    case n.TEXT_NODE:
   // ...
    case n.CDATA_SECTION_NODE:
   // ...
    case n.COMMENT_NODE:
   // ...

    default:
      return false;
  }
}

// 监听器
const observe = (doc: Document) => {
      return initObservers( // ..  一些参数
      );
 };


// 初始化监听器 记录操作的变化进行增量更新
function  initObservers(){
  const mutationObserver = initMutationObserver(); // 监听dom 的变化
  const mousemoveHandler = initMoveObserver( );
  const mouseInteractionHandler = initMouseInteractionObserver();
  const scrollHandler = initScrollObserver();
  const viewportResizeHandler = initViewportResizeObserver(o.viewportResizeCb);
  const inputHandler = initInputObserver();
  const mediaInteractionHandler = initMediaInteractionObserver( );
  const styleSheetObserver = initStyleSheetObserver();
  const canvasMutationObserver = o.recordCanvas
    ? initCanvasMutationObserver(o.canvasMutationCb, o.blockClass, o.mirror)
    : () => {};
  const fontObserver = o.collectFonts ? initFontObserver(o.fontCb) : () => {};

}

//MutationObserver 来监听dom的变化
function initMutationObserver(){
    let mutationObserverCtor = window.MutationObserver
    const observer = new mutationObserverCtor(mutationBuffer.processMutations.bind(mutationBuffer));

    observer.observe(rootEl, {
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true,
      });
      return observer;
    }
}

// 鼠标事件通过监听mousemove,touchmove,drag 等事件来处理
function initMoveObserver() {
  //...
  const handlers = [
    on('mousemove', updatePosition, doc),
    on('touchmove', updatePosition, doc),
    on('drag', updatePosition, doc),
  ]
  return () => {
    handlers.forEach(h => h())
  }
}

// 监听 scroll 事件
function initScrollObserver(){
  //...  定义 updatePosition
   return on('scroll', updatePosition, doc);
}

//监听 resize 事件
function initViewportResizeObserver() {
  // .. updateDimension
  return on('resize', updateDimension, window);
}

// 处理video audio 的监听
function initMediaInteractionObserver() {
  //.. add handler
  const handlers = [
    on('play', handler(MediaInteractions.Play)),
    on('pause', handler(MediaInteractions.Pause)),
    on('seeked', handler(MediaInteractions.Seeked)),
  ];
  return () => {
    handlers.forEach((h) => h());
  };
}

// 函数回调  insertRule， deleteRule
function initStyleSheetObserver(
  cb: styleSheetRuleCallback,
  mirror: Mirror,
): listenerHandler {
  // 定义insertRule，deleteRule
  const insertRule = CSSStyleSheet.prototype.insertRule;
  CSSStyleSheet.prototype.insertRule = function (rule: string, index?: number) {
   //..  处理一些 cb()
  };

  const deleteRule = CSSStyleSheet.prototype.deleteRule;
  CSSStyleSheet.prototype.deleteRule = function (index: number) {
    //..  处理一些 cb()
  };

  return () => {
    CSSStyleSheet.prototype.insertRule = insertRule;
    CSSStyleSheet.prototype.deleteRule = deleteRule;
  };
}

 // window.FontFace + document.fonts.add
function initFontObserver(cb: fontCallback): listenerHandler {
  (window as any).FontFace = function FontFace( ) {
    //...
    return fontFace;
  };

  const restoreHandler = patch(document.fonts, 'add', function (original) {
    return function (this: FontFaceSet, fontFace: FontFace) {
       // ...
    };
  });
  handlers.push(restoreHandler);

  return () => {
    handlers.forEach((h) => h());
  };
}
...
```

### 回放

步骤：

1. 创建沙箱环境

   - 如何创建沙箱环境？
     在回放的过程中需要去脚本化处理，不能执行页面中的 javascript ,他们将 script 都改为 noscript 标签，但是还是有一些 script 是在 form 表单提交中，无法被处理掉。所以采用了 iframe 的沙盒功能来进行浏览层面的限制。
     将被录制的 dom 重建在一个 iframe 元素中，通过设置 sandbox 属性，可禁止以下行为
     - 表单提交
     - window.open 的弹出
     - js 脚本的执行

2. 将操作按照时间戳排列，放⼊⼀个操作队列中,重建 document 全量快照
   - 重建首屏 dom 结构
   - 处理录制的增量数据 通过 id,把 json 数据反序列化成 node 节点
   - 对不同的增量快照做处理
     mutation : buildNodeWithSN 重建 dom ,通过 ID 将 node append 对应的位置
     mouseMove: 模拟 鼠标的点击/hover 等操作
     Scroll: window.scrollTo
     Input: value/ checked 赋值
     Media:pause/play 操作
     style: insertRule
     canvas:canvasRenderingContent2d
     font:document.fonts.add()
3. 启动⼀个计时器，不断检查操作队列，将到时间的操作取出重现。
   通过 requestAnimationFrame 来实现不断校验的定时器

## 回放源码

```js
export class Replayer {
  constructor(events, config) {
    this.setupDom()
    const timer = new Timer([], config?.speed || defaultConfig.speed)
    this.service = createPlayerService(
      {
        events,
        timer,
        timeOffset: 0,
        baselineTime: 0,
        lastPlayedEvent: null,
      },
      {
        getCastFn: this.getCastFn,
        emitter: this.emitter,
      },
    )
    this.service.start()
    this.service.subscribe(state => {
      this.emitter.emit(ReplayerEvents.StateChange, {
        player: state,
      })
    })
  }
// 创建沙箱环境
  private setupDom() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('replayer-wrapper');
    this.config.root!.appendChild(this.wrapper);

    this.mouse = document.createElement('div');
    this.mouse.classList.add('replayer-mouse');
    this.wrapper.appendChild(this.mouse);

    this.iframe.style.display = 'none';
    this.iframe.setAttribute('sandbox', attributes.join(' '));
    this.disableInteract();
    this.wrapper.appendChild(this.iframe);
  }
  // 根据dom 类型处理不同的事件
  private getCastFn(event: eventWithTime, isSync = false) {
      switch (event.type) {
      // dom 加载完成
      case EventType.DomContentLoaded:
      case EventType.Load:
        break;
      case EventType.Meta:
        castFn = () =>
          this.emitter.emit(ReplayerEvents.Resize, {
            width: event.data.width,
            height: event.data.height,
          });
        break;
        // 全量快照
      case EventType.FullSnapshot:
        castFn = () => {
          this.rebuildFullSnapshot(event, isSync);
          this.iframe.contentWindow!.scrollTo(event.data.initialOffset);
        };
        break;
        //增量快照
      case EventType.IncrementalSnapshot:
        castFn = () => {
          // 对不同的增量快照做处理
          this.applyIncremental(event, isSync);
        };
        break;
      default:
    }
  }

   private applyIncremental(e,isSync){
       const { data: d } = e;
       switch (d.source) {
       //dom 操作
        case IncrementalSource.Mutation: {
                if (isSync) {
                  d.adds.forEach((m) => this.treeIndex.add(m));
                  d.texts.forEach((m) => this.treeIndex.text(m));
                  d.attributes.forEach((m) => this.treeIndex.attribute(m));
                  d.removes.forEach((m) => this.treeIndex.remove(m, this.mirror));
                }
                this.applyMutation(d, isSync);
                break;
        }
        case IncrementalSource.Drag:
        case IncrementalSource.TouchMove:
        case IncrementalSource.MouseMove:
            // ...
            this.moveAndHover(d, lastPosition.x, lastPosition.y, lastPosition.id);
            break;
        case IncrementalSource.Scroll: {
            if (isSync) {
              this.treeIndex.scroll(d);
              break;
            }
            this.applyScroll(d);
            break;
          }
       }
       // ... 其他的处理事件

}

// Timer
export class Timer {
    public start() {
    // ...
    // 检查播放队列
    function check() {
      const time = performance.now();
      self.timeOffset += (time - lastTimestamp) * self.speed;
      lastTimestamp = time;
      while (actions.length) {
        const action = actions[0];
        if (self.timeOffset >= action.delay) {
          actions.shift();
          action.doAction();
        } else {
          break;
        }
      }
      if (actions.length > 0 || self.liveMode) {
        self.raf = requestAnimationFrame(check);
      }
    }
    this.raf = requestAnimationFrame(check);
  }

    public clear() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    this.actions.length = 0;
  }
}

// createPlayerService
export function createPlayerService(){

   const playerMachine = createMachine<PlayerContext, PlayerEvent, PlayerState>(
     {//...
     },
     {
         actions: {
             play(ctx) {
               // ...
                  const actions = new Array<actionWithDelay>();
                  for (const event of neededEvents) {
                    // 根据不同时间类型处理不同的方法
                      const castFn = getCastFn(event, isSync);
                      actions.push({
                        doAction: () => {
                          castFn();
                          emitter.emit(ReplayerEvents.EventCast, event);
                        },
                        delay: event.delay!,
                      });
                  }
                  timer.addActions(actions);
                  timer.start();
             }
         }
     }
   )

   return interpret(playerMachine);
}

```

# 参考链接

https://github.com/rrweb-io/rrweb/blob/master/docs/serialization.zh_CN.md
https://feiker.xyz/user-track/
https://juejin.cn/post/6953533236337197070#heading-1
