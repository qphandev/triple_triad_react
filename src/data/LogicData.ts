/** 
 * A mapping of the cell's index when placed on the board to the indices of the cells that are adjacent to it.
 * Top, right, bottom, left
 * null means there's no cell in that direction
 */
export const NEIGHBOR_CELLS = [
    [null, 1, 3, null], // cell 0
    [null, 2, 4, 0], // cell 1
    [null, null, 5, 1], // cell 2
    [0, 4, 6, null], // cell 3
    [1, 5, 7, 3], // cell 4
    [2, null, 8, 4], // cell 5
    [3, 7, null, null], // cell 6
    [4, 8, null, 6], // cell 7
    [5, null, null, 7] // cell 8
];

// if a card is placed on the board, look for its placed index, map that to its neighbors, and then compare the card's stats to the neighbors by doing the following:
// 1. If the neighbor's card is null, do nothing
// 2. If the neighbor's card is not null, compare the stats of the cards,
// Each card's stats is [up, right, down, left], if a card is placed and has a RIGHT neighbor, compare the placed card's RIGHT stat to the neighbor's LEFT stat
// If the placed card's RIGHT stat is higher than the neighbor's LEFT stat, flip the neighbor's card to the placed card's color
// help me write the above in code