import React,{Component} from 'react';
import './header.css';
import {Link} from 'react-router-dom';

import logo from "../../assets/imgs/white-logo.png";

class Header extends Component{   
    render(){
    return(
      <div className="header">
         <nav className="Menu">
            <Link to="/">
                <img className="logo" src={logo} alt="logo"/>
            </Link>
            
        </nav>
      </div>
    );
  }
}

export default Header;