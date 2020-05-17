import React from 'react';
import './money-box-target.css'

const MoneyBoxTarget = (props) => {

    const {
            moneyBoxTargetSet, 
            moneyBoxTargetValue, 
            moneyBoxTargetShow, 
            moneyBoxTargetShowSet,
            accumulatePeriodValue,
            setAccumulatePeriod,
            leftToSave
        } = props
    
    const everyMonth = (leftToSave/accumulatePeriodValue).toFixed(2)

    const targetInputSet = (e) => {
        moneyBoxTargetSet(e.target.name, e.target.value)
    }
    
    const targetInput = (
        <div className = 'money-box-target__wrapp'>
            <input 
                    className = 'money-box-target__target'
                    placeholder = 'Цель'
                    name = 'target'
                    value = {moneyBoxTargetValue.target}
                    onChange = {targetInputSet} />
            <input 
                    className = 'money-box-target__sum'
                    placeholder = 'Сумма'
                    name = 'sum'
                    value = {moneyBoxTargetValue.sum}
                    onChange = {targetInputSet} />
            <button 
                    className = 'money-box-target__ok'
                    onClick = {() => moneyBoxTargetShowSet()} >&#10004;</button>
        </div>
    )

    const targetInputValue = (
        <div 
            className = 'money-box-target__target'
            onClick = {() => moneyBoxTargetShowSet()} >
            <span> {moneyBoxTargetValue.target} </span>
            <span> {moneyBoxTargetValue.sum} &#8381; </span>
        </div>
    )

    const showTarget = moneyBoxTargetShow ? targetInputValue : targetInput

    return (
        <div className = 'money-box-target'>
            <div className = 'money-box-target__title'>На что копим ?</div>
            {showTarget}
            <div className = 'money-box-target__period'>
                <span className = 'money-box-target__subtitle'>Период накоплений:</span> 
                <input 
                        name = 'period' 
                        onChange = {() => {setAccumulatePeriod(6)}}
                        className = 'checkbox-radio-input'
                        value = '6' 
                        type = 'radio'
                        checked = {accumulatePeriodValue === 6}
                        id = 'six' />
                
                <label 
                        className = 'checkbox-radio-label'
                        htmlFor = 'six' >6 мес.</label>
                <input 
                        name = 'period' 
                        onChange = {() => {setAccumulatePeriod(12)}}
                        className = 'checkbox-radio-input'
                        value = '12' 
                        type = 'radio'
                        checked = {accumulatePeriodValue === 12}
                        id = 'one-year' />
                
                <label 
                        className = 'checkbox-radio-label'
                        htmlFor = 'one-year' >1 год</label>
                <input 
                        name = 'period' 
                        onChange = {() => {setAccumulatePeriod(24)}}
                        className = 'checkbox-radio-input'
                        value = '24' 
                        type = 'radio'
                        checked = {accumulatePeriodValue === 24}
                        id = 'two-year' />
                        
                <label 
                        className = 'checkbox-radio-label'
                        htmlFor = 'two-year' >2 года</label>
            </div>
            <div className = 'money-box-target__amount'>
                <span className = 'money-box-target__subtitle'>До достижения цели:</span>
                <span className = 'money-box-target__count'> {leftToSave} &#8381;</span>
            </div>
            <div className = 'money-box-target__month-amount'>
                <span className = 'money-box-target__subtitle'>Ежемесячный вклад:</span>
                <span className = 'money-box-target__count'> {everyMonth} &#8381;</span>
            </div>
        </div>
    );
}

export default MoneyBoxTarget;
