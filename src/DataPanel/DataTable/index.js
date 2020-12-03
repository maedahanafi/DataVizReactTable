import React from 'react';
import _ from 'lodash';
import './index.scss';
import ColumnHeader from './ColumnHeader/index';
import StatHeader from './StatHeader/index';
import ScrollableDataTableBody from "./ScrollableDataTableBody";

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headerHeight: 100,
            rowRenderCount: 100
        };


        this.scrollBodyExplElement = null;
        this.scrollBodyExplRef = (element) => this.scrollBodyExplElement = element;

        this.scrollBodyNonExplElement = null;
        this.scrollBodyNonExplRef = (element) => this.scrollBodyNonExplElement = element;


        this.scrollBodyElement = null;
        this.scrollBodyRef = (element) => this.scrollBodyElement = element;

        this.scrollHeaderElement = null;
        this.scrollHeaderRef = (element) => this.scrollHeaderElement = element;

        this.onScroll = this.onScroll.bind(this);
        this.syncHorizontalScroll = this.syncHorizontalScroll.bind(this);
    }

    componentDidMount() {
        let newHeaderHeight = this.scrollHeaderElement.clientHeight;
        this.setState({headerHeight: newHeaderHeight});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let newHeaderHeight = this.scrollHeaderElement.clientHeight;
        if(this.state.headerHeight != newHeaderHeight){
            this.setState({headerHeight: newHeaderHeight});
        }

    }


    render() {
        let application = this.props.application;
        let table = this.props.table;

        const columnTypes = table.columnTypes;
        const columnValueType = table.columnValueType;

        const height = application.dataPanel.height;
        const width = application.dataPanel.width;
        const bodyHeight = height - this.state.headerHeight - (2 * application.renderConst.margins);


        const rowRenderConst = this.state.rowRenderCount;

        const columnsToRender = this.props.columnsToRender;
        const rowIdsToRender = this.props.filteredRowIds;

        const initRowIdsToRender = [...rowIdsToRender].slice(0, rowRenderConst+1);

        return <div
            className='data-table-div'
            style={{
                height: height + 'px',
                width: width + 'px'
            }}
        >

            <div className='scroll-header'
                 ref={this.scrollHeaderRef}
                 style={{
                     width: width + 'px',
                     'overflow': 'hidden'
                 }}>

                <div className='table' >
                    <StatHeader application={application}
                                table={table}
                                columns={columnsToRender}
                                columnTypes={columnTypes}
                                rowIdsToRender={rowIdsToRender}
                    >
                    </StatHeader>
                    <ColumnHeader application={application}
                                  columns={columnsToRender}
                                  columnTypes={columnTypes}
                                  columnValueType={columnValueType}
                    >
                    </ColumnHeader>
                </div>

            </div>
            <ScrollableDataTableBody
                key={'data-table-captured'}
                height={bodyHeight}
                width={width}
                refCallback={this.scrollBodyRef}
                onScrollCallback = {() => this.onScroll(this.scrollBodyElement)}
                application={application}
                table={table}
                columnsToRender={columnsToRender}
                rowIdsToRender={initRowIdsToRender}
            ></ScrollableDataTableBody>


        </div>;
    }


    onScroll(scrollBodyElement) {


        const scrollTop = scrollBodyElement.scrollTop;

        //dont let the scroll beyond the scrollbar width or the header will be misaligned
        const scrollBarWidth = scrollBodyElement.offsetWidth - scrollBodyElement.clientWidth;
        const totElemScrollWidth = scrollBodyElement.scrollWidth - scrollBodyElement.clientWidth;
        const maxWidth = totElemScrollWidth - scrollBarWidth;
        if (scrollBodyElement.scrollLeft >= maxWidth) {
            scrollBodyElement.scrollTo(maxWidth, scrollTop);
        }

        // sync the scrolling of the header with the body
        const left = scrollBodyElement.scrollLeft;
        this.syncHorizontalScroll(left);

        //detect if the scrolltop reach the bottom and then update the number of rowRenderCount
        const totElemScrollHeight = scrollBodyElement.scrollHeight - scrollBodyElement.clientHeight;
        if (scrollTop >= (0.9*totElemScrollHeight) && this.state.rowRenderCount<this.props.filteredRowIds.length) {
            this.setState({rowRenderCount: this.state.rowRenderCount + 100});
        }
    }

    syncHorizontalScroll(left){
        this.scrollHeaderElement.scrollTo(left, 0);
        if(this.scrollBodyElement) this.scrollBodyElement.scrollTo(left, this.scrollBodyElement.scrollTop);
        if(this.scrollBodyExplElement) this.scrollBodyExplElement.scrollTo(left, this.scrollBodyExplElement.scrollTop);
        if(this.scrollBodyNonExplElement) this.scrollBodyNonExplElement.scrollTo(left, this.scrollBodyNonExplElement.scrollTop);


    }
}

export default DataTable;