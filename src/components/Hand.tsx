import { Card } from './Card'
import { IClickedItem, PlayerHandType } from './GameManager'
import { CardObjType } from '../data/CardData'
import clsx from 'clsx';

export interface IHandProps {
    player: PlayerHandType,
    cards: (CardObjType | null)[],
    score: number,
    isBlueTurn: boolean,
    focusIndex?: number,
    handleClickItem?: React.MouseEventHandler<HTMLDivElement>,
}

function Hand({ player, cards, isBlueTurn, score, focusIndex, handleClickItem }: IHandProps) {

    const cardColor = player === "playerBlueHand" ? "blue" : "red";
    
    const playerColorTurn = isBlueTurn ? "blue" : "red";
    const isPlayerCardSelected = playerColorTurn === cardColor;

    // If it's not their turn, don't allow them to click cards
    const noClicks = playerColorTurn !== cardColor && 'no-clicks';

    return (
        <div className={clsx('hand', noClicks)}>
            {cards.map((card, i) => (
                card &&
                <div className={clsx('card-container', (focusIndex === i) && isPlayerCardSelected && 'card-container--selected')} 
                key={`${player}-card-${i}`}>
                    <Card 
                        card={card}
                        color={cardColor}
                        handIndex={i}
                        handleClickItem={handleClickItem} />
                </div>
            ))}

            {/* SCORE */}
            <div className="score">{score}</div>
        </div>
    )
}

export default Hand