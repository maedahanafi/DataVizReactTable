import React from 'react';
import Application from './Application';
import Table from './Table';

class Model {
    constructor(
        updateGlobalStore,
        data, columns, columnTypes,
        renderConst, options
    ){
        this.table = new Table('table', updateGlobalStore, data, columns, columnTypes);
        this.application = new Application('application', updateGlobalStore, renderConst, options);

        this.updateTable = this.updateTable.bind(this);
    }

    updateTable(data, columns, columnTypes){
        this.table.updateTable(data, columns, columnTypes);
    }


}

export default Model;