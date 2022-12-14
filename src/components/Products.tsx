import React from 'react'
import { useEffect, useState } from 'react'
import './Products.css'
import logo from '../../cod-challenge/assets/aerolab-logo.svg'
import header_img from '../../cod-challenge/assets/header-x2.png'
import coin from '../../cod-challenge/assets/icons/coin.svg'
import arrowRight from '../../cod-challenge/assets/icons/arrow-right.svg'
import arrowLeft from '../../cod-challenge/assets/icons/arrow-left.svg'
import axios from 'axios'
import getConfig from '../utils/getConfig'
import ProductDetail from './ProductDetail'
import SearchBar from './SearchBar'
import NoProductsFound from './NoProductsFound'

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

const Products = ({setUser, user}: any) => {

    const [allProducts, setAllProducts] = useState<Product[]>([])
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
            setAllProducts(res.data)
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
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    const [currentFilter, setCurrentFilter] = useState<string>('')

    // First render select "Most recent" filter btn
    useEffect(() => {
        const currentBtn = document.getElementById('recent');
        currentBtn!.style.background = '#0ad4fa';
        currentBtn!.style.color = '#FFFF';

        setCurrentFilter('recent')
    }, [])

    // Filter btns 
    const handleMostRecentProducts = (e: any) => {
        getProducts()
        changeFilterBtnColor(e)
    }

    const handleLowestPrice = (e: any) => {
        const lowestPrice = [...products.sort((a, b) => {
            return a.cost - b.cost
        })]
        setProducts(lowestPrice)
        changeFilterBtnColor(e)
    }

    const handleHighestPrice = (e: any) => {
        const highestPrice = [...products.sort((a, b) => {
            return b.cost - a.cost
        })]
        setProducts(highestPrice)
        changeFilterBtnColor(e)
    }

    // Change Filter btn color
    const changeFilterBtnColor = (e: any) => {
        const lastBtn = document.getElementById(currentFilter);
        lastBtn!.style.background = '';
        lastBtn!.style.color = '';

        const currentBtn = document.getElementById(e.target.id);
        currentBtn!.style.background = '#0ad4fa';
        currentBtn!.style.color = '#FFFF';

        setCurrentFilter(e.target.id)
    }


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
                    <SearchBar setProducts={setProducts} allProducts={allProducts}/>
                    <div className='products__main__features'>
                        <div className='products__main__features-cont'>
                            <h2>{products.length > productsPerPage ? indexLastProduct : products.length} of {products.length} products</h2>
                            <div className='bar-line-vertical'></div>
                            <div className='products__main__sortBy-cont'>
                                <h2>Sort by:</h2>
                                <button onClick={handleMostRecentProducts} className='filter-btn' id='recent'>Most recent</button>
                                <button onClick={handleLowestPrice} className='filter-btn' id='lowest'>Lowest price</button>
                                <button onClick={handleHighestPrice} className='filter-btn' id='highest'>Highest price</button>
                            </div>
                        </div>
                        <div className='next-page-btn'>
                            <button onClick={handlePage}><img src={currentPage === 1 ? arrowRight: arrowLeft} alt="" /></button>
                        </div>
                    </div>
                    <div className='bar-line main-big'></div>
                    <div className='products__main__products-cont'>
                        {currentProducts.length > 0 ? currentProducts?.map((product: Product) => (
                            <ProductDetail key={product._id} product={product} user={user} getUserInfo={getUserInfo}/>
                        )) : <NoProductsFound />}
                    </div>
                    <div className='footer-main'>
                        <h2>{products.length > productsPerPage ? indexLastProduct : products.length} of {products.length} products</h2>
                        <div className='next-page-btn-footer'>
                            <button onClick={handlePage}><img src={currentPage === 1 ? arrowRight: arrowLeft} alt="" /></button>
                        </div>
                    </div>
                    <div className='bar-line main-big'></div>
                </main>
            </div>
        </main>
    )
}

export default Products