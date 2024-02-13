import { Card } from './Card'
import { IClickedItem, PlayerHandType } from './GameManager'
import { CardObjType } from '../data/CardData'

export interface IHandProps {
    player: PlayerHandType,
    cards: CardObjType[],
    score: number,
    handleClickItem?: React.MouseEventHandler<HTMLDivElement>,
}

function Hand({ player, cards, score, handleClickItem}: IHandProps) {

    const color = player === "playerBlueHand" ? "blue" : "red";

    return (
        <div className="hand">
            {cards.map((card, i) => (
                <Card key={i} card={card} color={color} handleClickItem={handleClickItem} />
            ))}

            {/* SCORE */}
            <div className="score">{score}</div>
        </div>
    )
}

export default Hand