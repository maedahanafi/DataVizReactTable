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
        const allLabels = this.props.allLabels;

        let labelInfoSpans = [];
        /*for(let label of allLabels){
            let labelInd = _.findIndex(
                onHoverPoint?onHoverPoint.labels:[],
                (ptLabel)=>ptLabel.label==label
            );
            if(labelInd!=-1){
                let labelObj = onHoverPoint.labels[labelInd];
                labelInfoSpans.push(
                    <span key={'tooltip-label-' + labelInd}>
                        <LabelLegend label={labelObj.label}></LabelLegend>
                        { ' ' + (labelObj.count )}
                    </span>
                );
            }
        }

        labelInfoSpans = _.reverse(labelInfoSpans);*/

        return <span
            className='tooltip-text'
            style={{
                visibility: renderConst.isVizOnHover() ? 'visible' : 'hidden',
                left: onHoverPoint ? onHoverPoint.x + renderConst.barWidth : 0
            }}
        >
            {onHoverPoint ? <span>{'Value: ' + onHoverPoint.desc}</span> : ''}
            {onHoverPoint ? <span>{'Count: ' + onHoverPoint.count}</span> : ''}
            {labelInfoSpans}
        </span>;
    }
}

export default TooltipText;