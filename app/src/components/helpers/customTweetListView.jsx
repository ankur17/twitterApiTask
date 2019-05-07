
import React, { Component } from 'react';

import { Input, Button,notification} from 'antd';
const Search = Input.Search;

class CustomTweetTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            is_archived : this.props.isArchived
        }

        this.archiveButtonRender = this.archiveButtonRender.bind(this);
        this.saveTweet = this.saveTweet.bind(this);
        this.deleteTweet = this.deleteTweet.bind(this);
    }

    saveTweet(){
        let save_url = "/ajax/tweets/save"

        fetch(save_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.data),
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then(res=>{
            if(res.result){
                this.setState({
                    is_archived : true
                })
                this.fireNotification('success',"Archived!!",`${this.props.data.user.name} tweet is archived`)
            } else {
                this.setState({
                    is_archived : false
                })
            }
        }).catch(function(err){
            console.log("ERROR in saving tweet!!")
        });
    }


    fireNotification(type,msg,des){
        notification[type]({
            message : msg,
            description : des
        })
    }

    deleteTweet(){


        let del_url = `/ajax/tweets/archived/remove/${this.props.data.id}`

        fetch(del_url, {
            method: 'get',
            credentials: 'include'
        }).then(function(response) {
            return response.json();
        }).then(res=>{

            if(res.data){

                this.fireNotification('success',"Success!!",`${this.props.data.user.name} tweet is deleted`)
                this.setState({
                    is_archived : false
                })
            } else {
                this.setState({
                    is_archived : true
                })
            }
        }).catch(function(err){
            console.log("ERROR in saving tweet!!")
        });

    }


    archiveButtonRender(status){
        if(!status){
            return (
                <Button type="primary" style={{borderRadius : 10}} onClick={this.saveTweet} >Archive</Button>
            )
        } else {
            return(
                <Button onClick={this.deleteTweet} >Un-Archive</Button>
            )
        }
    }

    render(){
        if(this.props.data){
            return(
                    <div className="tweetOuterBox alternativeBackground">
                        <div className="tweetInnerHeading">
                            <div className="name">
                                <p>{this.props.data.user.name}</p>
                            </div>
                            <div className="savebutton">
                                {this.archiveButtonRender(this.state.is_archived)}
                            </div>
                        </div>
                        <hr />
                        <div className="tweetTime">
                            <p>{this.props.data.created_at}</p>
                        </div>
                        <div className="tweetInnerData">
                            <p>{this.props.data.text}</p>
                        </div>
                    </div>

            )
        }
        else {
            return (<h1>Ohh SHIT!!</h1>)
        }
    }
}


CustomTweetTable.defaultProps = {
    isArchived: false,
};


export default CustomTweetTable
