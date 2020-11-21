import _ from 'lodash';

class Table {
    columns = [];
    columnTypes = new Map(); //columnTypes is a map of column and its column types, e.g. decimal, integer, string
    data = new Map();
    distributions = new Map();

    //is it requesting table data
    isLoading = false;

    dummyData(){
        this.moduleName = 'DateDim';
        this.columns = ['d_date_sk', 'd_date_id', 'd_date', 'd_month_seq', 'd_week_seq', 'd_quarter_seq', 'd_year', 'd_dow', 'd_moy', 'd_dom', 'd_qoy', 'd_fy_year', 'd_fy_quarter_seq', 'd_fy_week_seq', 'd_day_name', 'd_quarter_name', 'd_holiday', 'd_weekend', 'd_following_holiday', 'd_first_dom', 'd_last_dom', 'd_same_day_ly', 'd_same_day_lq', 'd_current_day', 'd_current_week', 'd_current_month', 'd_current_quarter', 'd_current_year'];
        this.columnTypes = new Map([['d_date_sk', "string"], ['d_date_id', "string"], ['d_date', "string"], ['d_month_seq', "string"], ['d_week_seq', "string"], ['d_quarter_seq', "string"], ['d_year', "string"], ['d_dow', "string"], ['d_moy', "string"], ['d_dom', "string"], ['d_qoy', "string"], ['d_fy_year', "string"], ['d_fy_quarter_seq', "string"], ['d_fy_week_seq', "string"], ['d_day_name', "string"], ['d_quarter_name', "string"], ['d_holiday', "string"], ['d_weekend', "string"], ['d_following_holiday', "string"], ['d_first_dom', "string"], ['d_last_dom', "string"], ['d_same_day_ly', "string"], ['d_same_day_lq', "string"], ['d_current_day', , "string"], ['d_current_week', "string"], ['d_current_month', "string"], ['d_current_quarter', 'string'], ['d_current_year', 'string']]);

        this.data = new Map([["ROW_ID_1",{d_date:"2000-01-01",d_current_week:"N",d_week_seq:"5218",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"Y",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"Y",d_quarter_seq:"401",d_date_id:"AAAAAAAAJFIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451453",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451180",d_dom:"1",d_date_sk:"2451545",d_last_dom:"2451544",d_fy_week_seq:"5218",d_day_name:"Saturday",d_quarter_name:"2000Q1",d_dow:"6"}],["ROW_ID_2",{d_date:"2000-01-02",d_current_week:"N",d_week_seq:"5218",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAKFIGFCAA",d_following_holiday:"Y",d_fy_year:"2000",d_same_day_lq:"2451454",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451181",d_dom:"2",d_date_sk:"2451546",d_last_dom:"2451544",d_fy_week_seq:"5218",d_day_name:"Sunday",d_quarter_name:"2000Q1",d_dow:"0"}],["ROW_ID_3",{d_date:"2000-01-03",d_current_week:"N",d_week_seq:"5218",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAALFIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451455",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451182",d_dom:"3",d_date_sk:"2451547",d_last_dom:"2451544",d_fy_week_seq:"5218",d_day_name:"Monday",d_quarter_name:"2000Q1",d_dow:"1"}],["ROW_ID_4",{d_date:"2000-01-04",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAMFIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451456",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451183",d_dom:"4",d_date_sk:"2451548",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Tuesday",d_quarter_name:"2000Q1",d_dow:"2"}],["ROW_ID_5",{d_date:"2000-01-05",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAANFIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451457",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451184",d_dom:"5",d_date_sk:"2451549",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Wednesday",d_quarter_name:"2000Q1",d_dow:"3"}],["ROW_ID_6",{d_date:"2000-01-06",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAOFIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451458",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451185",d_dom:"6",d_date_sk:"2451550",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Thursday",d_quarter_name:"2000Q1",d_dow:"4"}],["ROW_ID_7",{d_date:"2000-01-07",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"Y",d_quarter_seq:"401",d_date_id:"AAAAAAAAPFIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451459",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451186",d_dom:"7",d_date_sk:"2451551",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Friday",d_quarter_name:"2000Q1",d_dow:"5"}],["ROW_ID_8",{d_date:"2000-01-08",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"Y",d_quarter_seq:"401",d_date_id:"AAAAAAAAAGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451460",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451187",d_dom:"8",d_date_sk:"2451552",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Saturday",d_quarter_name:"2000Q1",d_dow:"6"}],["ROW_ID_9",{d_date:"2000-01-09",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAABGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451461",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451188",d_dom:"9",d_date_sk:"2451553",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Sunday",d_quarter_name:"2000Q1",d_dow:"0"}],["ROW_ID_10",{d_date:"2000-01-10",d_current_week:"N",d_week_seq:"5219",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAACGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451462",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451189",d_dom:"10",d_date_sk:"2451554",d_last_dom:"2451544",d_fy_week_seq:"5219",d_day_name:"Monday",d_quarter_name:"2000Q1",d_dow:"1"}],["ROW_ID_11",{d_date:"2000-01-11",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAADGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451463",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451190",d_dom:"11",d_date_sk:"2451555",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Tuesday",d_quarter_name:"2000Q1",d_dow:"2"}],["ROW_ID_12",{d_date:"2000-01-12",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAEGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451464",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451191",d_dom:"12",d_date_sk:"2451556",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Wednesday",d_quarter_name:"2000Q1",d_dow:"3"}],["ROW_ID_13",{d_date:"2000-01-13",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAFGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451465",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451192",d_dom:"13",d_date_sk:"2451557",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Thursday",d_quarter_name:"2000Q1",d_dow:"4"}],["ROW_ID_14",{d_date:"2000-01-14",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"Y",d_quarter_seq:"401",d_date_id:"AAAAAAAAGGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451466",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451193",d_dom:"14",d_date_sk:"2451558",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Friday",d_quarter_name:"2000Q1",d_dow:"5"}],["ROW_ID_15",{d_date:"2000-01-15",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"Y",d_quarter_seq:"401",d_date_id:"AAAAAAAAHGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451467",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451194",d_dom:"15",d_date_sk:"2451559",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Saturday",d_quarter_name:"2000Q1",d_dow:"6"}],["ROW_ID_16",{d_date:"2000-01-16",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAIGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451468",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451195",d_dom:"16",d_date_sk:"2451560",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Sunday",d_quarter_name:"2000Q1",d_dow:"0"}],["ROW_ID_17",{d_date:"2000-01-17",d_current_week:"N",d_week_seq:"5220",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAJGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451469",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451196",d_dom:"17",d_date_sk:"2451561",d_last_dom:"2451544",d_fy_week_seq:"5220",d_day_name:"Monday",d_quarter_name:"2000Q1",d_dow:"1"}],["ROW_ID_18",{d_date:"2000-01-18",d_current_week:"N",d_week_seq:"5221",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAKGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451470",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451197",d_dom:"18",d_date_sk:"2451562",d_last_dom:"2451544",d_fy_week_seq:"5221",d_day_name:"Tuesday",d_quarter_name:"2000Q1",d_dow:"2"}],["ROW_ID_19",{d_date:"2000-01-19",d_current_week:"N",d_week_seq:"5221",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAALGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451471",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451198",d_dom:"19",d_date_sk:"2451563",d_last_dom:"2451544",d_fy_week_seq:"5221",d_day_name:"Wednesday",d_quarter_name:"2000Q1",d_dow:"3"}],["ROW_ID_20",{d_date:"2000-01-20",d_current_week:"N",d_week_seq:"5221",d_current_day:"N",d_first_dom:"2451545",d_moy:"1",d_holiday:"N",d_month_seq:"1200",d_current_year:"N",d_fy_quarter_seq:"401",d_current_quarter:"N",d_year:"2000",d_weekend:"N",d_quarter_seq:"401",d_date_id:"AAAAAAAAMGIGFCAA",d_following_holiday:"N",d_fy_year:"2000",d_same_day_lq:"2451472",d_qoy:"1",d_current_month:"N",d_same_day_ly:"2451199",d_dom:"20",d_date_sk:"2451564",d_last_dom:"2451544",d_fy_week_seq:"5221",d_day_name:"Thursday",d_quarter_name:"2000Q1",d_dow:"4"}]]);
        this.distributions = new Map();
        this.calculateDistribution();
    }

    constructor(globalKey, updateGlobalStore) {
        this.updateGlobalStore = updateGlobalStore;
        this.globalKey = globalKey;

        this.dummyData();

        this.updateTable = this.updateTable.bind(this);
        this.clearTable = this.clearTable.bind(this);
        this.calculateDistribution = this.calculateDistribution.bind(this);
    }

    clearTable(moduleName){
        this.data = new Map();
        this.moduleName = moduleName;

        this.columns = [];
        this.columnTypes = new Map();

        this.distributions = new Map();
        this.updateGlobalStore(this.globalKey, this);
    }

    updateTable(workflowIndex, moduleName, outputPercentLabeled, callback) {
        this.clearTable(moduleName);

        this.isLoading = true;
        this.updateGlobalStore(this.globalKey, this);

        /*getTable(workflowIndex, moduleName ,outputPercentLabeled, (status, data)=>{
            if(status == 'ok'){
                this.toEs6ObjectTable(this, data);
                this.isLoading = false;
                this.updateGlobalStore(this.globalKey, this);
                callback();
            }
        });*/

    }

    toEs6ObjectTable(objectToStore, data){
        objectToStore.moduleName = data.moduleName;

        objectToStore.data = new Map(
            Object.keys(data.data).map((rowId)=>[rowId, data.data[rowId]])
        );
        objectToStore.columns = data.columns;
        
        objectToStore.distributions = new Map(
            Object.keys(data.distributions).map((col)=>[col, data.distributions[col]])
        );

        objectToStore.columnTypes = new Map(
            Object.keys(data.columnTypes).map((col)=>[col, _.lowerCase(data.columnTypes[col])])
        );


    }

    getTableName(){
        return this.moduleName;
    }

    /**
    * Calculates the distribution of the data and stores the result in this.distributions.
    * this.distributions is a  map of each column, where each column keys a countObj, where
    * countObj contains:
    *      dataValue is a value in the column,
    *      count is the number of times that value appeared,
    *      ids is an array of rowIds that have that value
    */
    calculateDistribution(){
        this.distributions = new Map();
        for(let col of this.columns){
            let counts = [];
            let allValues = _.map(Array.from(this.data.values()), (rowData)=> rowData[col]? rowData[col]: 'NULL');
            let distributionObj = _.groupBy(allValues);
            for(let val of _.keys(distributionObj)){
                // {dataValue, count, ids}
                let countObj = {
                    'dataValue': val,
                    'count': distributionObj[val].length,
                    'ids':[]
                };
                counts.push(countObj);
            }
            this.distributions.set(col, counts);
        }
        console.log(this.distributions)
    }

    /**
     * @param distributions is a map of distribution objects
     * @returns distribution
     * distribution is an array of objects: {dataValue, count, ids}
     *      where dataValue is a value in the column,
     *      count is the number of times that value appeared,
     *      ids is an array of rowIds that have that value
     */
    displayedDistribution(col) {

        if( this.distributions.has(col)){
            let distObj = this.distributions.get(col);
            if(this.isColumnNumeric(col, this.columnTypes)){
                return _.orderBy(distObj, [(bar)=>Number(bar.dataValue)], ['asc']);
            }
            return _.orderBy(distObj, [(bar)=>bar.dataValue], ['asc']);;
        }
        return [];

    }

    /**
     * @param filterColumn a substring
     * @returns string[] the ordering of the displayed columns
     */
    displayedColumns(filterColumn) {
        //filter the columns based on the column names
        let orderedFilteredCols = filterColumn.length > 0 ?
            this.columns.filter((col) => col && col.includes(filterColumn)) :
            this.columns;

        //rank the columns based on suspicion (either this ranking or the one based on the column type)
        orderedFilteredCols = _.orderBy(orderedFilteredCols, [(col) => null], ['asc'])

        return orderedFilteredCols;
    }

    /**
     * @param columns the currently displayed columns
     * @param sortCol the current column the sort is applied on
     * @param sortDir e.g. 'asc' or 'desc'
     * @param filterValuesBy the substring on which the row values are filtered on
     * @returns string[] the displayed rowIds sorted
     */
    displayedRowIds(columns, sortCol, sortDir, filterValuesBy) {
        const allRowIds = Array.from(this.data.keys());
        //filter by data value
        let rowIdsToRender = filterValuesBy.length > 0 ?
            allRowIds.filter((rowId) =>
                this.isRowContainSubstring(rowId, filterValuesBy, columns)
            ) :
            allRowIds;

        //sort by selected column
        rowIdsToRender = this.sortRowIds(rowIdsToRender, sortCol, sortDir);

        return rowIdsToRender;
    }



    /**
     * @param rowId
     * @param substr
     * @param columns
     * @returns {boolean} returns true if any of the values from the given columns in a tuple given by rowId contains the substring
     */
    isRowContainSubstring(rowId, substr, columns) {
        let values = '';
        for (let col of columns) {
            values = values + ' ' + this.data.get(rowId)[col];
        }
        return values.includes(substr);
    }

    /**
     *
     * @param rowIdsToRender an array of row ids to sort
     * @param sortCol e.g. d_date_sk
     * @param sortDir, e.g. 'desc' or 'asc'
     * @returns an array of rowIds sorted by the values in the given column and the datapoint label
     */
    sortRowIds(rowIdsToRender, sortCol, sortDir){
        //show the rows we render
        rowIdsToRender = sortCol.length > 0 ?
            this.sortRowIdsByColumn(rowIdsToRender, sortCol, sortDir) :
            rowIdsToRender;

        return rowIdsToRender;
    }

    /**
     * @param rowIds, e.g. ROW_ID_1
     * @param col, e.g. d_date_sk
     * @param sortDir, e.g. 'desc' or 'asc'
     * @returns an array of rowIds sorted by the values in the given column
     */
    sortRowIdsByColumn(rowIds, col, sortDir) {

        let sortCallback = (id) => {
            const val = this.data.has(id) ? this.data.get(id)[col] : null;
            if(this.isColumnNumeric(col)){
                return Number(val);
            }
            return val;
        };

        return _.orderBy(rowIds, [sortCallback], [sortDir]);
    }

    isColumnNumeric(col){
        const columnType = this.columnTypes.get(col);
        return columnType && (columnType.includes('int') || columnType.includes('numeric'));
    }
}

export default Table;