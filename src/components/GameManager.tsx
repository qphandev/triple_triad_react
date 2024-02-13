import { useState } from 'react';
import React from 'react';
import { CardData, CardObjType } from '../data/CardData';
import { Card } from './Card';
import '../styles/TripleTriadReact.scss';
import Hand from './Hand';


const CARD_PATH = "./images/cards"; // cards have to be in public/images/cards
const TEST_CARD = CardData[0];

const BOARD = [

]

const PLAYER_HAND = [
    CardData[0],
    CardData[1],
    CardData[2],
    CardData[3],
    CardData[4]
]

export type PlayerHandType = "playerBlueHand" | "playerRedHand";

export interface IClickedItem {
    area: PlayerHandType | "board",
    index: number,
    card: CardObjType
}

function GameManager() {

    const [clickedItem, setClickedItem] = useState<IClickedItem | null>(null);


    function handleClickItem(e: React.MouseEvent<HTMLDivElement>) {
        
        // TODO: omfg holy hell ew ew ew
        const cardId: number = Number(e.currentTarget.dataset.cardid);

        // TODO: Map clicked card to Database... this is... kinda gross
        // This is happening b/c I can only figure out how to pass a string back to the parent
        const cardClicked = CardData.find(card => card.id === cardId);

        console.log(cardClicked);

        /**
         * ACTUALLYY: you can send the hand down, and then just send back up the index of the card in hand clicked and map it with the hand dealt instead of CardData
         */
    }

    return (
        <div className="triple-triad-container">

            {/* Player 1 Hand */}
            <Hand player="playerBlueHand" cards={PLAYER_HAND} score={5} handleClickItem={handleClickItem} />

            {/* BOARD */}
            <div className="board">
                {Array(9).fill(0).map((_, i) => (<div key={i} className="cell">
                    <Card card={TEST_CARD} color="red" />
                </div>))}
            </div>

            {/* Player 2 Hand */}
            <Hand player="playerRedHand" cards={PLAYER_HAND} score={5} />

        </div>
    )
}


export default GameManager