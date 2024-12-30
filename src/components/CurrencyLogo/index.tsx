import { Currency, ETHER, Token } from 'blueswapbymia-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ChainId } from 'blueswapbymia-sdk'
import { useActiveWeb3React } from '../../hooks'

import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const { chainId } = useActiveWeb3React()

  const isNativeCurrency = useMemo(() => {
    if (!currency) return false
    if (chainId === ChainId.BNB) {
      return currency.symbol === 'BNB' || currency === ETHER
    }
    return currency === ETHER
  }, [currency, chainId])

  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (isNativeCurrency) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations, isNativeCurrency])

  if (isNativeCurrency) {
    const logoSrc = chainId === ChainId.BNB ? '/bnb-icon.svg' : '/eth-icon.svg'
    return <StyledEthereumLogo src={logoSrc} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
