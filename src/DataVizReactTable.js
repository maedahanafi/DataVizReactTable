import React from 'react';
import DataPanel from './DataPanel/index';
import Model from './DataPanel/Model/Model';
import Application from './DataPanel/Model/Application';
import './index.scss';

class DataVizReactTable extends React.Component{
    constructor(props){
        super(props);

		  this.state = {};
    }
	 
	 componentDidMount() {
		  //note: any changes to the global data store, must be followed by a call to the updateState function
        //to reflect any changes in react's global data store
        this.updateState = this.updateState.bind(this);

        let globalDataStore = new Model(
            this.updateState,
            this.props.data, this.props.columns, this.props.columnTypes,
            this.props.renderConst, this.props.options //display options
        );

        //set up state
        globalDataStore['lastUpdatedKey'] = ''; // contains the key that was last updated
        this.setState(globalDataStore);
	 }

    //This is where you update the global store
    updateState(key, obj){
		  if(this.state.application && this.state.application.isDebug){
				console.log(key, 'updateState', obj);
		  }
		  
        let newState = {};
        newState[key] = obj;
        newState['lastUpdatedKey'] = key;

        this.setState(newState);

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    render(){

        let model = this.state;
        let application = model.application;
        let table = model.table;
		  
		  if(table && application){
			  return <div className='datavizreactable'>
					<DataPanel
						 application={application}
						 table={table}
					></DataPanel>
			  </div>;
		  }
		  
		  return '';
    }
}

export default DataVizReactTable;
