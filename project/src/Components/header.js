import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Header extends Component{

    render(){

        return(
            <div>
                <div className="header">
                    <p className="heading bank"><Link to='./App' className="linkBank">Bank</Link></p>
                    <div className="right">
                        <span className="rightContent">
                            <Link to='./App' className="linkBank">Dashboard</Link>
                        </span>
                        <span className="rightContent">
                            <Link to='./App' className="linkBank">Accounts</Link>
                        </span>
                        <span className="rightContent">
                            <Link to='./App' className="linkBank">Transactions</Link>
                        </span>
                    </div>
                </div>

            </div>

        )
    }
}

export default Header;