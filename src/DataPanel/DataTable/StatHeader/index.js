import React from 'react';
import DistributionViz from './DistributionViz/index';
import {displayedDistribution} from './../../Model/table_operations';

class StatHeader extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        let application = this.props.application;
        let table = this.props.table;
        let columns = this.props.columns;
        let rowIdsToRender = this.props.rowIdsToRender;
        let filter = application.filter;

        if (columns <= 0 || rowIdsToRender <= 0) {
            return '';
        }

        let columnElements = columns.map((col)=> {
            let distribution = table.displayedDistribution(col );
            if(!distribution){
                return '';
            }

            return <div className='th' key={'th-stat-' + col}>
                <DistributionViz
                    application={application}
                    col={col}
                    distribution={distribution}
                >
                </DistributionViz>
            </div>;
        });

        return <div className='tr'>
            {columnElements}
        </div>
    }


}

export default StatHeader;