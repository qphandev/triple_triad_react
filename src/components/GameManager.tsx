import { useEffect, useState } from 'react';
import React from 'react';
import { CardData, CardObjType } from '../data/CardData';
import { NEIGHBOR_CELLS } from '../data/LogicData';
import { Card } from './Card';
import Hand from './Hand';

import '../styles/TripleTriadReact.scss';

// GAME DEFAULT STATES
const BOARD_CELLS = Array(9).fill(null);
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

export interface ICellState {
    isOccupied: boolean | null,
    color: "blue" | "red",
    flipped: boolean,
    card: CardObjType,
    element: null | "fire" | "water" // etc...
};

export type PlayerHandType = "playerBlueHand" | "playerRedHand";

export interface IClickedItem {
    area: PlayerHandType | "board" | null,
    index: number,
    card: CardObjType
}

function GameManager() {

    const [isBlueTurn, setIsBlueTurn] = useState<boolean>(true);
    const [clickedItem, setClickedItem] = useState<IClickedItem | null>(null);
    const [board, setBoard] = useState<ICellState[]>(BOARD_CELLS);
    const [playerBlueHand, setPlayerBlueHand] = useState<(CardObjType | null)[]>(PLAYER_HAND_BLUE)
    const [playerRedHand, setPlayerRedHand] = useState<(CardObjType | null)[]>(PLAYER_HAND_RED)

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
    }

    // Check empty cell
    function handleBoardClick(e: React.MouseEvent<HTMLDivElement>) {
        const boardCellIndex: number = Number(e.currentTarget.dataset.boardindex);
        const isCardFocused = !!clickedItem;
        const isCellOccupied = board[boardCellIndex]?.isOccupied;

        // if card is focused and clicked item is not in board (a hand item) and board cell is not occupied, add to board
        if (isCardFocused && clickedItem.area !== "board" && clickedItem.area && !isCellOccupied) {
            const clickedCard = clickedItem.card;

            // Create a copy of board
            let newBoardArray = [...board];

            // Remove card from hand
            removeFromHand(clickedItem.index, clickedItem.area);

            // Add card to the board copy
            newBoardArray[boardCellIndex] = {
                ...newBoardArray[boardCellIndex],
                card: clickedCard,
                isOccupied: true,
                color: isBlueTurn ? "blue" : "red"
            };

            // Check neighbors on the board copy
            checkNeighbors(boardCellIndex, clickedCard, newBoardArray);

            // Update the board state with the board copy
            setBoard(newBoardArray);

            // Checks for neighbors
            if (clickedCard) {
                // checkNeighbors(boardCellIndex, clickedCard);
            }

            setClickedItem(null)

            setIsBlueTurn(prev => !prev)
        }
    }

    function checkNeighbors(index: number, placedCard: CardObjType, newBoardArray: ICellState[]) {
        console.log(`Checking neighbors for ${placedCard.name} at index ${index}`)

        // ++2 % 4 is the formula to get the opposite direction
        const neighbors = NEIGHBOR_CELLS[index];

        // FIRST LOOP: goes through neighbors and decides what to do with them
        neighbors.forEach((neighbor, i) => {

            // If we have a neighbor...
            if (neighbor !== null) {
                const neighborCard = newBoardArray[neighbor]?.card;
                if (!neighborCard || !placedCard) return;
                const placedCardStats = placedCard.stats;
                const neighborCardStats = neighborCard.stats;
                const neighborOpposingStat = (i + 2) % 4;

                console.log(`neighborCard: ${neighborCard.name}, placedCardStats: ${placedCardStats}, neighborCardStats: ${neighborCardStats}, oppositeDirection of neighbor: ${neighborOpposingStat} or ${neighborCardStats[neighborOpposingStat]} VS ${placedCardStats[i]}`)

                if (placedCardStats[i] > neighborCardStats[neighborOpposingStat]) {
                    // Directly modify the color of the relevant cell
                    newBoardArray[neighbor].color = isBlueTurn ? "blue" : "red";
                    newBoardArray[neighbor].flipped = true;
                }
                // return newBoardArray;
            }
        })
    }

    /**
     * Add card to board
     * @param boardIndex 
     * @param card 
     * @param cardColor 
     */
    function addToBoard(boardIndex: number, card: CardObjType, cardColor: PlayerHandType) {
        const color = cardColor === "playerBlueHand" ? "blue" : "red";
        const newBoardArray: ICellState[] = board.map((cell, index) => {
            return boardIndex === index ?
                {
                    ...cell,
                    isOccupied: true,
                    color: color,
                    card: card,
                    element: null
                } :
                cell
        })
        // checkNeighbors(boardIndex, card);
        setBoard(newBoardArray);
    }

    /**
     * Remove card from hand
     * @param handIndex 
     * @param playerHand 
     */
    function removeFromHand(handIndex: number, playerHand: PlayerHandType) {
        const currentPlayerHand = playerHand === "playerBlueHand" ? playerBlueHand : playerRedHand;
        const newHandArray = currentPlayerHand.map((cardInHand, index) => {
            return handIndex === index ? null : cardInHand
        })
        if (playerHand === "playerBlueHand") {
            setPlayerBlueHand(newHandArray)
        } else {
            setPlayerRedHand(newHandArray)
        }
    }

    return (
        <div className="triple-triad-container">
            {/* Player 1 Hand */}
            <div className="hand-container">
                <div className="player-turn-indicator">
                    {!isBlueTurn && 'turn'}
                </div>
                <Hand player="playerRedHand"
                    isBlueTurn={isBlueTurn}
                    cards={playerRedHand}
                    score={5}
                    focusIndex={clickedItem?.index}
                    handleClickItem={handleHandClick} />
            </div>

            {/* BOARD */}
            <div className="board">
                {board.map((cell, i) => {
                    return (
                        <div key={i} className="cell" onClick={handleBoardClick} data-boardindex={i}>
                            {cell?.isOccupied && <Card card={cell.card} color={cell.color} />}
                        </div>
                    )
                })}
            </div>

            {/* Player 2 Hand */}
            <div className="hand-container">
                <div className="player-turn-indicator">
                    {isBlueTurn && 'turn'}
                </div>
                <Hand player="playerBlueHand"
                    isBlueTurn={isBlueTurn}
                    cards={playerBlueHand}
                    score={5}
                    focusIndex={clickedItem?.index}
                    handleClickItem={handleHandClick} />
            </div>
        </div>
    )
}

export default GameManager