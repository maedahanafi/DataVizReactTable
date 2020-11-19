import React from 'react';
import _ from "lodash";
import LabeledBar from "./LabeledBar";

class HoveredBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const onHoverPoint = this.props.onHoverPoint;
        const renderConst = this.props.renderConst;
        const allLabels = this.props.allLabels;

        let barOfLabels = onHoverPoint? <LabeledBar
            x={onHoverPoint.x}
            renderConst={renderConst}
            allLabels={allLabels}
            barLabels={onHoverPoint.labels}
            visibility={renderConst.isVizOnHover() ? 'visible' : 'hidden'}
        ></LabeledBar>:'';


        return <g>

            {barOfLabels}

        </g>;
    }
}

export default HoveredBar;