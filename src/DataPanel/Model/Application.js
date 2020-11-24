import _ from 'lodash';
import globalCss from './../../_global.scss';

class Application{
    
    renderConst = {
        margins: globalCss.margins,
        columnWidth: globalCss.columnWidth,
        highlightColor: globalCss.glowColor,
        histogramColor: '#5DADE2'
    };

    dataPanel = {
        title: '',
        needUpdateHeightConst: true,
        height: 500,
        width: 100
    };

    filter = {
        column: '',
        values: '',
    };

    sort = {
        col: '',
        dir: 'desc'
    };


    constructor(
        globalKey, updateGlobalStore,
        renderConst, options
    ) {

        this.dataPanel.height = renderConst.height;
        this.dataPanel.width = renderConst.width;

        this.dataPanel.title = options.title? options.title: this.dataPanel.title;
        this.renderConst.columnWidth = options.columnWidth? options.columnWidth: this.renderConst.columnWidth;
        this.renderConst.highlightColor = options.highlightColor? options.highlightColor: this.renderConst.highlightColor;
        this.renderConst.histogramColor = options.histogramColor? options.histogramColor: this.renderConst.histogramColor;

        this.updateGlobalStore = updateGlobalStore;
        this.globalKey = globalKey;

        this.updateFilter = this.updateFilter.bind(this);
        this.toggleSort = this.toggleSort.bind(this);

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