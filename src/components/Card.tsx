import React from "react";
import { CardObjType } from "../data/CardData"
import { IClickedItem } from "./GameManager";
import clsx from "clsx";

const CARD_PATH = "./images/cards"; // cards have to be in public/images/cards

export interface ICardProps {
    card: CardObjType,
    color: "red" | "blue",
    handIndex?: number,
    handleClickItem?: React.MouseEventHandler<HTMLDivElement>,
    className?: string,
}

export function Card({ card,
    color,
    handIndex,
    handleClickItem, 
    className}: ICardProps) {

    const cardImagePath = card.img;

    // TODO: I FORGOT YOU CAN ONLY PASS IN STRINGS TO DATA-ATTRIBUTES
    return (
        <div className={clsx(`card card--${color}-card`, className)}
            data-cardid={card.id}
            data-handindex={handIndex}
            onClick={handleClickItem}>
            <img src={`${CARD_PATH}/${cardImagePath}`} alt="Card" />
        </div>
    )
}