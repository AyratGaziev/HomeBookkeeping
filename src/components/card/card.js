import React from 'react';
import './card.css'

const Card = ({
                count,
                icon,
                date,
                title }) => {
    const dateNow = date ? new Date().toLocaleDateString() : null
    
    return (
        <div className = 'card'>
            <div className = 'card__text'>
                <div className = 'card__title'> {title} </div>
                <div className = 'card__amount'><span> {count} </span> &#8381;</div>
                <div className = 'card__date'> {dateNow} </div>
            </div>
            <img className = 'card__img' src = {icon} alt = 'card' />
        </div>
    );
}

export default Card;
