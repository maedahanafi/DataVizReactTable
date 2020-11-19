import _ from 'lodash';

/**
 * @param columns
 * @param columnValueType
 * @param filterColumn a substring
 * @returns string[] the ordering of the displayed columns
 */
export function displayedColumns(columns, columnValueType, filterColumn) {
    //filter the columns based on the column names
    let orderedFilteredCols = filterColumn.length > 0 ?
        columns.filter((col) => col && col.includes(filterColumn)) :
        columns;

    //rank the columns based on suspicion (either this ranking or the one based on the column type)
    orderedFilteredCols = _.orderBy(orderedFilteredCols, [(col) => null], ['asc'])

    return orderedFilteredCols;
}

/**
 * @param data a map of the
 * @param allRowIds an array of all the rowIds
 * @param columns the currently displayed columns
 * @param columnTypes is a map of column and its column types, e.g. decimal, integer, string
 * @param labels is a map of the rowIds to its labels
 * @param sortCol the current column the sort is applied on
 * @param sortDir e.g. 'asc' or 'desc'
 * @param filterValuesBy the substring on which the row values are filtered on
 * @returns string[] the displayed rowIds sorted
 */
export function displayedRowIds(data, allRowIds, columns, columnTypes, labels, sortCol, sortDir, filterValuesBy) {

    //filter by data value
    let rowIdsToRender = filterValuesBy.length > 0 ?
        allRowIds.filter((rowId) =>
            isRowContainSubstring(data, rowId, filterValuesBy, columns)
        ) :
        allRowIds;

    return rowIdsToRender;
}



/**
 * @param data is a map of rowIds and its attribute values
 * @param rowId
 * @param substr
 * @param columns
 * @returns {boolean} returns true if any of the values from the given columns in a tuple given by rowId contains the substring
 */
function isRowContainSubstring(data, rowId, substr, columns) {
    let values = '';
    for (let col of columns) {
        values = values + ' ' + data.get(rowId)[col];
    }
    return values.includes(substr);
}

/**
 *
 * @param rowIdsToRender an array of row ids to sort
 * @param data is a map of rowIds and its attribute values
 * @param labels is a map of the rowIds to its labels
 * @param columnTypes is a map of column and its column types, e.g. decimal, integer, string
 * @param sortCol e.g. d_date_sk
 * @param sortDir, e.g. 'desc' or 'asc'
 * @returns an array of rowIds sorted by the values in the given column and the datapoint label
 */
export function sortRowIds(rowIdsToRender, data, labels, columnTypes, sortCol, sortDir){

    //sort by label
    rowIdsToRender = labels? _.orderBy(rowIdsToRender, [(rowId) => {
        return labels.has(rowId)? labels.get(rowId)['label']: null;
    }], ['desc']): rowIdsToRender;

    //show the rows we render
    rowIdsToRender = sortCol.length > 0 ?
        sortRowIdsByColumn(data, columnTypes, rowIdsToRender, sortCol, sortDir) :
        rowIdsToRender;

    return rowIdsToRender;
}

/**
 * @param data is a map of rowIds and its attribute values
 * @param columnTypes is a map of column and its column types, e.g. decimal, integer, string
 * @param rowIds, e.g. ROW_ID_1
 * @param col, e.g. d_date_sk
 * @param sortDir, e.g. 'desc' or 'asc'
 * @returns an array of rowIds sorted by the values in the given column
 */
function sortRowIdsByColumn(data, columnTypes, rowIds, col, sortDir) {

    let sortCallback = (id) => {
        const val = data.has(id) ? data.get(id)[col] : null;
        if(isColumnNumeric(col, columnTypes)){
            return Number(val);
        }
        return val;
    };

    return _.orderBy(rowIds, [sortCallback], [sortDir]);
}

export function isColumnNumeric(col, columnTypes){
    const columnType = columnTypes.get(col);
    return columnType && (columnType.includes('int') || columnType.includes('numeric'));
}

/**
 * @param distributions is a map of distribution objects
 * @param col the column name to calculate the distribution on
 * @param columnTypes is a map of column and its column types, e.g. decimal, integer, string
 * @returns distribution
 * distribution is an array of objects: {dataValue, count, ids, labels}
 *      where dataValue is a value in the column,
 *      count is the number of times that value appeared,
 *      ids is an array of rowIds that have that value
 *      and labels is an array of objects [{'label':'positive', count:0}, ...]
 */
export function displayedDistribution(distributions, col, columnTypes) {

    if( distributions.has(col)){
        let distObj = distributions.get(col);
        if(isColumnNumeric(col, columnTypes)){
            return _.orderBy(distObj, [(bar)=>Number(bar.dataValue)], ['asc']);
        }
        return _.orderBy(distObj, [(bar)=>bar.dataValue], ['asc']);;
    }
    return [];

}




/**
 *
 * @param distribution is an array of bar objects: {dataValue, count, ids, labels}
 * @param rowIdsToRender is an array of the rowIds that are rendered in the data table
 * @returns an array of bar objs: {count}
 *          where count is number of rows in rowIdsRender
 */
export function filteredDistribution(distribution, rowIdsToRender) {
    return distribution
    /*return distribution? distribution.map((b) => {
        const count = b['ids'].filter((rowId) => rowIdsToRender.includes(rowId)).length;
        return {'count': count};
    }):[];*/
}