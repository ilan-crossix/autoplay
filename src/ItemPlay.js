import React from 'react';
import axios from 'axios';
import Item from './Item';
import './ItemPlay.css'
import ReactDOM from 'react-dom';

class ItemPlay extends React.Component {

    constructor(props) {
        super(props)
        this.mute='1'
        this.state = {item:{url:'',timeout:'20',title:'',date:''},topic:this.props.topic, spans:0, mute:'1', timeout_state:''}
        this.setSpans = this.setSpans.bind(this)
        this.get_item()
        this.itemRef = React.createRef()
    }

    get_item = async () => {
        const res = await axios.get('http://127.0.0.1:5000/get_item?topic=' + this.state.topic)
        .then((item) => {
            console.log(this.mute)
            this.setState({item:item.data.results, mute: this.mute})
        }).catch((e) => {
            console.log(e)
        })
        setTimeout(() => {this.get_item()}, this.state.item.timeout == 0 ? 6500 : (parseInt(this.state.item.timeout) * 1000) + 3000)
    }

    setSpans = () => {
		const height = ReactDOM.findDOMNode(this.itemRef.current).clientHeight
		const spans = Math.ceil(height / 30)
		this.setState({spans:spans})

	}


    mute_func = () => {
        this.mute == '1' ? this.mute='0' : this.mute='1'
    }

    render() {
        return(
            <div className="item-play"  style={{gridRowEnd: `span ${this.state.spans}`}}>
                <h2 className={"topic"}> {this.state.topic} </h2><button type={"button"} onClick={this.mute_func}>{this.state.mute == '1' ? 'Unmute Next' : 'Mute Next'}</button>
                <Item mute = {this.state.mute} ref = {this.itemRef} url={this.state.item.url} key={this.state.item.url} setSpans = {this.setSpans}/>
            </div>
            )
    }


}

export default ItemPlay;
