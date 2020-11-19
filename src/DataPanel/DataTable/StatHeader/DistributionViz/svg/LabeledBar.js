import React from 'react';
import _ from "lodash";

class LabeledBar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const x = this.props.x;
        const renderConst = this.props.renderConst;
        const allLabels = this.props.allLabels;
        const barLabelObjs = this.props.barLabels;
        let visibility = this.props.visibility;

        let barCoorOfLabels = [];
        let nextY = renderConst.barChartHeight;


        for (let label of allLabels) {
            let labelObj = barLabelObjs ? _.find(barLabelObjs, (labelObj) => labelObj.label == label) : undefined;
            if (labelObj) {
                const height = labelObj.count * renderConst.barHeightUnit;
                const coorObj = {
                    'label': labelObj.label,
                    'x': x,
                    'y': nextY-height,
                    'height': height+1,
                    'color': 'blue'
                };
                barCoorOfLabels.push(coorObj);
                nextY = nextY - coorObj.height;
            }
        }

        let barOfLabels = barCoorOfLabels.map((coorObj) =>
            <rect key={'bar-' + coorObj.label}
                  className='bar'
                  y={coorObj.y}
                  x={coorObj.x}
                  height={coorObj.height}
                  width={renderConst.barWidth}
                  style={{'fill': coorObj.color}}
                  visibility={visibility}
            >
            </rect>
        );

        return <g>

            {barOfLabels}

        </g>;
    }
}

export default LabeledBar;