import React from 'react';
import axios from 'axios';
import ItemPlay from './ItemPlay';
import './ItemList.css';

class ItemList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {topics:[]}
        this.get_topics()
    }

    get_topics = async () => {
        const res = await axios.get('http://127.0.0.1:5000/get_topics')
        .then((topics) => {
            this.setState({topics:topics.data.results})
        }).catch((e) => {
            console.log(e)
        })
    }

    render() {
        const item_list = this.state.topics.map((topic) => {return <ItemPlay key = {topic} topic = {topic}/>})
        return(
            <div id="item-list">
                <h1>AutoPlay</h1>
                {item_list}
            </div>
            )
    }


}

export default ItemList;
