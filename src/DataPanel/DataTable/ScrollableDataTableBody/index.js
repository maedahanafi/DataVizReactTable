import React from 'react';
import DataTableBody from "../DataTableBody/index";

class ScrollableDataTableBody extends React.Component{

    constructor(props){
        super(props);
    }

    render() {

        const height = this.props.height;
        const width = this.props.width;
        const application = this.props.application;

        const table = this.props.table;

        const columnsToRender = this.props.columnsToRender;
        const rowIdsToRender = this.props.rowIdsToRender;

        let refCallback = this.props.refCallback;
        let onScrollCallback = this.props.onScrollCallback;


        return <div className='scroll-body'
                    key={'data-table-captured'}
                    ref={refCallback}
                    onScroll={onScrollCallback}
                    style={{
                        height: height + 'px',
                        width: width + 'px',
                        'overflow': 'scroll'
                    }}>
            <div className='table'>
                <DataTableBody application={application}
                               table={table}
                               columns={columnsToRender}
                               rowIds={rowIdsToRender}
                >
                </DataTableBody>
            </div>
        </div>;
    }
}

export default ScrollableDataTableBody;