import React from 'react';

class LoadingIcon extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const isLoading = this.props.isLoading;


        return isLoading? <img src='img/loading.gif' style={{width:'1em', height: '1em'}}></img>: '';
    }

}

export default LoadingIcon;