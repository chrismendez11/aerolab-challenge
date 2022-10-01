import React from 'react'
import { useEffect, useState } from 'react'
import './Products.css'
import logo from '../../cod-challenge/assets/aerolab-logo.svg'
import header_img from '../../cod-challenge/assets/header-x2.png'
import coin from '../../cod-challenge/assets/icons/coin.svg'
import arrowRight from '../../cod-challenge/assets/icons/arrow-right.svg'
import axios from 'axios'
import getConfig from '../utils/getConfig'
import ProductDetail from './ProductDetail'

type User = {
    createDate: string,
    name: string,
    points: number,
    redeemHistory: any,
    __v: number,
    id: string
  }

type Product = {
    category: string,
    cost: number,
    img: {
        hdUrl: string,
        url: string
        },
    name: string,
    _id: string
  }

//   type ProductDetail = {
//     key: string,
//     product: Product,
//     user: User
// }

const Products = () => {

    const [user, setUser] = useState<User>({} as User)
    const [products, setProducts] = useState<Product[]>([])

    // Functions in order to get user info and products from API calls

    const getUserInfo = () => {
        axios.get('https://coding-challenge-api.aerolab.co/user/me', getConfig())
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }
        
    const getProducts = () => {
        axios.get('https://coding-challenge-api.aerolab.co/products', getConfig())
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => console.log(err))
    }
        
    useEffect(() => {
        getUserInfo()
        getProducts()
    }, [])

    // Pagination functionality
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(16)

    // Get Current Products

    const indexLastProduct = currentPage * productsPerPage
    const indexFirstProduct = indexLastProduct - productsPerPage
    const currentProducts: Product[] = products?.slice(indexFirstProduct, indexLastProduct)

    const handlePage = (): void => {
        if (currentPage === 1) {
            setCurrentPage(2)
        } else {
            setCurrentPage(1)
        }
    }

    // Filter btns 
    const handleLowestPrice = () => {
        const lowestPrice = products.sort((a, b) => {
            return a.cost - b.cost
        })
        setProducts(lowestPrice)
    }

    console.log(currentProducts)


    return (
        <main>
            <div className='products-container'>
                <header className='products__header'>
                    <div className='products__header__nav'>
                        <div className='logo-cont'><img src={logo} alt="" /></div>
                        <div className='products__header__user-info'>
                            <h2>{user?.name}</h2>
                            <span>{user?.points} <img src={coin} alt="" /></span>
                        </div>
                    </div>
                    <div className='products__header__header-img'>
                        <img src={header_img} alt="" />
                        <h2>Electronics</h2>
                    </div>
                </header>
                <main className='products__main'>
                    <div className='products__main__features'>
                        <div className='products__main__features-cont'>
                            <h2>{currentPage * productsPerPage} of {products.length} products</h2>
                            <div className='bar-line-vertical'></div>
                            <div className='products__main__sortBy-cont'>
                                <h2>Sort by:</h2>
                                <button className='filter-btn'>Most recent</button>
                                <button onClick={handleLowestPrice} className='filter-btn'>Lowest price</button>
                                <button className='filter-btn'>Highest price</button>
                            </div>
                        </div>
                        <div className='next-page-btn'>
                            <button onClick={handlePage}><img src={arrowRight} alt="" /></button>
                        </div>
                    </div>
                    <div className='bar-line main-big'></div>
                    <div className='products__main__products-cont'>
                        {currentProducts?.map((product: Product) => (
                            <ProductDetail key={product._id} product={product} user={user}/>
                        ))}
                    </div>
                </main>
            </div>
        </main>
    )
}

export default Products