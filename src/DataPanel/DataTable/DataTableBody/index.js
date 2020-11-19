import React from 'react';
import Row from "./Row";
import {sortRowIds} from "../../Model/table_operations";

class DataTableBody extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        console.log('Render Rows')

        let application = this.props.application;
        let table = this.props.table;
        let data = table.data;

        let columns = this.props.columns;
        let rowIds = this.props.rowIds;

        const sortCol = application.sort.col;
        const sortDir = application.sort.dir;

        const labeledData = table.labels;
        const columnTypes = table.columnTypes;

        rowIds = sortRowIds(rowIds, data, labeledData, columnTypes, sortCol, sortDir);

        let rowElements = rowIds.map((rowId) =>
            <Row key={'row-' + rowId}
                 application={application}
                 table={table}
                 columns={columns}
                 rowId={rowId}
            >

            </Row>
        );
        return rowElements;
    }
}

export default DataTableBody;