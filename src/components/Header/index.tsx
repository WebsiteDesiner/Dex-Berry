import { ChainId } from 'blueswapbymia-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ReactComponent as LogoDark } from '../../assets/svg/logo_dark.svg'
import WordmarkDark from '../../assets/svg/wordmark_dark.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import VersionSwitch from './VersionSwitch'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;ye
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  padding: 1rem;
  
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  color: #6366f1;
  font-size: 24px;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.3px;
  white-space: nowrap;
  transform: translateZ(0);
  backface-visibility: hidden;
`

const LogoText = styled.div`
  margin-left: 12px;
  font-size: 24px;
  font-weight: 500;
  color: #6366f1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const SwapText = styled.span`
  font-weight: 400;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  
  :hover {
    transform: rotate(-5deg);
  }
  
  img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }
  
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 36px;
    height: 36px;
    
    img { 
      width: 100% !important;
      height: 100% !important;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const LanguageButton = styled.button`
  padding: 0.5rem;
  margin-left: 0.5rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.primary1};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.BNB]: 'BSC'
}

console.log('Logo paths:', {
  LogoDark,
  WordmarkDark
})

console.log('SVG imports:', {
  LogoDark: typeof LogoDark,
  WordmarkDark: typeof WordmarkDark
})

export default function Header() {
  const [currentLang, setCurrentLang] = React.useState('en')
  const { i18n } = useTranslation()

  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()
  console.log('Dark mode:', isDark)

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'zh-CN' : 'en'
    setCurrentLang(newLang)
    ;(i18n as any).changeLanguage(newLang)
  }
  //图标跳转链接
  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <HeaderElement>
          <Title href="." onClick={(e) => {
            e.preventDefault()
            window.location.href = 'https://blueberryswap.finance'
          }}>
            <UniIcon>
              <img 
                src={process.env.PUBLIC_URL + '/fruits1.png'}
                alt="logo" 
              />
            </UniIcon>
            <LogoText>
              Blueberry<SwapText>Swap</SwapText>
            </LogoText>
          </Title>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {chainId === ChainId.BNB ? 'BNB' : 'ETH'}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <VersionSwitch />
            <Settings />
            <LanguageButton onClick={toggleLanguage}>
              {currentLang === 'en' ? 'CN' : 'EN'}
            </LanguageButton>
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
