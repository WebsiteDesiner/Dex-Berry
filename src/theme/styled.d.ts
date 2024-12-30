import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export interface Colors {
  white: string
  black: string
  text1: string
  text2: string
  text3: string
  text4: string
  text5: string
  bg1: string
  bg2: string
  bg3: string
  bg4: string
  bg5: string
  modalBG: string
  advancedBG: string
  primary: string
  primary1: string
  primary2: string
  primary3: string
  primary4: string
  primary5: string
  primaryText1: string
  secondary1: string
  secondary2: string
  secondary3: string
  blue1: string
  blue2: string
  red1: string
  red2: string
  green1: string
  yellow1: string
  yellow2: string
  error: string
  success: string
  warning: string
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: {
      sm: number
      md: number
      lg: number
    }
    shadow1: string
    shadow2: string
    borderRadius: string
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
    }
    transition: { duration: string; timing: string }
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
  }
}
