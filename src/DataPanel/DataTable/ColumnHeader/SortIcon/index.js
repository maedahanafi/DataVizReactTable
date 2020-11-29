import React from 'react';
import './index.scss';
import down from './img/sort_down.svg';
import up from './img/sort_up.svg';

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
            <img src={currSortDir == 'desc' ? down: up}></img>
        </span>
		  
		  /*return <span className='sort-container'>
            <img src={'img/sort_' + arrowDir+'.svg'}></img>
        </span>
		  /*return <span className='sort-container '>
				<div className={arrowDir}></div>
		  </span>;*/
    }


}

export default SortIcon;