import React from 'react';
import Card from '../card/card'
import './home.css'
import balance from '../../icons/balance.png'
import monthIcon from '../../icons/month-spendings.png'
import monthWallet from '../../icons/monthWallet.png'
import pig from '../../icons/pig.png'
import LineChart from '../line-chart/line-chart'

const Home = ({balanceNow, monthSpendings, monthMoney, wallet, spendings, accumulated}) => {
    return (
        <div className='container'>            
            <div className='home__row'>
                <div className='home__cards-col'>
                    <Card
                        title = 'Баланс'
                        count = {balanceNow}
                        icon = {balance}
                        date = {true} />
                    <Card
                        title = 'Потрачено в этом месяце'
                        count = {monthSpendings}
                        icon = {monthIcon}
                        date={false} />
                </div>
                <div className='home__cards-col'>
                    <Card
                        title = 'Пополнения в этом месяце'
                        count = {monthMoney}
                        icon = {monthWallet}
                        date = {false} />
                    <Card
                            title = 'В копилке'
                            count = {accumulated}
                            icon = {pig}
                            date = {false} />                       
                </div>       
            </div>
            <div className = 'home__row'>
                <div className = 'home__col'>
                    <LineChart 
                                items = {wallet}
                                chartName = 'walletChart'
                                title = 'Пополнения' />  
                </div>
                <div className = 'home__col'>
                    <LineChart
                                items = {spendings}
                                chartName = 'spendingsChart'
                                title = 'Затраты' />  
                </div> 
            </div>            
        </div>
    );
}

export default Home;
