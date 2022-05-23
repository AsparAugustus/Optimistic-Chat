import React from 'react'
import { useState, useEffect } from 'react'
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, useSendTransaction, useBlockNumber, useTransactions} from '@usedapp/core'
import { formatEther, formatUnits} from '@ethersproject/units'
import { ethers, utils } from 'ethers'
import { util } from 'util'



import {
  Image,
  Square,
  Spinner,
  Box,
  Flex,
  Input,
  Text,
  IconButton,
  Button,
  HStack,
  VStack,
  Stack,
  StackDivider,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { parseBytes32String } from 'ethers/lib/utils';

const Dashboard = () => {
  const { account, deactivate, activateBrowserWallet} = useEthers()
  const etherBalance = useEtherBalance(account)

  const contract_addr = '0x8Ef54064246218F4b526d9F8b008E7aF9e587b35'

  const convert_to_hex = (string) => {
    const _hexedstring = utils.hexlify(utils.toUtf8Bytes(string));

    // works for converting from hex to string

    // console.log(utils.toUtf8String(_hexedstring))

    return _hexedstring
  }
  
  // const block = useBlockNumber()
  const { transactions } = useTransactions()

  

  const [value, setValue] = React.useState('')
  const handleInput = (e) => { setValue(e.target.value)
    console.log(e.target.value)
  }

  const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Message' })

  const handleClick = () => {
    sendTransaction({ to: 
      contract_addr,
      value: utils.parseEther("0.00035"),
      // hexlify returns with a hex beginning with 0x, which we don't want
      data: convert_to_hex(value)
     })
  }


  //Display chat functions go below

  const INFURA_ID = '388cf6c1966e447fb5ef8c539c445e00'
  // const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)
  const provider2 = new ethers.providers.EtherscanProvider('kovan', process.env.ETHERSCAN_API);


  const [finalText, setText] = useState()
  var histories = [];
  

  let i = 1;
  const checkHistory = async () => {

    var histories = [];

    const _history = await provider2.getHistory(contract_addr)
    
    console.log(`executed for the ${i}th time`)

    for (let [index, item] of _history.entries())
      {
        if(index != 0) {
          histories.push(`${item.from.toString()} :  ${ethers.utils.toUtf8String(item.data)}`)
          histories.push(`Timestamp: ${item.timestamp}`)
          histories.push("===============================================================================")
          }

          setText(histories)
      }
    i++

  }

  useEffect(()=> {
    const asyncHistory = checkHistory
    asyncHistory()
  
  
    }, [])

 

  useEffect(()=> {
  const asyncHistory = checkHistory
  setInterval(asyncHistory, 20000)


  }, [])


  return (
    <>

    {/* main box */}
    <Flex
    flexDir="column"
    maxW={1400}
    align="center"
    justify="center"
    minH="80vh"
    mx="auto"
    mt="5vh"
    px={4}
    backgroundColor={'whiteAlpha.200'}
    >

  <Box
    border="1px"
    borderColor="whiteAlpha.100"
    overflowY="scroll"
    maxH="60vh"
    minH="60vh"
    flexDirection='row'
    width="150vh"
    px="60px"
  >
    {/* {block} */}
   
   { transactions.map((transaction, index) => (
  <tr> 
      <td style={{fontSize:"12px"}}>index : {index} <br></br></td>
      <td style={{fontSize:"12px"}}>tx.value {parseFloat(formatUnits(transaction.transaction.value, 18))}<br></br></td>
      <td style={{fontSize:"12px"}}>tx to: {transaction.transaction.to}<br></br></td>
      <td style={{fontSize:"12px"}}>tx hash :{transaction.transaction.hash}<br></br></td>
    </tr>

    ))}

    <Text mt="40px">{
    finalText ? (
      finalText.map((item) => {
      return (<Text>{item}</Text>)
    })) : 
    (<Square><Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    /></Square>)
    }
    </Text>
    

  </Box>
  <HStack
  mt="30px"
  spacing="10px"
  width="150vh"
  >
        <Input 
        value={value}
        onChange={handleInput}
        placeholder="Input message here"></Input>
        <Button onClick={()=> handleClick()}
        >Send tx</Button>
          {/* <div>{account}</div>

          <Button onClick={()=> handleClick()}
          >Send tx</Button>  */}

  </HStack>



    </Flex>
    </> 
    
  )
}

export default Dashboard