import React, { CSSProperties } from 'react';

import { TileInterface } from './models/Tile';
import Styles from './tile.module.css'

export default function Tile ({value, positionX, positionY}: TileInterface) {
    
    const dynamicPositioning = (position:number): number => {
        return 20 + (120 * position) + (20 * position)
    }
    
    // Dynamic positioning
    const tileStyle: CSSProperties = {
        top: `${dynamicPositioning(positionY)}px`,
        left: `${dynamicPositioning(positionX)}px`
    }

    return (
        <div className={Styles.tile} style={tileStyle}>
            <p>{value > 0 ? value : ''}</p>
        </div>
    )
}