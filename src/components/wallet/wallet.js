import React from 'react';
import Table from '../wallet-table/table';
import './wallet.css'
import Card from '../card/card';
import LineChart from '../line-chart/line-chart';
import balance from '../../icons/balance.png'
import monthWallet from '../../icons/monthWallet.png'

const Wallet = ({items, addToItem, InputValueSet, itemInputValue, balanceNow, monthMoney, showDeleteBtn, deleteBtnStatusChange, deleteBtnId, deleteItem}) => {
    return (
        <div className = 'container'>
            <div className = 'wallet__wrapper' >
                <Table 
                            items = {items}
                            deleteBtnStatusChange = {deleteBtnStatusChange}
                            showDeleteBtn = {showDeleteBtn}
                            title = 'Доходы'
                            type = 'wallet'
                            typeValue = 'walletInputValue'
                            addToItem = {addToItem}
                            itemInputValue = {itemInputValue}
                            InputValueSet = {InputValueSet}
                            deleteBtnId = {deleteBtnId}
                            deleteItem = {deleteItem} />
                <div className = 'wallet__right'>
                    <div className = 'wallet__cards' >
                        <Card
                                title = 'Баланс'
                                count = {balanceNow}
                                icon = {balance}
                                date = {true} />
                        <Card
                                title = 'Пополнения в этом месяце'
                                count = {monthMoney}
                                icon = {monthWallet}
                                date = {false} />
                    </div>
                    <LineChart 
                                items = {items}
                                chartName = 'walletChart'
                                title = 'Пополнения' />
                </div>
            </div>
        </div>
    );
}

export default Wallet;
