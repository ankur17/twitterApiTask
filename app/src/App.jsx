import React, { Component } from 'react';
import TopBar from './components/TopBar.jsx';
// import Footer from './components/Footer.jsx';




export default class App extends Component {
    render() {
        return (

          <div>
				<TopBar />

				<div style={{paddingLeft:30}}>
					{this.props.children}

				</div>

      </div>



        );
    }
}
