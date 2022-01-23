
import { getReplacePrimaryColorMap } from './utils'
import { replaceStyleEleColor, replaceLinkEleColor, changeAllDomColor } from './utils/domStyle'
let replaceColorMap
const observeTheme = (themeColor:string, baseColor:string) => {
  const observer = new MutationObserver(mutationsList => {
    console.log('mutationsList: ', mutationsList);
    if (!replaceColorMap) {
      replaceColorMap = getReplacePrimaryColorMap(baseColor, themeColor)
    }
    setTimeout(() => {
      replaceStyleEleColor(replaceColorMap, baseColor, themeColor)
      replaceLinkEleColor(replaceColorMap)

      mutationsList.forEach(mutation => {
        const { addedNodes } = mutation || {}

        Array.from(addedNodes).forEach(ele => {
          changeAllDomColor(ele, replaceColorMap)
        })
      })
    }, 2)
  })
  // 开始观察ell元素并制定观察内容
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}

export const changePrimaryTheme = (themeColor:string, baseColor:string) => {
  try {
    if(window) {
      if(!baseColor || !themeColor) {return console.error('当前主题色和默认主题色为必传!,如changeTheme("#ffeb3b", "#5a66ff")') }
      observeTheme(themeColor, baseColor)    
    }
  } catch (error) {
    console.warn('当前浏览器不支持换肤')
  }
  
}

