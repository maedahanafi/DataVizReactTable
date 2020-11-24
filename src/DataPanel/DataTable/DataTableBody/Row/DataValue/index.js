import React from 'react';

class DataValue extends React.Component {
    constructor(props) {
        super(props);
        this.contentElement = null;
        this.contentRef = (elem) => this.contentElement = elem;

    }


    render() {
        const rowId = this.props.rowId;
        const col = this.props.col;
        const value = this.props.value;

        let application = this.props.application;
        const filter = application.filter;
        const columnWidth = application.renderConst.columnWidth;
        const highlightColor = application.renderConst.highlightColor;

        let filterValues = filter? filter.values: '';
        let backgroundColor = filterValues.length>0 && value.includes(filterValues) ?
            highlightColor: 'white';

        let style = {
            'width': columnWidth,
            'backgroundColor': backgroundColor//'rgba(0,0,0,0)'
        };
        return <div className='td' >
            <span ref={this.contentRef}
                  style={style}
            >
                {value}
            </span>
        </div>;
    }
}

export default DataValue;