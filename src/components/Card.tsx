import React from "react";
import { CardObjType } from "../data/CardData"
import { IClickedItem } from "./GameManager";

const CARD_PATH = "./images/cards"; // cards have to be in public/images/cards

export interface ICardProps {
    card: CardObjType,
    color: "red" | "blue",
    handleClickItem?: React.MouseEventHandler<HTMLDivElement>,
}

export function Card({ card, color, handleClickItem }: ICardProps) {

    const cardImagePath = card.img;

    // TODO: I FORGOT YOU CAN ONLY PASS IN STRINGS TO DATA-ATTRIBUTES
    return (
        <div className={`card card--${color}-card`} data-cardid={card.id} onClick={handleClickItem}>
            <img src={`${CARD_PATH}/${cardImagePath}`} alt="Card" />
        </div>
    )
}