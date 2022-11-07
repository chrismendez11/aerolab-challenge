import React from 'react'
import './NoProductsFound.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'

const NoProductsFound = () => {

    const [input, setInput] = useState<string>('')

    const inputValue = useSelector((state: RootState) => state.inputValue)
    const isSearchingACtive = useSelector((state: RootState) => state.isSearchingActive)

    useEffect(() => {
        setInput(inputValue)
    }, [isSearchingACtive])

  return (
    <div className='noProductsFound__section'>
        <h2>No products found for "<span>{input}</span>". Try searching another product or category</h2>
    </div>
  )
}

export default NoProductsFound