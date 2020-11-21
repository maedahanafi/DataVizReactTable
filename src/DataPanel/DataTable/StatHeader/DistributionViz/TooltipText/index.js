import React from 'react';
import './index.scss';
import _ from 'lodash';

class TooltipText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const renderConst = this.props.renderConst;
        const onHoverPoint = this.props.onHoverPoint;

        return <span
            className='tooltip-text'
            style={{
                visibility: renderConst.isVizOnHover() ? 'visible' : 'hidden',
                left: onHoverPoint ? onHoverPoint.x + renderConst.barWidth : 0
            }}
        >
            {onHoverPoint ? <span>{'Value: ' + onHoverPoint.dataValue}</span> : ''}
            {onHoverPoint ? <span>{'Count: ' + onHoverPoint.count}</span> : ''}
        </span>;
    }
}

export default TooltipText;