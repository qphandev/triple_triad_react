import { CardObjType } from "../data/CardData"

const CARD_PATH = "./images/cards"; // cards have to be in public/images/cards

export interface ICardProps {
    card: CardObjType,
    color: "red" | "blue"
}

export function Card({ card, color }: ICardProps) {

    const cardImagePath = card.img;

    return (
        <div className={`card card--${color}-card`}>
            <img src={`${CARD_PATH}/${cardImagePath}`} alt="Card" />
        </div>
    )
}