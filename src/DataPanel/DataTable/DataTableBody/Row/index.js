import React from 'react';

import DataValue from './DataValue';
import _ from 'lodash';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let application = this.props.application;
        let table = this.props.table;
        let data = table.data;

        if(_.isNull(data) || _.isUndefined(data)){
            return '';
        }

        const rowId = this.props.rowId;
        const columns = this.props.columns;

        let tupleElements = columns.map((col) => {
            return <DataValue key={'data-value-' + col + '-' + rowId}
                       application={application}
                       rowId={rowId}
                       col={col}
                       value={data.has(rowId) ? data.get(rowId)[col] : null}
            >

            </DataValue>
        });




        return <div className='tr' >
            {tupleElements}
        </div>;
    }
}

export default Row;