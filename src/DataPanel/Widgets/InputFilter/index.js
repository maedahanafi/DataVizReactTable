import React from 'react';
import _ from 'lodash';

class InputFilter extends React.Component {

    constructor(props) {
        super(props);
        this.filterOn = props.filterOn; //e.g. 'column' or 'values' or 'label'

        this.commitValueToAppState = this.commitValueToAppState.bind(this);
        this.onUpdate = _.debounce(this.props.onUpdate, 150, {leading:true, trailing:true})

    }



    commitValueToAppState(event) {
        const value = event.target.value;
        this.onUpdate(this.filterOn, value);
    }

    render() {
        const userInput = this.props.filterValue != null ? this.props.filterValue : -1;
        return <input type='text'
                                  value={userInput}
                                  onChange={this.commitValueToAppState}
                                  placeholder={'filter ' + this.filterOn}/>;
        /* return this.filterOn == 'label' || this.filterOn =='col'?
            <select value={userInput} onChange={this.commitValueToAppState}>
                <option value='-1'>{'filter ' + this.filterOn}</option>
                {this.props.allLabels.map((label) =>
                    <option value={label} key={'filter-option-' + label}>
                        {label}
                    </option>
                )}
            </select>
            :
            <input type='text'
                   value={userInput}
                   onChange={this.commitValueToAppState}
                   placeholder={'filter ' + this.filterOn}/>;*/
    }
}

export default InputFilter;