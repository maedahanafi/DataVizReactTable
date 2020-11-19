import React from 'react';
import _ from "lodash";

class FullTextTooltip extends React.Component{
    constructor(props){
        super(props);
        this.renderConst = {
            width: 220
        }

    }

    render(){

        const parentElem = this.props.parentElem;
        const fulltext = this.props.fulltext;
        let clickFunc = this.props.clickFunc;

        if(_.isNull(parentElem) || _.isUndefined(parentElem) || _.isNull(fulltext) || _.isUndefined(fulltext)){
            return '';
        }


        const colTypeStyle = {
            fontSize: 0.5 + 'em',
            margin: '1px 3px 1px 0px',
            'float': 'left',
            backgroundColor: 'whitesmoke'
        };

        const height = parentElem.getBoundingClientRect().height;
        const top = parentElem ? parentElem.getBoundingClientRect().top :0;
        const left = parentElem ? parentElem.getBoundingClientRect().left: 0;

        return '';
        /*
        return <span
            style={{
                top: top, left: left, position: 'absolute',
                width: this.renderConst.width, height: height,
                backgroundColor: 'whitesmoke', color: 'black',
            }}
            onClick={() => clickFunc(fulltext)}
        >
            {fulltext}
        </span>;*/
    }
}

export default FullTextTooltip;