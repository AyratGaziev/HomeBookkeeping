import React, {useState} from 'react';
import './table.css'

const Table = ({
                type, 
                title, 
                items, 
                addToItem, 
                deleteItem,
                isMobile,
                setFunc,
                twoColumns = false}) => {
   
    const [inputValue, setInputValue] = useState({})
    
    const [delBtnStatus, setDelBtnStatus] = useState({ show: false, id: null })    
        
    const walletInput = (e) => { 
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
            id: Date.now()
        })
    }

    const addWalletItem = () => {
        addToItem(inputValue, twoColumns, setFunc, items)
        if (!twoColumns) {
            setInputValue({...inputValue, sum: '', category: '', date: ''})
        } else if (twoColumns) {
            setInputValue({...inputValue, sum: '', date: ''})
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
                    value = {inputValue.category || ''}
                    required />
        </th>
    ) 

    const showSecondColumn = (row) => twoColumns ? null : row
    
    const placeholder = (<div className='placeholder'>Введите {title.toLowerCase()}</div>)
        
    const tableItems = items.map((item) => {
        const deleteBtn = (delBtnStatus.show || isMobile) ? <span 
                                                onClick = {() => deleteItem(type, item.id)} 
                                                className = 'delete'>&#10006;</span> : <span></span>
                                                
        const idDeleteBtn = (
            (item.id === delBtnStatus.id) || isMobile
        ) ? deleteBtn : null

        const secondContentRow = (
            <td className = 'wallet-table__col'> {item.category} </td>
        )
        return(
            <tr 
                className = 'wallet-table__row' 
                key = {item.id}
                onMouseOver={() => setDelBtnStatus({
                    ...delBtnStatus,
                    show: true,
                    id: item.id
                })}
                onMouseOut = {() => setDelBtnStatus({
                    ...delBtnStatus,
                    show: false,
                    id: item.id
                })} >

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
                                    value = {inputValue.sum || ''}
                                    required />
                        </th>

                        {showSecondColumn(secondInputRow)}
                        
                        <th className = 'wallet-table__headers-col'>
                            <input 
                                    type ='date'
                                    name = 'date'
                                    onChange = {walletInput}
                                    value = {inputValue.date || ''}
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
            {items.length === 0 ? placeholder : null}
        </div>
    );
}

export default Table;
