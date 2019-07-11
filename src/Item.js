import React from 'react';
import './Item.css';
import { Tweet } from 'react-twitter-widgets'
import Youtube from "./Youtube";

class Item extends React.Component {

    constructor(props) {
        super(props)
        this.state = {url: this.props.url, mute:'1'}
    }

    get_tweet_id = (tweet_url) => {
        return this.state.url.split('/status/')[1]
    }

    onload = () => {
        this.props.setSpans()
    }


    render() {
        const elem = this.state.url.includes('twitter') ? <Tweet tweetId = {this.get_tweet_id(this.state.url)} onLoad = {this.onload}/> : <Youtube mute={this.props.mute} url = {this.state.url} onLoad = {this.onload}/>

        return(<div className="item">
            {elem}
            </div>)
    }


}

export default Item;
