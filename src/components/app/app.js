import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './app.css';
import Header from '../header/header';
import Wallet from '../wallet/wallet'
import Spendings from '../spendings/spendings'
import Moneybox from '../moneybox/moneybox'
import Analysis from '../analysis/analysis'
import Home from '../home/home'

const App = () => {

	const [moneyBox, setMoneyBox] = useState([])

	const [wallet, setWallet] = useState([])

	const [spendings, setSpendings] = useState([])


	useEffect(() => {
		if(JSON.parse(localStorage.getItem('wallet')) === null) return;		 
		setWallet(JSON.parse(localStorage.getItem('wallet')))
	}, [])

	useEffect(() => {
		localStorage.setItem('wallet', JSON.stringify(wallet))
	}, [wallet])

	useEffect(() => {
		if(JSON.parse(localStorage.getItem('spendings')) === null) return;		 
		setSpendings(JSON.parse(localStorage.getItem('spendings')))
	}, [])

	useEffect(() => {
		localStorage.setItem('spendings', JSON.stringify(spendings))
	}, [spendings])

	useEffect(() => {
		if(JSON.parse(localStorage.getItem('moneyBox')) === null) return;		 
		setMoneyBox(JSON.parse(localStorage.getItem('moneyBox')))
	}, [])

	useEffect(() => {
		localStorage.setItem('moneyBox', JSON.stringify(moneyBox))
	}, [moneyBox])

	const addToItem = (input, twoColumns, setFunc, items) => {

		if(twoColumns) {
			const {sum, date} = input
			if(!sum || !date || isNaN(sum)) {
				return
			}	
		} else {
			const {sum, category, date} = input
			if(!sum || !category || !date || isNaN(sum)) {
				return
			}
		}
		setFunc([...items, input])
	}	

	const balanceNow = () => {

		const balanceAll = wallet.reduce((sum, item) => {
			return sum + Number(item.sum)
		},0)
	
		const spendingsAll = spendings.reduce((acc, spend) => {
			return acc + Number(spend.sum)
		},0)
	
		return balanceAll - spendingsAll
	}


	const monthMoney = () => {
		if(wallet.length === 0) {return 0}

		const sum = wallet.filter((item) => {
			return (
				new Date(item.date).getMonth() === new Date().getMonth() &&
				new Date(item.date).getFullYear() === new Date().getFullYear()
			)
		}).reduce((sum, item) => {
			return sum + Number(item.sum)
		},0)

		return sum
	}

	const allSpendings = () => {
		return spendings.reduce((sum, value) => sum + Number(value.sum), 0)
	}

	const monthSpendings = () => {

		if(spendings.length === 0) {return 0}

		const sum = spendings.filter((item) => {
			return (
				new Date(item.date).getMonth() === new Date().getMonth() &&
				new Date(item.date).getFullYear() === new Date().getFullYear()
			)
		}).reduce((sum, item) => {
			return sum + Number(item.sum)
		},0)

		return sum
	}

	const deleteItem = (type, id) => {
		if(type === 'wallet') {
			const newWallet = wallet.filter((item) => item.id !== id)
			setWallet([...newWallet])
		} else if (type === 'spendings') {
			const newSpendings = spendings.filter((item) => item.id !== id)
			setSpendings([...newSpendings])
		} else if (type === 'moneyBox') { 
			const newMoneyBox = moneyBox.filter((item) => item.id !== id)
			setMoneyBox([...newMoneyBox])
		}
	}

	const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent)
	
	const accumulated = moneyBox.reduce((acc, current) => acc + Number(current.sum), 0)

	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<div className='content'>
					<Route 
						exact 
						path ='/' 
						render = {() => <Home
												balanceNow = {balanceNow()}
												monthMoney = {monthMoney()}
												monthSpendings = {monthSpendings()}
												wallet = {wallet}
												spendings = {spendings}
												accumulated = {accumulated} />} />
					<Route 
							path = '/wallet' 
							render = {() => <Wallet 
													items = {wallet}
													isMobile={isMobile}
													setFunc = {setWallet}
													balanceNow = {balanceNow()}
													monthMoney = {monthMoney()}
													addToItem = {addToItem}
													deleteItem = {deleteItem} />} />
					<Route 
							path = '/spendings' 
							render = {() => <Spendings
													items = {spendings}
													isMobile={isMobile}
													setFunc={setSpendings}
													allSpendings = {allSpendings()}
													monthSpendings = {monthSpendings()}
													addToItem = {addToItem}
													deleteItem = {deleteItem} />} />
					<Route 
							path = '/moneybox' 
							render = {() => <Moneybox
													items = {moneyBox}
													isMobile={isMobile}
													setFunc={setMoneyBox}
													addToItem = {addToItem}
													deleteItem = {deleteItem}
													accumulated = {accumulated} />} />
					<Route 
							path = '/analysis' 
							render = {() => <Analysis
													wallet = {wallet}
													spendings = {spendings} />} />
				</div>					
			</BrowserRouter>
		</div>
	);
	
}

export default App;
