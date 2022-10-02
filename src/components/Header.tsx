import React from 'react'
import './Header.css'
import logo from '../../cod-challenge/assets/aerolab-logo.svg'
import axios from 'axios'
import getConfig from '../utils/getConfig'

type User = {
  createDate: string,
  name: string,
  points: number,
  redeemHistory: any,
  __v: number,
  id: string
}

const Header = ({setUser}: any) => {

  // User Info 
  const getUserInfo = () => {
    axios.get('https://coding-challenge-api.aerolab.co/user/me', getConfig())
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
}

  // Get More Coins
  const handleGetCoins = () => {
    const body: object = {
      "amount": 1000
    }
    axios.post('https://coding-challenge-api.aerolab.co/user/points', body, getConfig())
      .then(res => {
        getUserInfo()
      })
      .catch(err => console.log(err))
  }

  // Watch Reddem History 
  const handleReddemHistory = () => {
    axios.get('https://coding-challenge-api.aerolab.co/user/history', getConfig())
      .then(res => {
        console.log(res.data)
        alert('At the moment, the Reddem History is only showed in the browser console. There you can check it out')
      })
      .catch(err => console.log(err))
  }


  return (
    <nav className='header__nav'>
      <div className='nav-cont'>
        <div className='nav-logo'>
          <img src={logo} alt="" />
          <h1>Aerolab Challenge</h1>
        </div>
        <div className='nav-btns'>
          <button onClick={handleGetCoins} className='btn__get-coins' >Get more coins</button>
          <button onClick={handleReddemHistory} className='btn__redden-history'>Watch redeem history</button>
        </div>
      </div>
    </nav>
  )
}

export default Header