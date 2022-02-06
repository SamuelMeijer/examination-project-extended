import React, { CSSProperties } from 'react';

import Styles from './tile.module.css'

interface tileProps {
    // 0, 2, 4 ... 2048
    value: number,
    // The tiles horistontal position 0-3
    positionX: number,
    // The tiles vertical position 0-3
    positionY: number
}

export default function Tile ({value, positionX, positionY}: tileProps) {

    const tileStyle: CSSProperties = {
        top: `${20 + (120 * positionY) + (20 * positionY)}px`,
        left: `${20 + (120 * positionX) + (20 * positionX)}px`
    }

    return (
        <div className={Styles.tile} style={tileStyle}>
            <p>{value}</p>
        </div>
    )
}