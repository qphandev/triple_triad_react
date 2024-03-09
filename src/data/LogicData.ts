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