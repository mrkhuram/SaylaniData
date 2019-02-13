import React, { Component } from 'react'

export default class Content extends Component {
     
    state = {
        display: 'true',
        itemList: ['Biryani', 'Raita']
    }

    itemHandler = () =>{
        let arr = this.state.itemList.slice()
        var item = this.refs.menu_added.value;
        arr.push(item)
        this.setState({itemList: arr})
    }

    render() {
        console.log(this.state)

        return (
            <div>
                <div style={{textAlign:'center'}}>
                    <input type="text" ref="menu_added" placeholder="Enter Item Name" style={{ textAlign: 'center', }} />
                    <button style={{marginLeft:'20px'}} onClick={this.itemHandler}>ADD</button>
                </div>
            </div>
        )
    }
}
