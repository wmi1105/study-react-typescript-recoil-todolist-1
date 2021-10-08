import React from 'react';
import { useRecoilValue } from 'recoil';
import { cardState, CardTypes } from '../store/TodoState';
import Card from './card/Card';

function CardList() {
    const cards = useRecoilValue<CardTypes[]>(cardState);
    return (
        <div>
            {cards.map(card => {
                const {cardId} = card;
                return <Card key={cardId} cardId={cardId} />
            })}
        </div>
    );
}

export default CardList;