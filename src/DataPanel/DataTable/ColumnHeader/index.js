import React from 'react';
import _ from 'lodash';
import SortIcon from './SortIcon/index';
import './index.scss';
import FullTextTooltip from '../FullTextTooltip/index';

class ColumnHeader extends React.Component {
    constructor(props) {
        super(props);
        this.allElements = new Map();
        this.contentRef = (col, elem) => this.allElements.set(col, elem);
        this.state = {
            hoveredElem: null,
            hoveredCol: null
        }
    }

    setHoverState(col){
        if(_.isNull(col) || _.isUndefined(col)){
            this.setState({
                hoveredElem: null,
                hoveredCol: null
            });
        }


        this.setState({
            hoveredElem: this.allElements.get(col),
            hoveredCol: col
        });
    }



    render() {
        let application = this.props.application;
        let columns = this.props.columns;
        let currSort = application.sort;

        const margins = application.renderConst.margins;
        const widthSuspectHeader = margins;
        const columnWidth = application.renderConst.columnWidth;

        const columnTypes = this.props.columnTypes;

        let sortIcon = (col) => currSort && currSort.col && currSort.col == col ? <SortIcon column={col} sort={currSort}></SortIcon> : '';

        let columnTypeTextDisplay = (type) => {
            if(type=='string' || type =='character varying'){
                return 'abc123'
            }if(type=='integer' || type == 'numeric'){
                return '123'
            }
            return type;
        };

        if(columns<=0 ){
            return '';
        }

        let columnElements = columns.map((col) => {

            let totalIconWidth = 0;
            totalIconWidth = totalIconWidth + (currSort && currSort.col && currSort.col == col ? 20 : 0);
            totalIconWidth = totalIconWidth + (widthSuspectHeader*2);

            return <div className='th' key={'th-' + col}
                        onMouseOver={()=>this.setHoverState(col)}
                        onMouseLeave={()=>this.setHoverState(null)}
            >

                <FullTextTooltip
                    clickFunc={application.toggleSort}
                    parentElem={this.state.hoveredElem}
                    fulltext={col}
                >
                </FullTextTooltip>
                <span onClick={() => application.toggleSort(col)}
                        style={{'width': columnWidth + 'px'}}
                >
                    <span className={'column-header '}
                         style={{'width': (columnWidth - totalIconWidth) + 'px'}}
                         ref={(elem)=>this.contentRef(col, elem)}>

                       <span className={'label'} style={{'marginRight': margins + 'px'}}>
                           {col}
                       </span>
                       <span className={'sub-label'}>
                           {columnTypes.has(col) ? columnTypeTextDisplay(columnTypes.get(col)) : ''}
                       </span>

                    </span>

                    {sortIcon(col)}

                </span>
            </div>
        });

        return <div className='tr'>
            {columnElements}
        </div>;
    }
}

export default ColumnHeader;