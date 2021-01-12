import React from 'react';
import './table.css'

const Table = ({
                    type, 
                    title, 
                    typeValue, 
                    items, 
                    addToItem, 
                    itemInputValue, 
                    InputValueSet, 
                    deleteBtnStatusChange, 
                    showDeleteBtn, 
                    deleteBtnId, 
                    deleteItem, 
                    twoColumns = false}) => {
        
    const walletInput = (e) => {        
        InputValueSet(typeValue, e.target.name, e.target.value)
    }

    const addWalletItem = () => {
        addToItem(type, itemInputValue, twoColumns)
        if(!twoColumns) {
            InputValueSet(typeValue, 'sum', '')
            InputValueSet(typeValue, 'category', '')
            InputValueSet(typeValue, 'date', '')
        } else if (twoColumns) {
            InputValueSet(typeValue, 'sum', '')
            InputValueSet(typeValue, 'date', '')
        }
        
    }

    const secondTitleRow = (
        <th className = 'wallet-table__headers-col'>
            <span>Вид</span>
        </th>
    )
    
    const secondInputRow = (
        <th className = 'wallet-table__headers-col'>
            <input 
                    type ='text'
                    placeholder = 'Категория'
                    name = 'category'
                    onChange = {walletInput}
                    value = {itemInputValue.category}
                    required />
        </th>
    ) 

    const showSecondColumn = (row) =>  twoColumns ? null : row
        
    const tableItems = items.map((item) => {
        const deleteBtn = showDeleteBtn ? <span 
                                                onClick = {() => deleteItem(type, item.id)} 
                                                className = 'delete'>&#10006;</span> : <span></span>
        const idDeleteBtn = item.id === deleteBtnId ? deleteBtn : null
        const secondContentRow = (
            <td className = 'wallet-table__col'> {item.category} </td>
        )
        return(
            <tr 
                className = 'wallet-table__row' 
                key = {item.id}
                onMouseOver = {() => deleteBtnStatusChange('true', item.id)}
                onMouseOut = {() => deleteBtnStatusChange('false', item.id)} >

                    <td className = 'wallet-table__col'> {item.sum} </td>

                    {showSecondColumn(secondContentRow)}

                    <td className = 'wallet-table__col'> {item.date} {idDeleteBtn} </td>

            </tr>
        )
    })

    return (
        <div className = 'wallet-table'>
            <div className = 'wallet-table__title'>{title}</div>
            <table className = 'wallet-table__content'>
                <thead className = 'wallet-table__headers'>
                    <tr className = 'wallet-table__headers-row'>
                        <th className = 'wallet-table__headers-col'>
                            <span>Сумма</span>
                            <span><i className="fas fa-sort-amount-up-alt"></i></span>
                        </th>
                        
                        {showSecondColumn(secondTitleRow)}

                        <th className = 'wallet-table__headers-col'>
                            <span>Дата</span>
                        </th>
                    </tr >
                    <tr className = 'wallet-table__headers-row'>
                        <th className = 'wallet-table__headers-col'>
                            <input 
                                    type ='text'
                                    placeholder = 'Сумма'
                                    name = 'sum'
                                    onChange = {walletInput}
                                    value = {itemInputValue.sum}
                                    required />
                        </th>

                        {showSecondColumn(secondInputRow)}
                        
                        <th className = 'wallet-table__headers-col'>
                            <input 
                                    type ='date'
                                    name = 'date'
                                    onChange = {walletInput}
                                    value = {itemInputValue.date}
                                    required />
                            <button
                                    onClick = {addWalletItem} >+</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
