import React, { CSSProperties, useState, useEffect } from 'react';

import { TileInterface } from './models/Tile';
import Styles from './tile.module.css'

export default function Tile ({value, positionX, positionY, hasMerged}: TileInterface) {
    const [scale, setScale] = useState<number>(1);

    let dynamicBackgroundColor = ''
    switch (value) {
        case 2:
            dynamicBackgroundColor = '#FFC66C'
            break;
        case 4:
            dynamicBackgroundColor = '#FFC05C'
            break;
        case 8:
            dynamicBackgroundColor = '#FFB947'
            break;
        case 16:
            dynamicBackgroundColor = '#FFB133'
            break;
        case 32:
            dynamicBackgroundColor = '#F78632'
            break;
        case 64:
            dynamicBackgroundColor = '#F68128'
            break;
        case 128:
            dynamicBackgroundColor = '#F57614'
            break;
        case 256:
            dynamicBackgroundColor = '#FF7033'
            break;
        case 512:
            dynamicBackgroundColor = '#FF621F'
            break;
        case 1024:
            dynamicBackgroundColor = '#FF540A'
            break;
        case 2048:
            dynamicBackgroundColor = '#F54900'
            break;
        default:
            dynamicBackgroundColor = '#FDE2C4'
            break;
    }

    const dynamicPositioning = (position:number): number => {
        return 20 + (120 * position) + (20 * position)
    }
    
    // Dynamic styling based on value and positioning
    const tileStyle: CSSProperties = {
        top: `${dynamicPositioning(positionY)}px`,
        left: `${dynamicPositioning(positionX)}px`,
        backgroundColor: `${dynamicBackgroundColor}`,
        transform: `scale(${scale})`
    }

    useEffect(() => {
        // Changing value of scale to make a "flashing"-effect on a tile when merged
        if (hasMerged) {
            setScale(1.1)
            setTimeout(() => setScale(1), 125)
        }
    }, [hasMerged])

    return (
        <div className={Styles.tile} style={tileStyle}>
            <p>{value > 0 ? value : ''}</p>
        </div>
    )
}