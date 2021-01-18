import React, {useState, useEffect} from 'react';
import MoneyBoxTarget from '../money-box-target/money-box-target';
import Table from '../wallet-table/table';
import Card from '../card/card'
import pig from '../../icons/pig.png'
import moneyIcon from '../../icons/money_icon.png'
import LineChart from '../line-chart/line-chart'
import './moneybox.css'

const Moneybox = ({
                    items,
                    isMobile,
                    addToItem,
                    setFunc,
                    deleteItem,
                    accumulated
                }) => {

    const [moneyBoxTarget, setMoneyBoxTarget] = useState({
        target: '',
        sum: '',
        show: true,
        period: 6
    })

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('moneyBoxTarget')) === null) return
        setMoneyBoxTarget(JSON.parse(localStorage.getItem('moneyBoxTarget')))
    }, [])

    useEffect(() => {
        localStorage.setItem("moneyBoxTarget", JSON.stringify(moneyBoxTarget))        
    }, [moneyBoxTarget])

    const leftToSave = moneyBoxTarget.sum - accumulated
    
    return (
        <div className = 'container'>
            <div className = 'money-box__row'>
                <div className = 'money-box__col'>
                    <MoneyBoxTarget
                                    setMoneyBoxTarget ={setMoneyBoxTarget}
                                    leftToSave = {leftToSave}
                                    moneyBoxTarget = {moneyBoxTarget} />
                    <Table 
                                    twoColumns = {true}
                                    items={items}
                                    isMobile = {isMobile}
                                    title = 'Накопления'
                                    type = 'moneyBox'
                                    typeValue = 'moneyBoxInputValue'
                                    addToItem = {addToItem}
                                    setFunc = {setFunc}
                                    deleteItem = {deleteItem} />
                </div>
                <div className = 'money-box__col'>
                    <div className = 'money-box__cards'>
                        <Card
                                        title = 'В копилке'
                                        count = {accumulated}
                                        icon = {pig}
                                        date = {false} />
                        <Card
                                        title = 'Осталось накопить'
                                        count = {leftToSave}
                                        icon = {moneyIcon}
                                        date = {false} />
                    </div>
                    <LineChart 
                                items = {items}
                                chartName = 'walletChart'
                                title = 'Динамика накоплений' />  
                </div>
            </div>
        </div>
    );
}

export default Moneybox;
