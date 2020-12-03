import _ from 'lodash';
import _globalCss from './../../_global.scss';

class Application{
    
	isDebug = false;

	/* Note: Webpack 4 is unable to read the exported variables from _globalCss :(
	 *  BUT, running during production actually loads from scss file. Still have no clue as why
	 *  that is aside from Webpack version of this app isn't exporting the vars properly.
	 * Just make the global vars are the same as in renderConst.
	 */
    renderConst = {
        margins: 5,//_globalCss.margins,
        columnWidth: 200,//_globalCss.columnWidth,
        highlightColor: '#fffa78', //_globalCss.glowColor,
        histogramColor: '#5DADE2'
    };

    dataPanel = {
        title: '',
        needUpdateHeightConst: true,
        height: 500,
        width: -1 //some dummy value
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

        this.dataPanel.height = renderConst.maxheight;

        this.dataPanel.title = options.title? options.title: this.dataPanel.title;
        this.renderConst.columnWidth = options.columnWidth? options.columnWidth: this.renderConst.columnWidth;
        this.renderConst.highlightColor = options.highlightColor? options.highlightColor: this.renderConst.highlightColor;
        this.renderConst.histogramColor = options.histogramColor? options.histogramColor: this.renderConst.histogramColor;
        this.renderConst.margins = this.renderConst.margins;

        this.updateGlobalStore = updateGlobalStore;
        this.globalKey = globalKey;

        this.updateFilter = this.updateFilter.bind(this);
        this.toggleSort = this.toggleSort.bind(this);

        console.log('this.renderConst', this.renderConst, '_globalCss', _globalCss)
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