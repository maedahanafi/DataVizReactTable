import React from 'react';
import './index.scss';

class SortIcon extends React.Component {
    constructor(props) {
        super(props);
        this.column = props.column;

    }

    render() {
        let currSortCol = this.props.sort.col;
        let currSortDir = this.props.sort.dir;

        const arrowDir = currSortDir == 'desc' ? 'down' : 'up';
        return <span className='sort-container'>
            <img src={'img/sort_' + arrowDir+'.svg'}></img>
        </span>
    }


}

export default SortIcon;