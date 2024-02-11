/**
 * Going by stats: up, right, down, left.
 * Id base on order of levels.
 */

export type CardObjType = {
    id: number,
    name: string,
    stats: number[],
    element: "fire" | "water" | "lightning" | "rock" | null,
    img: string,
}

export const CardData: CardObjType[] = [
    // Level 1 Cards
    {
        id: 0,
        name: "Geezard",
        stats: [1, 4, 1, 5],
        element: null,
        img: "Geezard.png",
    },
    {
        id: 1,
        name: "Funguar",
        stats: [5, 3, 1, 1],
        element: null,
        img: "Funguar.png",
    },
    {
        id: 2,
        name: "Bite Bug",
        stats: [1, 3, 3, 5],
        element: null,
        img: "Bite Bug.png",
    },
    {
        id: 3,
        name: "Red Bat",
        stats: [6, 1, 1, 2],
        element: null,
        img: "Red Bat.png",
    },
    {
        id: 4,
        name: "Blobra",
        stats: [2, 3, 1, 5],
        element: null,
        img: "Blobra.png",
    },
    {
        id: 5,
        name: "Gayla",
        stats: [2, 1, 4, 4],
        element: "lightning",
        img: "Gayla.png",
    },
    {
        id: 6,
        name: "Gesper",
        stats: [1, 5, 4, 1],
        element: null,
        img: "Gesper.png",
    },
    {
        id: 7,
        name: "Fastitocalon-F",
        stats: [3, 5, 2, 1],
        element: "rock",
        img: "Fastitocalon-F.png",
    },
    {
        id: 8,
        name: "Blood Soul",
        stats: [2, 1, 6, 1],
        element: null,
        img: "Blood Soul.png",
    },
    {
        id: 9,
        name: "Caterchipillar",
        stats: [4, 2, 4, 3],
        element: null,
        img: "Caterchipillar.png",
    },
    {
        id: 10,
        name: "Cockatrice",
        stats: [2, 1, 2, 6],
        element: "lightning",
        img: "Cockatrice.png",
    },
]