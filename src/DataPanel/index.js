import React from 'react';
import './index.scss';
import DataTable from './DataTable/index';
import InputFilter from './Widgets/InputFilter/index';
import LoadingIcon from "./Widgets/LoadingIcon/index";

class DataPanel extends React.Component {
    constructor(props) {
        super(props);
        this.element = null;
        this.elementRef = (element) => this.element = element;

        this.headerElement = null;
        this.headerElementRef = (element) => this.headerElement = element;

        let application = this.props.application;
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    componentDidMount() {
        this.updateRenderConst();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        let application = this.props.application;
        if(application.dataPanel.needUpdateHeightConst){
            //tell the state to update the info on the height of the current element
            //due to expanding or collapsing workflow
            return true;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(snapshot!==null){
            //update the height of the current element
            this.updateRenderConst();
        }
    }


    /**
     * update the workflow panel rendering constants
     */
    updateRenderConst(){
        let application = this.props.application;
        let workflowElement = this.element;
        let headerElement = this.headerElement;
        if(workflowElement && headerElement) {

            let newWidth = 0.99 * workflowElement.clientWidth;

            application.dataPanel.needUpdateHeightConst = false;
            application.dataPanel.width = newWidth;
            application.updateApplicationState('dataPanel', application.dataPanel);

        }
    }

    render() {
		  
        let application = this.props.application;
        let table = this.props.table;

		  if(application && application.isDebug){
				console.log('render DataPanel');
		  }
		  
        const isLoading = table.isLoading;

        const statsLabel = ' Rows: ' + table.data.size + ', Columns: ' + table.columns.length;

        const filterColumn = application.filter.column;
        const filterValues = application.filter.values;
        const filteredColumns = table.displayedColumns(filterColumn);

        const sortCol = application.sort.col;
        const sortDir = application.sort.dir;

        const labeledData = table.labels;
        const columnTypes = table.columnTypes;

        const filteredColLabel = filterColumn.length > 0 ? ' Filtered Columns: ' + filteredColumns.length : '';

        let tableLabelElement = '';
        let filteredRowLabel = '';

        const rowIdsToRender = table.displayedRowIds( filteredColumns, sortCol, sortDir, filterValues);

        filteredRowLabel = filterValues.length > 0 ? ', Filtered Rows: ' + rowIdsToRender.length: '';

        return <div className='data-panel panel' ref={this.elementRef}>
            <div className='header' ref={this.headerElementRef}>
                <span className='label'>{application.dataPanel.title}  </span>
                <LoadingIcon isLoading={isLoading}></LoadingIcon>
                <span className='sub-label '>
                    {statsLabel + filteredColLabel + filteredRowLabel}
                </span>
                <span className='search'>
                    <InputFilter filterOn='column'
                                 filterValue={filterColumn}
                                 onUpdate={application.updateFilter}>
                    </InputFilter>
                    <InputFilter filterOn='values'
                                 filterValue={filterValues}
                                 onUpdate={application.updateFilter}>
                    </InputFilter>
                </span>
            </div>
            <DataTable
                application={application}
                table={table}
                columnsToRender={filteredColumns}
                filteredRowIds={rowIdsToRender}
            >
            </DataTable>
        </div>;
    }

}

export default DataPanel;