import React, { Component } from 'react';
import AccountDetail from './account.js'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
class Form extends Component {


    newAccount = () => {
        let inputName = this.refs.name.value
        let inputType = this.refs.type.value
        let inputPrice = this.refs.price.value
        let randomNumber =Math.random()*1000000000000000000;

        let account = { id: randomNumber, name: inputName, accountType: inputType, balance: inputPrice }
        this.props.dispatch({ type: 'ADDED', payload: account })
        
        
    }


    render() {
        console.log(this.props)
        return (
            <div>
                <div className="formOuter">
                    <div className="formHead">
                        <p>Enter Account Details Below</p>
                    </div>
                    <div className="form">
                        <form action="">
                            <label htmlFor="" className="label">Full Name<sup>*</sup></label>
                            <input type="text" ref="name" required className="input" placeholder="Enter Full Name Here" />
                            <hr width="100%" className="hr" />
                            <label htmlFor="" className="label">Account Type<sup>*</sup></label>
                            <select name="" className="select" ref="type">
                                <option value="1">Select Account Type</option>
                                <option value="Current">Current</option>
                                <option value="Savings">Savings</option>
                            </select>
                            <hr width="100%" className="hr" />
                            <label htmlFor="" className="label">Initial Deposit in Rs.<sup>*</sup></label>
                            <input type="<number></number>" ref="price" required className="input1" placeholder="1000" />
                            <hr width="100%" className="hr" />
                            <Link to='/account' className="linkBank"><button className="btnAccount" onClick={this.newAccount}>Create Account</button></Link>
                            <button className="btnAccount1">View All Accounts</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        accounts: store.accountsReducer,
        detail: store.detailAccount
    }
}

export default connect(mapStateToProps)(Form);