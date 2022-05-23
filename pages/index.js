import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useContext } from 'react'

import { Web3Provider } from '../components/Web3Connect/Web3context'

import Web3context from '../components/Web3Connect/Web3context'




export default function Home() {



  return (
      <App />

  );
}

function App() {

  const value = useContext(Web3context)
  
  console.log(value)


  return (
    <nav>

    </nav>
  );
}