import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// require('../styles/admin.css');

export default class TopBar extends Component {

    checkLoggedin(){

      if (USER.full_name){
        const userId = USER.userId;
        // const temp = "/user/"+userId;   !!!check this
        const temp = "/details/user/"+userId;
        return (<li><Link to={temp}>Welcome {USER.full_name || 'Guest'}</Link></li>)
      } else {
        return (<li><a href="/auth/google">Log In</a></li>)
      }
    }
    render() {
        return (
  <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="/view#/home">
      <img src="dist/images/logo.png" width="25" height="25" margin="0" />
    </a>
    </div>
    <ul className="nav navbar-nav">
      <li><a href="/view#/home">Home</a></li>

      {this.checkLoggedin()}


      {USER.full_name ? <li><a href="/logout">Logout</a></li> : null}


    </ul>
  </div>
</nav>
      );
    }
}
