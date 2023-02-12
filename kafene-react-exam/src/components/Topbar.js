import React from 'react';
import './Topbar.css'
import logo from '../Assets/Logo.png'
import { withRouter, Link } from 'react-router-dom';
import { setAuth, isAuth } from '../Authentication/Auth'

const Topbar = (props) => {

    const Logout = () => {
        setAuth(false);
        return props.history.push('/');
    }

    const  isActive = {
        'order': false,
        'product': false,
        'users': false
    };

    const pageName=props.location.pathname.slice(1);
    isActive[pageName]=true;
    return ( 
        <header className="top-bar">
            <div className="left-part">
                <div className="logo">
                    <img src={logo} alt="page-logo.png" />
                    <p>Kafene</p>
                </div>
                <nav className="nav-bar">
                <Link className={isActive['order'] ? "MenuItem active" : "MenuItem"} to='/order' >Orders</Link>
                <Link className={isActive['product'] ? "MenuItem active" : "MenuItem"} to='/product' >Products</Link>
                <Link className={isActive['users'] ? "MenuItem active" : "MenuItem"} to='/users' >Users</Link>
                </nav>
            </div>
            {isAuth() ? <button className="button" onClick={Logout} > Logout </button> : ""} 
        </header>
    );
}
 
export default withRouter(Topbar);