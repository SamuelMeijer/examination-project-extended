import React, { CSSProperties } from 'react';

import Styles from './tile.module.css'

interface tileProps {
    // The tiles value: 0, 2, 4 ... 2048
    value: number,
    // The tiles horistontal position: 0-3
    positionX: number,
    // The tiles vertical position: 0-3
    positionY: number
}

export default function Tile ({value, positionX, positionY}: tileProps) {
    
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
            <p>{value}</p>
        </div>
    )
}