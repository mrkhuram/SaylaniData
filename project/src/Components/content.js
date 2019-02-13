import React, { Component } from 'react';
import logo from './../Images/image1.PNG'
import logo1 from './../Images/image2.PNG'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

class Content extends Component
{


    
        

    render(){
       
        console.log(this.props)

        return(
            <div>
                <div className="leftPane">
                    <img src={logo} alt="" className="logo"/>
                    <p className="para" onClick={this.handleClick}>Accounts</p> 
                    <div className="btns">
                        <button className="addBtn"><Link to="./Form" className="link">+ Add Account</Link></button>
                        <button className="viewBtn">View All</button>
                    </div>
                    <hr width="400px"/>
                    <div className="accountInfo">
                        <p className="number">{this.props.accounts.length}</p>
                        <p className="account">Accounts</p>
                    </div>
                </div> 
                <div className="rightPane">
                    <img src={logo1} alt="" className="logoR"/>
                    <p className="paraR">Transactions</p>
                    <div className="btns">
                        <button className="viewBtn1">View All</button>
                    </div>
                    <hr width="400px"/>
                    <div className="accountInfo">
                        <p className="number">2</p>
                        <p className="account">Transactions</p>
                    </div>
                    <button className="bottombtn">Credits: Rs.2000</button>
                    <button className="bottombtnR">Debits: Rs. 0</button>
                </div> 
            </div>
        )
    }
    
}

const mapStateToProps = (store) => {
    return {
        accounts: store.accountsReducer
    }
}

export default connect( mapStateToProps )(Content);