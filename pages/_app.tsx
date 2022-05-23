import { Kovan, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: `https://kovan.infura.io/v3/${process.env.KOVAN_INFURA}`,
  },
}




import Web3context  from '../components/Web3Connect/Web3context'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'


function MyApp({ Component, pageProps }) {

  const { account, deactivate } = useEthers()
  const etherBalance = useEtherBalance(account)

  return (
    <DAppProvider config={config}>
    <ChakraProvider>
    <Layout>
        <Component {...pageProps} />
    </Layout>

    </ChakraProvider>
    </DAppProvider>

  )
  
  
  
  
}

export default MyApp
