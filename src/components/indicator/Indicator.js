import React from 'react';
import './Indicator.scss';

const Indicator = (props) => {

    const {side, top, click, show} = props;

    return (
        <div>
            {side === 'left' && show ?
                <div onClick={() => click('left')} className='Indicator' style={{left: '5vw', top: `${top}`}}>
                    <i className='fas fa-arrow-left'></i>
                </div>
                : null}
            {side === 'right' && show ?
                <div onClick={() => click('right')} className='Indicator' style={{left: '95vw', top: `${top}`}}>
                    <i className='fas fa-arrow-right'></i>
                </div>
                : null}
        </div>
    )
}

export default Indicator;