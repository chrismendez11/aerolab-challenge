import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Products from './components/Products'

type User = {
  createDate: string,
  name: string,
  points: number,
  redeemHistory: any,
  __v: number,
  id: string
}

function App() {

  useEffect(() => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0OWY3ZjYwODc5MzAwMWFkNDcxY2UiLCJpYXQiOjE2NjQzOTMwODd9.z_2o0W2BF8623zpSdGFJYirNFvWR9UJEI56Gq_Ebql8'

    localStorage.setItem('token', token)

  }, [])

  const [user, setUser] = useState<User>({} as User)

  return (
    <div className="App">
      <Header setUser={setUser}/>
      <Products setUser={setUser} user={user}/>
    </div>
  )
}

export default App
