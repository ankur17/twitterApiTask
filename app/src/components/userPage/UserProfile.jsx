import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import NotLoggedIn from './NotLoggedIn.jsx';
import CustomTweetListView from './../helpers/customTweetListView'

class UserProfile extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  	    userOverride : true,
    };
  }


  render() {
    return (
      <div>
        <h3 style={{paddingLeft:'30px'}}>Hello, { (USER && USER.full_name) || 'Guest'}</h3>
        <hr />
        {this.state.userOverride ? <TempComponent /> : <h1>NOT LOGGED IN</h1>}

    </div>
    );
  }

}


class TempComponent extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      tweets : []
    };
  }

  componentWillMount() {

      console.log("GETTING THE ARCHIVED TWEETS");
      var url = '/ajax/tweets/archived/all'
      fetch(url, {
          method:'GET',
          credentials: 'include'
      })
          .then(function(response) {
            return response.json();
            // return response.text()
        })
          .then(txt=>{
              console.log("GETTING THE ARCHIVED TWEETS","RESULT",txt)
              let arr = []
              for(let each in txt.data){
                  console.log("PUSEDDD",txt.data[each].id)
                  if(each == "corrupted")
                      continue
                  arr.push(txt.data[each])
              }
              this.setState({
                  tweets : [...arr]
              })

    });


  }

  render() {
    let {photo,userId,full_name,email} = USER

      let shower;
      if(this.state.tweets.length){
          shower = this.state.tweets.map((value,index)=>{
              return ( <CustomTweetListView key={value.id} isArchived={true} data={value}/>)
          })
      } else {
          shower = null
      }
    return (
      <div className="contain">
        <div  className="profileBox">
            <div className="profileLeft" >
                <img src={USER.photo} />
            </div>

                <div className="vertical" />

            <div className="profileRight">
                <table style={{width:'100%'}}>
                    <tr>
                        <th width={'80px'}>User Id: </th>
                        <td colspan={"3"}>{" "+USER.userId}</td>
                    </tr>

                    <tr>
                        <th width={'80px'}>Full Name: </th>
                        <td colspan={"3"}>{" "+full_name}</td>
                    </tr>
                    <tr>
                        <th width={'80px'}>Email Id:</th>
                        <td>{" "+email}</td>
                    </tr>
                </table>

            </div>

      </div>
          <div  className="archiveHeading">
              <h4>My Archived Tweets</h4>
          </div>
          <div className="tweetsContainer">
              {shower}
          </div>
    </div>
    );
  }

}


UserProfile.defaultProps = {
override : false,
};



export default UserProfile;
