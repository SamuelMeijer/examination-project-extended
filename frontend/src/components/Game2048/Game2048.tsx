import React from "react";
import Styles from "./game2048.module.css";

import Tile from "./Tile/Tile";

// TODO: Add logic for user being logged in or not
export default function Game2048() { 
    
    const activeTileList: {value: number, positionX: number, positionY: number }[] = []

    // Generates a new tile with the value 2 on an empty slot.
    const generateTile = () => {
        const tile = {
            value: 2,
            positionX: Math.floor(Math.random() * 4),
            positionY: Math.floor(Math.random() * 4),
        }

        // Check that a tile with that position doesn't already exist
        if (!activeTileList.some((element) => element.positionX === tile.positionX && element.positionY === tile.positionY)) {
            activeTileList.push(tile)
        } else generateTile()
    }
    /* Calling to generate two new tiles (game start)
    generateTile()
    generateTile()
    */

    // TODO: REMOVE! Testing to populate full board
    for (let i= 0; i < 16; i++) {
        generateTile()
    }


    return (
        <div className={Styles.gameGrid}>
            {activeTileList.map((tile, index) => {
                return <Tile key={index} value={tile.value} positionX={tile.positionX} positionY={tile.positionY} />
            })}
        </div>
    )
}