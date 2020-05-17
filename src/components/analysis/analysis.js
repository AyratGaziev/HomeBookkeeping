import React from 'react';
import PieChart from '../pie-chart/pie-chart';
import './analysis.css'

const Analysis = ({wallet, spendings}) => {
    return (
        <div className = 'container'>
            <div className = 'analysis__row'>

                <div className = 'analysis__col'>

                    <PieChart
                            title = {'Анализ пополнений'}
                            items = {wallet}
                            chartName = 'walletAnalysis' />

                </div>

                <div className = 'analysis__col'>

                    <PieChart
                            title = {'Анализ затрат'}
                            items = {spendings}
                            chartName = 'spendingsAnalysis' />

                </div>

            </div>
        </div>
    );
}

export default Analysis;
