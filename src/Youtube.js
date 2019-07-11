import React from 'react';
import './Item.css';
import { Tweet } from 'react-twitter-widgets'

class Youtube extends React.Component {

    constructor(props) {
        super(props)
        this.state = {url: this.props.url}
    }


    render() {

        return(<div>
            <iframe width="600" height="400" src= {this.state.url + '&autoplay=1&mute=' + this.props.mute} onLoad={this.props.onLoad}></iframe>
            </div>)
    }


}

export default Youtube;


