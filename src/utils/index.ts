import {fixColorMap} from './helper'
import {primaryColorStrategy} from './strategy-ui'

export const getReplacePrimaryColorMap = (fromColor: string, toColor: string) => {
  const originColor = primaryColorStrategy(fromColor)
  const themeColor = primaryColorStrategy(toColor)
  const resultColorMap = Object.keys(originColor).reduce(
    (result: any, originKey) => {
      const originColorHex = originColor[originKey]
      const themeColorHex = themeColor[originKey]
      result[originColorHex] = themeColorHex
      return result
    },
    {}
  )
  return fixColorMap(resultColorMap)
}