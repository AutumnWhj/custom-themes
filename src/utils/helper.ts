import Color from 'color'
export const getAl = (alStr: string) => {
  const alName = (alStr || '').replace(/var?\(/, '').replace(/\)/, '') || '1'

  const al = parseFloat(alName)

  if (isNaN(al)) {
    try {
      const val = document.body.style.getPropertyValue(alName)

      return parseFloat(val || '1')
    } catch (error) {
      console.error(error)
    }
  }
  return al
}
 export const rgbaTo16 = (color: string) => {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/rgb?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')

  const [red, green, blue, al] = values

  if (red && green && blue) {
    const a = getAl(al),
      r = Math.floor(a * parseInt(red) + (1 - a) * 255),
      g = Math.floor(a * parseInt(green) + (1 - a) * 255),
      b = Math.floor(a * parseInt(blue) + (1 - a) * 255)
    return (
      '#' +
      ('0' + r.toString(16)).slice(-2) +
      ('0' + g.toString(16)).slice(-2) +
      ('0' + b.toString(16)).slice(-2)
    ).toLocaleLowerCase()
  }

  return color
}

export const fixColorMap = colorMap => {
  const newMap: any = {}
  Object.keys(colorMap).forEach(key => {
    const val = colorMap[key]
    if (key.indexOf('#') === 0 && val.indexOf('#') === 0) {
      const [r1, g1, b1] = Color.rgb(key).array()
      const [r2, g2, b2] = Color.rgb(val).array()

      newMap[`(${r1}, ${g1}, ${b1}`] = `(${r2}, ${g2}, ${b2}`
      newMap[`(${r1},${g1},${b1}`] = `(${r2},${g2},${b2}`
    }
  })

  return {
    ...colorMap,
    ...newMap
  }
}
export const cleanRegExp = regExpStr => {
  const arr = [
    '\\',
    '*',
    '.',
    '?',
    '+',
    '$',
    '^',
    '[',
    ']',
    '(',
    ')',
    '{',
    '}',
    '|',
    '/'
  ]

  arr.forEach(key => {
    regExpStr = regExpStr.replace(RegExp(`\\${key}`, 'ig'), `\\${key}`)
  })

  return regExpStr
}
export const fixUrl = (url, httpLocation) => {
  let orgUrl = url
  const { protocol, origin, pathname } = httpLocation

  if (/^\/\//.test(orgUrl)) {
    orgUrl = `${protocol}${orgUrl}`
  } else if (/^(\/|\.)/.test(orgUrl)) {
    const { href: returnUrl } = new URL(orgUrl, `${origin}${pathname}`)
    orgUrl = returnUrl
  }

  return orgUrl
}
export const getFile = (url, isBlob = false) => {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest()
    client.responseType = isBlob ? 'blob' : ''
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/')
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        })
      } else {
        reject(new Error(client.statusText))
      }
    }
    client.open('GET', url)
    client.send()
  })
}
export const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
