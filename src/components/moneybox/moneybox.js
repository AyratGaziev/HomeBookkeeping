import React from 'react';
import MoneyBoxTarget from '../money-box-target/money-box-target';
import Table from '../wallet-table/table';
import Card from '../card/card'
import pig from '../../icons/pig.png'
import moneyIcon from '../../icons/money_icon.png'
import LineChart from '../line-chart/line-chart'
import './moneybox.css'

const Moneybox = (props) => {
    const {
        moneyBoxTargetSet,
        moneyBoxTargetValue,
        moneyBoxTargetShow,
        moneyBoxTargetShowSet,
        items,
        showDeleteBtn,
        deleteBtnStatusChange,
        addToItem,
        itemInputValue,
        InputValueSet,
        deleteBtnId,
        deleteItem,
        setAccumulatePeriod,
        accumulatePeriodValue,
        leftToSave,
        accumulated
    } = props

    return (
        <div className = 'container'>
            <div className = 'money-box__row'>
                <div className = 'money-box__col'>
                    <MoneyBoxTarget
                                    moneyBoxTargetSet = {moneyBoxTargetSet}
                                    moneyBoxTargetValue = {moneyBoxTargetValue}
                                    moneyBoxTargetShow = {moneyBoxTargetShow}
                                    moneyBoxTargetShowSet = {moneyBoxTargetShowSet}
                                    accumulatePeriodValue = {accumulatePeriodValue}
                                    setAccumulatePeriod = {setAccumulatePeriod}
                                    leftToSave = {leftToSave} />
                    <Table 
                                    twoColumns = {true}
                                    items = {items}
                                    showDeleteBtn = {showDeleteBtn}
                                    deleteBtnStatusChange = {deleteBtnStatusChange}
                                    title = 'Копилка'
                                    type = 'moneyBox'
                                    typeValue = 'moneyBoxInputValue'
                                    addToItem = {addToItem}
                                    itemInputValue = {itemInputValue}
                                    InputValueSet = {InputValueSet}
                                    deleteBtnId = {deleteBtnId}
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
