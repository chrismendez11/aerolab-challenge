import React, { useState } from 'react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import './SearchBar.css'
import { setInput } from '../store/slices/inputValue.slice'
import { setIsSearchingActive } from '../store/slices/isSearchingActive'

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

type Props = {
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    allProducts: Product[]
}

const SearchBar = ({ setProducts, allProducts }: Props) => {

    const inputValue = useSelector((state: RootState) => state.inputValue)
    const dispatch = useDispatch()


    const handleProductSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProducts(allProducts.filter(product => {
            return product.name.toLowerCase().includes(inputValue.toLocaleLowerCase()) || product.category.toLowerCase().includes(inputValue.toLocaleLowerCase())
        }))
        dispatch(setIsSearchingActive())
    }

    return (
        <form onSubmit={(e) => handleProductSearch(e)} className='searchBar__container'>
            <input value={inputValue} onChange={(e) => dispatch(setInput(e.target.value))} type="text" placeholder='Search a product or a category...' />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default SearchBar