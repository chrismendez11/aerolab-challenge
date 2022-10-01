import React from 'react'
import './ProductDetail.css'
import { useEffect, useState } from 'react'
import buyIcon from '../../cod-challenge/assets/icons/buy-blue.svg'
import coin from '../../cod-challenge/assets/icons/coin.svg'

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
}

const ProductDetail = ({product, user}: Props) => {

  const [userCoins, setUserCoins] = useState<number>()

  // Asign users points to state
  useEffect(() => {
    if (user) {
      setUserCoins(user.points)
    }
  }, [user])

  return (
    <article className='product-card'>
      {userCoins && userCoins >= product.cost ? <div className='product-card__icon-cont'><img src={buyIcon} alt="" /></div> : <div className='product-card__icon-cont'>You need 100 <img src={coin} alt="" /></div>}
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