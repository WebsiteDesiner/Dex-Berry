import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
  FlattenSimpleInterpolation
} from 'styled-components'
import { Link } from 'react-router-dom'

declare module 'styled-components' {
  interface Grids {
    sm: number
    md: number
    lg: number
  }

  export interface DefaultTheme {
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation
    white: string
    black: string
    grids: Grids
    shadow1: string
    shadow2: string
    borderRadius: string
    mediaWidth: typeof mediaWidthTemplates
    transition: { duration: string; timing: string }
    primary: string
    primary1: string
    primary2: string
    primary3: string
    primary4: string
    primary5: string
    secondary1: string
    secondary2: string
    secondary3: string
    bg1: string
    bg2: string
    bg3: string
    bg4: string
    bg5: string
    advancedBG: string
    text1: string
    text2: string
    text3: string
    text4: string
    text5: string
    blue1: string
    blue2: string
    error: string
    success: string
    warning: string
    modalBG: string
    primaryText1: string
    red1: string
    red2: string
    green1: string
    yellow1: string
    yellow2: string
  }
}

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

export function theme(darkMode: boolean): DefaultTheme {
  const colors = {
    // 主题色
    primary: '#4F46E5',
    primary1: darkMode ? '#3B82F6' : '#4F46E5',
    primary2: darkMode ? '#2563EB' : '#3B82F6',
    primary3: darkMode ? '#1D4ED8' : '#2563EB',
    primary4: darkMode ? '#1E40AF' : '#1D4ED8',
    primary5: darkMode ? '#1E3A8A' : '#1E40AF',

    // 次要颜色
    secondary1: darkMode ? '#60A5FA' : '#93C5FD',
    secondary2: darkMode ? '#3B82F6' : '#60A5FA',
    secondary3: darkMode ? '#2563EB' : '#3B82F6',

    // 背景色
    bg1: darkMode ? '#0F172A' : '#F8FAFC',
    bg2: darkMode ? '#1E293B' : '#F1F5F9',
    bg3: darkMode ? '#334155' : '#E2E8F0',
    bg4: darkMode ? '#475569' : '#CBD5E1',
    bg5: darkMode ? '#64748B' : '#94A3B8',
    advancedBG: darkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.9)',

    // 文字颜色
    text1: darkMode ? '#F8FAFC' : '#0F172A',
    text2: darkMode ? '#E2E8F0' : '#1E293B',
    text3: darkMode ? '#CBD5E1' : '#334155',
    text4: darkMode ? '#94A3B8' : '#475569',
    text5: darkMode ? '#64748B' : '#64748B',

    // 功能色
    blue1: '#3B82F6',
    blue2: '#2563EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',

    // 其他颜色
    modalBG: darkMode ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.3)',
    primaryText1: darkMode ? '#60A5FA' : '#4F46E5',
    red1: '#EF4444',
    red2: '#DC2626',
    green1: '#10B981',
    yellow1: '#F59E0B',
    yellow2: '#D97706'
  }

  return {
    ...colors,
    white: '#FFFFFF',
    black: '#000000',

    flexColumnNoWrap: css`
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    ` as FlattenSimpleInterpolation,
    flexRowNoWrap: css`
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    ` as FlattenSimpleInterpolation,

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    shadow1: darkMode ? '#000' : '#4F46E5',
    shadow2: darkMode ? '#000' : '#3B82F6',
    borderRadius: '0.5rem',
    mediaWidth: mediaWidthTemplates,
    transition: {
      duration: '200ms',
      timing: 'ease-in-out'
    }
  }
}

export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

export const ExternalLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export const StyledInternalLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export const TYPE = {
  main(props: any) {
    return React.createElement('div', props)
  },
  link(props: any) {
    return React.createElement(ExternalLink, props)
  },
  black(props: any) {
    return React.createElement('div', props)
  },
  white(props: any) {
    return React.createElement('div', props)
  },
  body(props: any) {
    return React.createElement('div', props)
  },
  largeHeader(props: any) {
    return React.createElement('h2', props)
  },
  mediumHeader(props: any) {
    return React.createElement('h3', props)
  },
  subHeader(props: any) {
    return React.createElement('h4', props)
  },
  small(props: any) {
    return React.createElement('div', props)
  },
  blue(props: any) {
    return React.createElement('div', props)
  },
  yellow(props: any) {
    return React.createElement('div', props)
  },
  darkGray(props: any) {
    return React.createElement('div', props)
  },
  italic(props: any) {
    return React.createElement('div', {
      ...props,
      style: {
        ...props.style,
        fontStyle: 'italic'
      }
    })
  },
  error(props: any) {
    return React.createElement('div', {
      ...props,
      style: {
        ...props.style,
        color: props.theme?.error
      }
    })
  }
}

export const BackArrow = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};

  &:hover {
    opacity: 0.8;
  }
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const FixedGlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  button {
    user-select: none;
  }

  html {
    font-size: 16px;
    font-variant: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  }
`

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeObject = useMemo(() => theme(false), [])
  return React.createElement(StyledComponentsThemeProvider, { theme: themeObject }, children)
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg1};
  }

  body {
    min-height: 100vh;
    background-position: 0 -30vh;
    background-repeat: no-repeat;
  }
` 