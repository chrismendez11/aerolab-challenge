import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Products from './components/Products'
import getConfig from './utils/getConfig'

function App() {

  

  useEffect(() => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0OWY3ZjYwODc5MzAwMWFkNDcxY2UiLCJpYXQiOjE2NjQzOTMwODd9.z_2o0W2BF8623zpSdGFJYirNFvWR9UJEI56Gq_Ebql8'

    const body: object = {
      "amount": 1000
    }

    localStorage.setItem('token', token)

    // axios.post('https://coding-challenge-api.aerolab.co/user/points', body, getConfig())
    // .then(res => {
    //   console.log(res.data)
    // })
    // .catch(err => console.log(err))

  }, [])



  return (
    <div className="App">
      <Header />
      <Products />
    </div>
  )
}

export default App
