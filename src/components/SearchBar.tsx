import React, { useState } from 'react'
import './SearchBar.css'

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

    const [inputValue, setInputValue] = useState<string>('')

    const handleProductSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProducts(allProducts.filter(product => {
            return product.name.toLowerCase().includes(inputValue.toLocaleLowerCase()) || product.category.toLowerCase().includes(inputValue.toLocaleLowerCase())
        })
        )
    }

    return (
        <form onSubmit={(e) => handleProductSearch(e)} className='searchBar__container'>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Search a product or a category...' />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default SearchBar