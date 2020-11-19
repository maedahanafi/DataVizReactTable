import _ from 'lodash';
import globalCss from './../../_global.scss';

class Application{
    
    renderConst = {
        margins: globalCss.margins,
        columnWidth: globalCss.columnWidth
    };

    dataPanel = {
        moduleName: null,
        needUpdateHeightConst: true,
        height: 500,
        width: 100
    };

    dataTable = {

    };

    filter = {
        column: '',
        values: '',
    };

    sort = {
        col: '',
        dir: 'desc'
    };


    constructor(globalKey, updateGlobalStore) {
        console.log(this)

        this.updateGlobalStore = updateGlobalStore;
        this.globalKey = globalKey;

        this.updateFilter = this.updateFilter.bind(this);
        this.toggleSort = this.toggleSort.bind(this);

        console.log(this)
    }

    updateApplicationState(key, value){
        this[key] = value;

        //update global store
        this.updateGlobalStore(this.globalKey, this);
    }

    toggleSort(column) {
        let sortDir = 'desc';
        if (this.sort.col == column) {
            sortDir = this.sort.dir == 'desc' ? 'asc' : 'desc';
        }
        let sortObj = {col: column, dir: sortDir};
        this.updateApplicationState('sort', sortObj);

    }

    updateFilter(filterOn, filterValue) {
        filterValue = filterValue == -1 ? null : filterValue;
        let currFilter = {...this.filter};
        currFilter[filterOn] = filterValue;
        this.filter = currFilter;
        this.updateApplicationState('filter', currFilter);
    }

    

}

export default Application;