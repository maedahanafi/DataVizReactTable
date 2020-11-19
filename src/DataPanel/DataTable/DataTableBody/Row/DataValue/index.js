import React from 'react';

class DataValue extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.filter = this.application.filter;
        this.columnWidth = this.application.renderConst.columnWidth;
        this.rowId = props.rowId;
        this.col = props.col;
        this.value = props.value;
        this.backgroundColor = props.backgroundColor;

        this.contentElement = null;
        this.contentRef = (elem) => this.contentElement = elem;

    }


    render() {

        let filterValues = this.filter? this.filter.values: '';

        let style = {
            'width': this.columnWidth,
            'backgroundColor': 'rgba(0,0,0,0)'
        };

        let highlightClassName = filterValues.length>0 && this.value.includes(filterValues) ?
            'highlight': '';

        return <div className='td' >
            <span ref={this.contentRef}
                  style={style}
                  className={highlightClassName}
            >
                {this.value}


            </span>
        </div>;
    }
}

export default DataValue;