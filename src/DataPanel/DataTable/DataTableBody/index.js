import React from 'react';
import Row from "./Row";

class DataTableBody extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
		  let application = this.props.application;
        let table = this.props.table;
        let data = table.data;

		  if(application && application.isDebug){
				console.log('Render Rows')
		  }
        
        let columns = this.props.columns;
        let rowIds = this.props.rowIds;

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