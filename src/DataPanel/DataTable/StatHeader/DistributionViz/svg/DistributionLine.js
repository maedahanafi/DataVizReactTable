import React from 'react';

class DistributionLine extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const points = this.props.points;
        const renderConst = this.props.renderConst;
        const strokeWidth = renderConst.barWidth <= 0.25 ? renderConst.barWidth / 2 : 0.25;

        return <path d={this.convertPointsToPath(renderConst, points)}
                     style={{
                         'strokeWidth': strokeWidth + 'px',
                         'stroke': 'white',
                         'fill': 'none'
                     }}
        ></path>;
    }


    convertPointsToPath(renderConst, points){
        let path = points && points.length>0?
            'M0,'+renderConst.barChartHeight+' '+
            points.map((pt) =>
                'L'+pt.x + ',' + pt.y + ' ' +
                'L' + (pt.x + renderConst.barWidth) + ',' + pt.y + ' '+
                'V'+ renderConst.barChartHeight+' '
            ).reduce((a, b) => a + b) + ' ' +
            'L'+renderConst.barChartWidth + ','+renderConst.barChartHeight
        :'';

        return path

    }

}

export default DistributionLine;