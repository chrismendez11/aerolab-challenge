import React from 'react'
import './ProductDetail.css'
import { useEffect, useState } from 'react'
import buy_blue from '../../cod-challenge/assets/icons/buy-blue.svg'
import buy_white from '../../cod-challenge/assets/icons/buy-white.svg'
import coin from '../../cod-challenge/assets/icons/coin.svg'
import axios from 'axios'
import getConfig from '../utils/getConfig'

type Props = {
  product: {
    category: string;
    cost: number;
    img: {
      hdUrl: string;
      url: string;
    }
    name: string;
    _id: string;
  },
  user: {
    createDate: string,
    name: string,
    points: number,
    redeemHistory: any,
    __v: number,
    id: string
  }
  getUserInfo: Function
}

let setPadding: Object;

const ProductDetail = ({ product, user, getUserInfo}: Props) => {

  const [userCoins, setUserCoins] = useState<number>()

  // Asign users points to state
  useEffect(() => {
    if (user) {
      setUserCoins(user.points)
    }
  }, [user])

  // Function in order to handle the Reddem display
  const [reddem, setReddem] = useState<Boolean>(false)
  const handleReddemDisplay = () => {
    if (!reddem) {
      setReddem(true)
      setPadding = {
        padding: 0
      }
    } else {
      setReddem(false)
      setPadding = {
        padding: undefined
      }
    }
  }

  // Function for Reddem product
  const handleReddem = () => {
    const productID: Object = {
      productId: product._id
    }
    axios.post('https://coding-challenge-api.aerolab.co/redeem', productID, getConfig())
      .then(res => {
        console.log(res.data)
        setReddem(false)
        handleReddemDisplay()
        getUserInfo()
      })
      .catch(err => console.log(err))
  }


  return (
    <article id='card' className='product-card' style={setPadding}>
      {reddem && <div className='product-card__FOCUS'>
        <div className='product-card__icon-cont'><img onClick={handleReddemDisplay} src={buy_white} alt="" /></div>
        <div className='reddem-info-cont'>
          <span>{product?.cost}</span>
          <img src={coin} alt="" />
        </div>
        <button onClick={handleReddem} className='reddem-btn'>Reddem now</button>
      </div>}
      {userCoins && userCoins >= product.cost ? <div className='product-card__icon-cont'>{reddem ? '' : <img onClick={handleReddemDisplay} src={buy_blue} alt="" />}</div> : <div className='NotEnough'><span>You need {product?.cost - user?.points}</span> <img src={coin} alt="" /></div>}
      <header className='product-card__header-img'><img src={product?.img.url} alt="" /></header>
      <div className='bar-line'></div>
      <div className='product-card__info'>
        <span>{product?.category}</span>
        <h2>{product?.name}</h2>
      </div>
    </article>
  )
}

export default ProductDetail