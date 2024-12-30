import React, { useRef } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ChainId } from 'blueswapbymia-sdk'
import { ButtonLight } from '../Button'
import { useWalletModalToggle } from '../../state/application/hooks'

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid #6366f1;
  background: white;
  padding: 0.15rem 0.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6366f1;
  font-weight: 500;
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
    outline: none;
    transform: translateY(-1px);
    background-color: rgba(99, 102, 241, 0.08);
    box-shadow: 0px 4px 12px rgba(99, 102, 241, 0.1);
  }
`

const MenuFlyout = styled.span`
  min-width: 20.125rem;
  background-color: white;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0px 4px 20px rgba(99, 102, 241, 0.15);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`

const NetworkItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  color: #4b5563;
  font-weight: 500;
  
  :hover {
    background-color: rgba(99, 102, 241, 0.08);
    color: #6366f1;
  }
  
  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`

const NetworkIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const ConnectButton = styled(ButtonLight)`
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  color: white;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(99, 102, 241, 0.2);
  transition: all 0.2s ease;

  :hover {
    transform: translateY(-1px);
    box-shadow: 0px 6px 16px rgba(99, 102, 241, 0.3);
    background: linear-gradient(to right, #4f46e5, #7c3aed);
  }
`

const SUPPORTED_NETWORKS = [
    {
        chainId: ChainId.MAINNET,
        name: 'Ethereum',
        icon: '/BlueberryDex/eth-icon.svg',
        rpcUrl: 'https://rpc.mevblocker.io/fast',
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18
        },
        blockExplorerUrl: 'https://etherscan.io'
      },
      {
        chainId: ChainId.BNB,
        name: 'BNB Chain',
        icon: '/BlueberryDex/bnb-icon.svg',
        rpcUrl: 'https://bsc-dataseed.binance.org',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        blockExplorerUrl: 'https://bscscan.com'
      }
]

export default function NetworkSwitcher() {
  const { chainId, library, account } = useActiveWeb3React()
  const [isOpen, setIsOpen] = React.useState(false)
  const node = useRef<HTMLDivElement>(null)
  const toggleWalletModal = useWalletModalToggle()
  
  const currentNetwork = SUPPORTED_NETWORKS.find(n => n.chainId === chainId)

  const handleNetworkSwitch = async (network: typeof SUPPORTED_NETWORKS[0]) => {
    if (!library?.provider?.request) return
    
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${network.chainId.toString(16)}` }]
      })
    } catch (error) {
      if ((error as any).code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${network.chainId.toString(16)}`,
                chainName: network.name,
                nativeCurrency: network.nativeCurrency,
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.blockExplorerUrl]
              }
            ]
          })
        } catch (error) {
          console.error('Add network error:', error)
        }
      }
    }
    setIsOpen(false)
  }

  return (
    <div ref={node} style={{ position: 'relative' }}>
      {!account ? (
        <ConnectButton onClick={toggleWalletModal}>
          Connect Wallet
        </ConnectButton>
      ) : (
        <>
          <StyledMenuButton onClick={() => setIsOpen(!isOpen)}>
            {currentNetwork ? (
              <>
                <NetworkIcon src={currentNetwork.icon} alt={currentNetwork.name} />
                {currentNetwork.name}
              </>
            ) : (
              'Unsupported Network'
            )}
          </StyledMenuButton>
          
          {isOpen && (
            <MenuFlyout>
              {SUPPORTED_NETWORKS.map(network => (
                <NetworkItem 
                  key={network.chainId}
                  onClick={() => handleNetworkSwitch(network)}
                >
                  <NetworkIcon src={network.icon} alt={network.name} />
                  {network.name}
                </NetworkItem>
              ))}
            </MenuFlyout>
          )}
        </>
      )}
    </div>
  )
} 