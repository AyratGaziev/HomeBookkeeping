import React from 'react'
import {Link} from 'react-router-dom'
import './header.css'
import logo from './header__logo.png'

const Header = ({onSelect, selected}) => {
    const select = (e) => {
        onSelect(e.target.name)
    }
    const homeSelected = () => {
        onSelect(null)
    }
    return (
        <div className = 'header'>
            <nav className = 'header__nav'>
                <Link 
                        className = {selected === "wallet" ? "header__link selected" : "header__link" }
                        name = 'wallet'
                        onClick = {select} 
                        to = 'wallet'> ПОПОЛНЕНИЯ </Link>
                <Link 
                        className = {selected === "spendings" ? "header__link selected" : "header__link" }
                        name = 'spendings'
                        onClick = {select}
                        to = 'spendings'> ЗАТРАТЫ </Link>
                <Link 
                        className = 'header__logo'
                        onClick = {homeSelected} 
                        to = ''>
                    <img src = {logo} alt ='logo' />
                    <span>HOME bookkeeping</span> 
                </Link>
                <Link 
                        className = {selected === "moneybox" ? "header__link selected" : "header__link" }
                        name = 'moneybox'
                        onClick = {select} 
                        to = 'moneybox'> КОПИЛКА </Link>
                <Link 
                        className = {selected === "analysis" ? "header__link selected" : "header__link" } 
                        name = 'analysis'
                        onClick = {select}
                        to = 'analysis'> АНАЛИЗ </Link>
             </nav>
        </div>
        
    )
}

export default Header