import { useState } from 'react';
import React from 'react';
import { CardData, CardObjType } from '../data/CardData';
import { Card } from './Card';
import '../styles/TripleTriadReact.scss';
import Hand from './Hand';


const CARD_PATH = "./images/cards"; // cards have to be in public/images/cards
const TEST_CARD = CardData[0];

const BOARD_CELLS = Array(9).fill(false);

const PLAYER_HAND_BLUE = [
    CardData[6],
    CardData[7],
    CardData[8],
    CardData[9],
    CardData[10]
]

const PLAYER_HAND_RED = [
    CardData[0],
    CardData[1],
    CardData[6],
    CardData[3],
    CardData[5]
]

export type CellStateType = "empty" | "card" | "element";

export type PlayerHandType = "playerBlueHand" | "playerRedHand";

export interface IClickedItem {
    area: PlayerHandType | "board" | null,
    index: number ,
    card: CardObjType
}

function GameManager() {

    const [isBlueTurn, setIsBlueTurn] = useState<boolean>(true);

    const [clickedItem, setClickedItem] = useState<IClickedItem | null>(null);

    function handleHandClick(e: React.MouseEvent<HTMLDivElement>) {

        const cardId: number = Number(e.currentTarget.dataset.cardid);
        const handIndex: number = Number(e.currentTarget.dataset.handindex);

        // TODO: Map clicked card to Database... this is... kinda gross
        // This is happening b/c I can only figure out how to pass a string back to the parent
        const cardClicked = CardData.find(card => card.id === cardId);

        if (cardClicked) {
            setClickedItem(
                {
                    area: isBlueTurn ? "playerBlueHand" : "playerRedHand",
                    index: handIndex,
                    card: cardClicked
                }
            )
        }
        
        console.log(clickedItem?.area);

        /**
         * ACTUALLYY: you can send the hand down, and then just send back up the index of the card in hand clicked and map it with the hand dealt instead of CardData
         */
    }

    function handleBoardClick(e: React.MouseEvent<HTMLDivElement>) {
        const boardCellIndex: number = Number(e.currentTarget.dataset.boardindex);
        console.log(`${boardCellIndex} index was clicked on Board!`)
    }

    return (
        <div className="triple-triad-container">

            {/* Player 1 Hand */}
            <Hand player="playerRedHand"
                isBlueTurn={isBlueTurn}
                cards={PLAYER_HAND_RED}
                score={5}
                focusIndex={clickedItem?.index}
                handleClickItem={handleHandClick} />

            {/* BOARD */}
            <div className="board">
                {BOARD_CELLS.map((cell, i) => {

                    return (
                        <div key={i} className="cell" onClick={handleBoardClick} data-boardindex={i}>

                        </div>
                    )
                })}
            </div>

            {/* Player 2 Hand */}
            <Hand player="playerBlueHand"
                isBlueTurn={isBlueTurn}
                cards={PLAYER_HAND_BLUE}
                score={5}
                focusIndex={clickedItem?.index}
                handleClickItem={handleHandClick} />

        </div>
    )
}


export default GameManager