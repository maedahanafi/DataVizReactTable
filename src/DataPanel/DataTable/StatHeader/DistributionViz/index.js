import React from 'react';
import './index.scss';
import _ from 'lodash';
import DistributionLine from './svg/DistributionLine';
import TooltipText from "./TooltipText/index";

class DistributionViz extends React.Component {
    constructor(props) {
        super(props);
        this.col = props.col;

        this.state = {
            barChartHeight: 10, //dummy init value
            hoverLocation: {
                isHover: false,
                x: -100
            }
        };

        this.barChartElement = null;
        this.barChartRef = (element) => this.barChartElement = element;

        this.onHoverDist = this.onHoverDist.bind(this);
        this.onLeaveDist = this.onLeaveDist.bind(this);
        this.isVizOnHover = this.isVizOnHover.bind(this);
    }

    componentDidMount() {
        let barChartHeight = this.barChartElement.clientHeight;
        this.setState({
            barChartHeight: barChartHeight
        });
    }

    render() {
        let application = this.props.application;
        let distribution = this.props.distribution;

        const maxCount = distribution
            .map((b) => b.count ? b.count : 1)
            .reduce((p, v) =>
                    v > p ? v : p
            , 1);

        const barHeightUnit = this.state.barChartHeight / maxCount;
        const columnWidth = this.props.application.renderConst.columnWidth;
        const histogramColor = this.props.application.renderConst.histogramColor;
        const barWidth = columnWidth / distribution.length;
        const renderConst = {
            'barWidth':barWidth,
            'barHeightUnit':barHeightUnit,
            'barChartHeight':this.state.barChartHeight,
            'barChartWidth':columnWidth,
            'isVizOnHover':this.isVizOnHover,
            'color': histogramColor
        };

        let points = this.convertToCoordinates(distribution, barWidth, barHeightUnit);

        //get the bar that is currently hovered over
        const hoverBarLoc = this.state.hoverLocation;
        const onHoverPt = _.find(points, (pt) => pt.x <= hoverBarLoc.x && hoverBarLoc.x < pt.x + barWidth);

        return <div className='distribution-viz'>
            <div className='bar-chart' ref={this.barChartRef} width={renderConst.barChartWidth}>
                <svg height={renderConst.barChartHeight} width={renderConst.barChartWidth}
                     onMouseMove={this.onHoverDist}
                     onMouseLeave={this.onLeaveDist}
                >

                    <DistributionLine
                        points={points}
                        renderConst={renderConst}
                    ></DistributionLine>

                </svg>
                <TooltipText
                    onHoverPoint={onHoverPt}
                    renderConst={renderConst}
                ></TooltipText>
            </div>
        </div>;
    }

    /**
     *
     * @param counts is an array of objs with the field 'count', e.g. [{'count':10},...]
     * @param barWidthUnit
     * @param barHeightUnit
     * @returns an array of coordinate objects: {'x', 'y'} and each coor represent a bar coordinate
     */
    convertToCoordinates(counts, barWidthUnit, barHeightUnit) {
        return counts.map((countObj, index) => {
            const height = barHeightUnit * countObj.count;

            let newObj = {...countObj};
            newObj['x'] = index * barWidthUnit;
            newObj['y'] = this.state.barChartHeight - height;
            return newObj;
        });
    }

    /**
     *
     * @returns true if the current visualization is being hovered on
     */
    isVizOnHover(){
       return this.state.hoverLocation.isHover;
    }

    onHoverDist(e) {
        const actualMouseX = e.clientX - this.barChartElement.getBoundingClientRect().left;
        this.setState({
            hoverLocation: {
                isHover: true,
                x: actualMouseX
            }
        });

    }

    onLeaveDist(e) {
        this.setState({
            hoverLocation: {
                isHover: false,
                x: -100
            }
        });
    }

}

export default DistributionViz;