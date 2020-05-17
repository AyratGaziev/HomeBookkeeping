import React from 'react';
import './spendings.css'
import Table from '../wallet-table/table';
import Card from '../card/card';
import yearIcon from '../../icons/year-spendings.png'
import monthIcon from '../../icons/month-spendings.png'
import LineChart from '../line-chart/line-chart';

const Spendings = ({
                    items, 
                    addToItem, 
                    InputValueSet, 
                    itemInputValue, 
                    allSpendings, 
                    monthSpendings, 
                    showDeleteBtn, 
                    deleteBtnStatusChange, 
                    deleteBtnId, 
                    deleteItem}) => {
    return (
        <div className = 'container'>
            <div className = 'spendings__wrapper' >
                <Table
                        items = {items}
                        showDeleteBtn = {showDeleteBtn}
                        deleteBtnStatusChange = {deleteBtnStatusChange}
                        title = 'Расходы'
                        type = 'spendings'
                        typeValue = 'spendingsInputValue'
                        addToItem = {addToItem}
                        itemInputValue = {itemInputValue}
                        InputValueSet = {InputValueSet}
                        deleteBtnId = {deleteBtnId}
                        deleteItem = {deleteItem} />
                <div className = 'spendings__right'>
                    <div className = 'spendings__cards'>
                        <Card 
                                title = 'Потрачено всего'
                                count = {allSpendings}
                                icon = {yearIcon}
                                date = {false} />
                        <Card
                                title = 'Потрачено в этом месяце'
                                count = {monthSpendings}
                                icon = {monthIcon}
                                date = {false} />
                    </div>
                    <LineChart
                                title = 'Затраты'
                                chartName = 'spendingsChart'
                                items = {items} />
                </div>
            </div>
        </div>
    );
}

export default Spendings;
