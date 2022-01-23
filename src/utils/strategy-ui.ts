import Color from 'color'

export const primaryColorStrategy = primaryColor => {
  return {
    '--primary-color': primaryColor,
    '--primary-hover-color': Color(primaryColor)
      .mix(Color('white'), 0.9)
      .hex(),
    '--primary-hover-border-color': Color(primaryColor)
      .mix(Color('white'), 0.2)
      .hex(),
    '--primary-highlight-color': Color(primaryColor)
      .mix(Color('white'), 0.92)
      .hex(),
    '--primary-border-color': Color(primaryColor)
      .mix(Color('white'), 0.8)
      .hex(),
    '--primary-plain-border-color': Color(primaryColor)
      .mix(Color('white'), 0.6)
      .hex(),
    '--primary-disabled-color': Color(primaryColor)
      .mix(Color('white'), 0.5)
      .hex(),
    '--primary-plain-disabled-color': Color(primaryColor)
      .mix(Color('white'), 0.4)
      .hex(),
    '--primary-active-color': Color(primaryColor)
      .mix(Color('black'), 0.1)
      .hex()
  }
}