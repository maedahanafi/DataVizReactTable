import React from 'react';
import DataPanel from './DataPanel/index';
import Model from './DataPanel/Model/Model';
import Application from './DataPanel/Model/Application';
import './index.scss';

class App extends React.Component{
    constructor(props){
        super(props);

        //note: any changes to the global data store, must be followed by a call to the updateState function
        //to reflect any changes in react's global data store
        this.updateState = this.updateState.bind(this);
        let globalDataStore = new Model(this.updateState);
        globalDataStore['lastUpdatedKey'] = ''; // contains the key that was last updated
        this.state = globalDataStore;

    }

    //This is where you update the global store
    updateState(key, obj){
        console.log(key, 'updateState', obj);

        let newState = {};
        newState[key] = obj;
        newState['lastUpdatedKey'] = key;

        this.setState(newState);

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    render(){
        console.log('render App')

        let model = this.state;
        let application = model.application;
        const table = model.table;

        return <div className="App">
            <DataPanel
                application={model.application}
                table={model.table}
            ></DataPanel>
        </div>;
    }
}

export default App;
