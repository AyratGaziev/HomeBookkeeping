import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './header.css'
import logo from './header__logo.png'

const Header = () => {
                    
    const [selected, setSelected] = useState(null)
    const [burgerActive, setBurgerActive] = useState(false)

    const onBurgerClick = () => {
        setBurgerActive((prevBurgerActive) => !prevBurgerActive)
    }
                    
    const select = (e) => {
        setSelected(e.target.name)
        onBurgerClick()
    }
    const homeSelected = () => {
        setSelected(null)
    }

    return (
        <div
            className='header'>
            <nav
                className='header__nav-burger'>
                
                <div className= {burgerActive ? 'burger-wrapper-active'  : 'burger-wrapper'}>
                    <div
                        className={'burger'}                         
                        onClick={onBurgerClick}
                         >                   
                    </div>
                </div>

                <div className={burgerActive ? 'header__nav-burger-menu show' : 'header__nav-burger-menu'}>
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
                            className = {selected === "moneybox" ? "header__link selected" : "header__link" }
                            name = 'moneybox'
                            onClick = {select} 
                            to = 'moneybox'> КОПИЛКА </Link>
                    <Link 
                            className = {selected === "analysis" ? "header__link selected" : "header__link" } 
                            name = 'analysis'
                            onClick = {select}
                            to = 'analysis'> АНАЛИЗ </Link>
                </div>
                
                <Link 
                        className = 'header__logo-mini'
                        onClick = {homeSelected} 
                        to = ''>
                    <img src = {logo} alt ='logo' />
                    <span>HOME bookkeeping</span> 
                </Link>
            </nav>
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