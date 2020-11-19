import React from 'react';
import './index.scss';
import _ from 'lodash';
import DistributionLine from './svg/DistributionLine';
import TooltipText from "./TooltipText/index";
import HoveredBar from "./svg/HoveredBar";
import LabeledBar from "./svg/LabeledBar";

class DistributionViz extends React.Component {
    constructor(props) {
        super(props);
        this.col = props.col;

        this.state = {
            barChartWidth: this.props.application.dataPanel.columnWidth,
            barChartHeight: 10,
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
        let barChartWidth = this.props.application.dataPanel.columnWidth;
        let barChartHeight = this.barChartElement.clientHeight;
        this.setState({
            barChartWidth: barChartWidth,
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
        const barWidth = this.state.barChartWidth / distribution.length;
        const renderConst = {
            'barWidth':barWidth,
            'barHeightUnit':barHeightUnit,
            'barChartHeight':this.state.barChartHeight,
            'barChartWidth':this.state.barChartWidth,
            'isVizOnHover':this.isVizOnHover
        };

        let points = this.convertToCoordinates(distribution, barWidth, barHeightUnit);

        //get the bar that is currently hovered over
        const hoverBarLoc = this.state.hoverLocation;
        const onHoverPt = _.find(points, (pt) => pt.x <= hoverBarLoc.x && hoverBarLoc.x < pt.x + barWidth);


        //get all the labels and convert them into points
        //let allLabels = this.props.allLabels;
        let allLabels = [];
        for(let b of distribution){
            let labels = _.map(b.labels, (lblObj)=>lblObj.label);
            for(let lbl of labels){
                if(!_.includes(allLabels, lbl)){
                    allLabels.push(lbl);
                }
            }
        }
        allLabels = _.sortBy(allLabels);


        const filteredLabel = application.filter.label;
        const filteredLabelDist = this.props.filteredDistribution;
        const filteredLabelPoints = this.convertToCoordinates(filteredLabelDist, barWidth, barHeightUnit);

        const labeledBars = distribution.map((bar, index) => <LabeledBar
            key={'labeledbar-' + index}
            allLabels={allLabels}
            x={barWidth * index}
            renderConst={renderConst}
            barLabels={bar.labels}
            visibility={'visible'}
        ></LabeledBar>);
        /*
                <DistributionPolygon
                        points={points}
                        renderConst={renderConst}
                    ></DistributionPolygon>
         {filteredLabel != null ?
                        <DistributionPolygon
                            key={'distribution-label-' + filteredLabel}
                            points={filteredLabelPoints}
                            renderConst={renderConst}
                            fill={mapLabelToColor(filteredLabel)}
                        >
                        </DistributionPolygon> :
                        ''}*/

        return <div className='distribution-viz'>
            <div className='bar-chart' ref={this.barChartRef} width={this.state.barChartWidth}>
                <svg height={this.state.barChartHeight} width={this.state.barChartWidth}
                     onMouseMove={this.onHoverDist}
                     onMouseLeave={this.onLeaveDist}
                >
                    {labeledBars}

                    <HoveredBar
                        onHoverPoint={onHoverPt}
                        renderConst={renderConst}
                        allLabels={allLabels}
                    ></HoveredBar>


                    <DistributionLine
                        points={points}
                        renderConst={renderConst}
                    ></DistributionLine>

                </svg>
                <TooltipText
                    onHoverPoint={onHoverPt}
                    renderConst={renderConst}
                    allLabels={allLabels}
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