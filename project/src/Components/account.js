import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'

class AccountDetail extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <div className="outer">
                    <button className="back"><Link to="./Form" className="link1">&larr; &nbsp; Go Back</Link></button>
                    <div className="accDiv">
                        <p className="details">Account Details</p>
                        <button className="dltAcc">Delete Account</button>
                    </div>
                    <hr width='100%' />
                    <p className="accountHash">Account #</p>
                    <p className="idNumber">{this.props.accounts.name}</p>
                </div>

            </div>
        )


    }

}

let mapStateToProps = (store) =>{
    return{
        accounts: store.accountsReducer,
        detail: store.detailAccount
    }
}

export default connect(mapStateToProps)(AccountDetail);