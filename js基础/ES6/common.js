const fs = require('fs')
const path = require('path')
const vm = require('vm')

function customerRequire(fileName) {
  const currentPath = path.resolve(__dirname, fileName)

  const content = fs.readFileSync(currentPath, 'utf-8')

  // 拼接function 是为在块级作用域中执行，防止命名冲突/ 类似 eval,new Function
  const wrappedContent = '(function (require,module,export){' + content + '})'

  const script = new vm.Script(wrappedContent, { filename: 'index.js' })
  const fun = script.runInThisContext(script)
  const module = {
    exports: {},
  }
  fun(customerRequire, module, module.exports)
  return module.exports
}
