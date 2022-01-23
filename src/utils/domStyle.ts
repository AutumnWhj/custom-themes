import {rgbaTo16, cleanRegExp, fixUrl, getFile,toCamelCase} from './helper'
const colorKeyArr = [
  'color',
  'background-color',
  'border-color',
  'border-top-color',
  'border-bottom-color',
  'border-left-color',
  'border-right-color'
]
const getStyle = ele => {
  const { currentStyle, style } = ele || {}
  return currentStyle || style || {}
}
export const getStyleTemplate = (data, colorMap) => {
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(cleanRegExp(key), 'ig'), value)
  })
  return data
}
export const insertAfter = (newEle, targetEle) => {
  const parent = targetEle.parentNode
  if (parent.lastChild == targetEle) {
    parent.appendChild(newEle)
  } else {
    parent.insertBefore(newEle, targetEle.nextSibling)
  }
}

export const addNewStyle = (cssText, targetEle, baseColor?, themeColor?) => {
  targetEle.setAttribute('is-replace', 'ing')
  const newStyle = document.createElement('style')
  newStyle.textContent = cssText
  newStyle.setAttribute('is-replace', 'done')
  if (baseColor && themeColor) {
    newStyle.setAttribute('base-color', baseColor)
    newStyle.setAttribute('theme-color', themeColor)
  }

  insertAfter(newStyle, targetEle)
  targetEle.remove()
}
export const getNeedReplaceUrls = str => {
  const arr = str.match(/url\((.*?)\)/gi) || []

  return arr
    .map(url => {
      return url
        .replace(/^url\(/i, '')
        .replace(/\)$/i, '')
        .replace(/^'/, '')
        .replace(/'$/, '')
        .replace(/^"/, '')
        .replace(/"$/, '')
    })
    .filter(url => {
      const isPass = !/^(http|\/\/|data)/.test(url)

      return isPass
    })
}
export const replaceUrl = (str, url, protocol) => {
  const needReplaceStrArr = getNeedReplaceUrls(str)
  let returnStr = str

  let orgUrl = url
  if (/^\/\//.test(orgUrl)) {
    orgUrl = `${protocol}${orgUrl}`
  }

  needReplaceStrArr.forEach(oldUrl => {
    const { href } = new URL(oldUrl, orgUrl)

    returnStr = returnStr.replace(
      new RegExp(cleanRegExp(`url(${oldUrl})`), 'g'),
      `url(${href.replace(new RegExp(`^${protocol}`, 'i'), '')})`
    )
  })
  return returnStr
}
export const replaceStyleEleColor = (colorMap, baseColor, themeColor) => {
  const eles = document.querySelectorAll('style[type="text/css"]')

  const willChangeList = Array.from(eles).filter(
    ele => !ele.getAttribute('is-replace') && !ele.getAttribute('change-from')
  )
  const { href } = location
  const [path] = href.split('?')

  willChangeList.forEach((ele: any) => {
    const cssText = replaceUrl(
      getStyleTemplate(ele.textContent, colorMap),
      path,
      location.protocol
    )
    addNewStyle(cssText, ele, baseColor, themeColor)
  })
}
export const replaceLinkEleColor = colorMap => {
  const eles = document.querySelectorAll('link[href]')

  const cssExp = new RegExp(/[\w-]+\.css/g)

  eles.forEach((ele: any) => {
    if (!ele.getAttribute('is-replace')) {
      let url = ele.getAttribute('href')

      if (cssExp.test(url)) {
        ele.setAttribute('is-replace', 'ing')

        url = fixUrl(url, location)
        getFile(url).then((res: any) => {
          const { data } = res || {}
          const cssText = replaceUrl(
            getStyleTemplate(data || '', colorMap),
            url,
            location.protocol
          )

          addNewStyle(cssText, ele)
        })
      }
    }
  })
}
export const changeAllDomColor = (dom, replaceColorObj) => {
  const { children=[] } = dom

  const style = getStyle(dom)

  if (style.getPropertyValue) {
    colorKeyArr.forEach(key => {
      const val = style.getPropertyValue(key)
      if (val) {
        const colorKey = rgbaTo16(val)

        const replaceColor = replaceColorObj[colorKey]

        if (replaceColor) {
          dom.style[toCamelCase(key)] = replaceColor
        }
      }
    })
  }

  const { length } = children || []
  if (length) {
    (Array.from(children) || []).forEach(item => changeAllDomColor(item, replaceColorObj))
  }
}