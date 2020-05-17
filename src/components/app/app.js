import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './app.css';
import Header from '../header/header';
import Wallet from '../wallet/wallet'
import Spendings from '../spendings/spendings'
import Moneybox from '../moneybox/moneybox'
import Analysis from '../analysis/analysis'
import Home from '../home/home'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accumulatePeriodValue: 6,
			showDeleteBtn: true,
			deleteBtnId: null,
			selected: null,
			moneyBox: [
				{sum: 2500, date: '2020-05-10', id: 37},
				{sum: 246, date: '2020-05-05', id: 38},
				{sum: 343, date: '2020-05-02', id: 39},
				{sum: 6577, date: '2020-05-03', id: 40},
				{sum: 234, date: '2020-05-01', id: 41},
			],
			moneyBoxInputValue: {
				sum: '', 
				date: '',
			},
			moneyBoxTargetValue: {
				target: 'Велосипед',
				sum: '16500'
			},
			moneyBoxTargetShow: false,
			walletInputValue: {
				sum: '',
				category: '',
				date: ''
			},
			wallet: [
				{sum: 24000, category: 'Зарплата', date: '2020-04-14', id: 1},
				{sum: 16000, category: 'Аванс', date: '2020-04-18', id: 2},
				{sum: 4500, category: 'Продажа Авито', date: '2020-04-25', id: 3},
				{sum: 17500, category: 'Аванс', date: '2020-03-14', id: 5},
				{sum: 26500, category: 'Зарплата', date: '2020-03-12', id: 6},
				{sum: 5800, category: 'Продажа Авито', date: '2020-03-25', id: 9},
				{sum: 24500, category: 'Зарплата', date: '2020-02-28', id: 10},
				{sum: 17850, category: 'Аванс', date: '2020-02-14', id: 11}
			],
			spendingsInputValue: {
				sum: '',
				category: '',
				date: ''
			},
			spendings: [
				{sum: 4500, category: 'Продукты', date: '2020-04-14', id: 13},
				{sum: 4350, category: 'Хозтовары', date: '2020-04-18', id: 14},
				{sum: 3505, category: 'Квартплата', date: '2020-04-25', id: 15},
				{sum: 2500, category: 'Бензин', date: '2020-04-28', id: 16},
				{sum: 1850, category: 'Запчасти', date: '2020-03-14', id: 17},
				{sum: 15000, category: 'Стройматериалы', date: '2020-03-12', id: 18},
				{sum: 2300, category: 'Бензин', date: '2020-02-26', id: 19},
				{sum: 1550, category: 'Продукты', date: '2020-01-18', id: 20},
				{sum: 2850, category: 'Квартплата', date: '2020-03-25', id: 21},
				{sum: 8500, category: 'Продукты', date: '2020-02-28', id: 22},
				{sum: 1650, category: 'Хозтовары', date: '2020-02-14', id: 23},
				{sum: 3550, category: 'Продукты', date: '2020-01-12', id: 24},
				{sum: 4500, category: 'Продукты', date: '2020-03-05', id: 25},
				{sum: 4350, category: 'Хозтовары', date: '2020-02-12', id: 26},
				{sum: 3505, category: 'Квартплата', date: '2020-03-23', id: 27},
				{sum: 2500, category: 'Бензин', date: '2020-03-19', id: 28},
				{sum: 1850, category: 'Запчасти', date: '2020-02-10', id: 29},
				{sum: 15000, category: 'Стройматериалы', date: '2020-03-09', id: 30},
				{sum: 2300, category: 'Бензин', date: '2020-02-18', id: 31},
				{sum: 1550, category: 'Продукты', date: '2020-01-08', id: 32},
				{sum: 2850, category: 'Квартплата', date: '2020-03-05', id: 33},
				{sum: 8500, category: 'Продукты', date: '2020-02-08', id: 34},
				{sum: 1650, category: 'Хозтовары', date: '2020-04-07', id: 35},
				{sum: 3550, category: 'Продукты', date: '2020-02-17', id: 36}
			]			
		};
	}

	onSelect = (item) => {
		this.setState({
			selected: item
		})
	}

	addToItem = (item, Input, twoColumns) => {

		if(twoColumns) {
			const {sum, date, id} = Input
			if(!sum || !date || isNaN(sum)) {
				return
			}
			this.setState((state) => {
				const Item = {sum, date, id}
				const newItem = [...state[item], Item]
				return {
					[item]: newItem
				}
			})

		} else {
			const {sum, category, date, id} = Input
			if(!sum || !category || !date || isNaN(sum)) {
				return
			}
			this.setState((state) => {
				const Item = {sum, category, date, id}
				const newItem = [...state[item], Item]
				return {
					[item]: newItem
				}
			})
		}
	}	
	InputValueSet = (item, name, value) => {
		return (
			this.setState((state) => {
				return {
					[item]: {
						...state[item],
						id: Date.now(),
						[name]: value
					}
				}
			})
		)
	}

	balanceNow = () => {

		const {wallet, spendings} = this.state

		const balanceAll = wallet.reduce((sum, item) => {
			return sum + Number(item.sum)
		},0)
	
		const spendingsAll = spendings.reduce((acc, spend) => {
			return acc + Number(spend.sum)
		},0)
	
		return balanceAll - spendingsAll
	}

	monthMoney = () => {

		const {wallet} = this.state
		if(wallet.sum === 0) {return}

		const sum = wallet.filter((item) => {
			return new Date(item.date).getMonth() === new Date().getMonth()
		}).reduce((sum, item) => {
			return sum + Number(item.sum)
		},0)

		return sum
	}

	allSpendings = () => {

		const {spendings} = this.state

		return spendings.reduce((sum, value) => sum + Number(value.sum), 0)
	}

	monthSpendings = () => {

		const {spendings} = this.state

		if(spendings.sum === 0) {return}

		const sum = spendings.filter((item) => {
			return new Date(item.date).getMonth() === new Date().getMonth()
		}).reduce((sum, item) => {
			return sum + Number(item.sum)
		},0)

		return sum
	}

	deleteBtnStatusChange = (status, id) => {
		if(status === 'true') {
			this.setState({
				showDeleteBtn: true,
				deleteBtnId: id
			})
		} else {
			this.setState({
				showDeleteBtn: false
			})
		}
	}

	deleteItem = (type, id) => {
		if(type === 'wallet') {
			const newWallet = this.state.wallet.filter((item) => item.id !== id)
			this.setState({
				wallet: newWallet
			})
		} else if (type === 'spendings') {
			const newSpendings = this.state.spendings.filter((item) => item.id !== id)
			this.setState({
				spendings: newSpendings
			})
		} else if (type === 'moneyBox') { 
			const newMoneyBox = this.state.moneyBox.filter((item) => item.id !== id)
			this.setState({
				moneyBox: newMoneyBox
			})
		}
	}

	moneyBoxTargetSet = (name, value) => {
		this.setState((state) => {
			return {
				moneyBoxTargetValue: {
					...state.moneyBoxTargetValue,
					[name]: value
				}
			}
		})		
	}

	moneyBoxTargetShowSet = () => {
		if (!this.state.moneyBoxTargetValue.target || !this.state.moneyBoxTargetValue.sum) {return}
		this.setState((state) => {
			return {
				moneyBoxTargetShow: !state.moneyBoxTargetShow
			}
		})
	}

	setAccumulatePeriod = (period) => {
		this.setState({
			accumulatePeriodValue: period
		})
	}

	
	render() {

		const {
			selected, 
			wallet, 
			walletInputValue, 
			spendingsInputValue, 
			spendings, 
			showDeleteBtn,
			deleteBtnId, 
			moneyBoxTargetValue, 
			moneyBoxTargetShow,
			moneyBox,
			moneyBoxInputValue,
			accumulatePeriodValue
		} = this.state

		const balanceNow = this.balanceNow()
		const monthMoney = this.monthMoney()
		const allSpendings = this.allSpendings()
		const monthSpendings = this.monthSpendings()

		
		const accumulated = moneyBox.reduce((acc, current) => acc + Number(current.sum), 0)

		const leftToSave = moneyBoxTargetValue.sum - accumulated

		return (
			<div className="app">
				<BrowserRouter>
					<Header 
							onSelect = {this.onSelect}
							selected = {selected} />
					<Route 
							exact 
							path ='/' 
							render = {() => <Home
													balanceNow = {balanceNow}
													monthMoney = {monthMoney}
													monthSpendings = {monthSpendings}
													wallet = {wallet}
													spendings = {spendings}
													accumulated = {accumulated} />} />
					<Route 
							path = '/wallet' 
							render = {() => <Wallet 
													items = {wallet}
													deleteBtnStatusChange = {this.deleteBtnStatusChange}
													showDeleteBtn = {showDeleteBtn}
													balanceNow = {balanceNow}
													monthMoney = {monthMoney}
													spendings = {spendings}
													addToItem = {this.addToItem}
													InputValueSet = {this.InputValueSet}
													itemInputValue = {walletInputValue}
													deleteBtnId = {deleteBtnId}
													deleteItem = {this.deleteItem} />} />
					<Route 
							path = '/spendings' 
							render = {() => <Spendings
													items = {spendings}
													showDeleteBtn = {showDeleteBtn}
													deleteBtnStatusChange = {this.deleteBtnStatusChange}
													allSpendings = {allSpendings}
													monthSpendings = {monthSpendings}
													addToItem = {this.addToItem}
													InputValueSet = {this.InputValueSet}
													itemInputValue = {spendingsInputValue}
													deleteBtnId = {deleteBtnId}
													deleteItem = {this.deleteItem} />} />
					<Route 
							path = '/moneybox' 
							render = {() => <Moneybox
													moneyBoxTargetSet = {this.moneyBoxTargetSet}
													moneyBoxTargetValue = {moneyBoxTargetValue}
													moneyBoxTargetShow = {moneyBoxTargetShow}
													moneyBoxTargetShowSet = {this.moneyBoxTargetShowSet}
													items = {moneyBox}
													showDeleteBtn = {showDeleteBtn}
													deleteBtnStatusChange = {this.deleteBtnStatusChange}
													addToItem = {this.addToItem}
													InputValueSet = {this.InputValueSet}
													itemInputValue = {moneyBoxInputValue}
													deleteBtnId = {deleteBtnId}
													deleteItem = {this.deleteItem}
													setAccumulatePeriod = {this.setAccumulatePeriod}
													accumulatePeriodValue = {accumulatePeriodValue}
													accumulated = {accumulated}
													leftToSave = {leftToSave} />} />
					<Route 
							path = '/analysis' 
							render = {() => <Analysis
													wallet = {wallet}
													spendings = {spendings} />} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
