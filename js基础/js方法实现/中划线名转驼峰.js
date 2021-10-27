function getHumpStr(str) {
  const splitStr = str.split('-')

  for (let i = 1; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join('')
}

console.log(getHumpStr('get-element-by-id'))
