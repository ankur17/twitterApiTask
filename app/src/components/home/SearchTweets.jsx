

import React, { Component } from 'react';

import { Input, Spin } from 'antd';

import { DatePicker,Button,notification } from 'antd';
// import moment from 'moment';

const { RangePicker } = DatePicker;
const Search = Input.Search;
const dateFormat = 'YYYY/MM/DD';


import CustomTweetListView from './../helpers/customTweetListView'

class SearchTweets extends Component {
    constructor(props){
        super(props);
        this.state = {
            tweet_data: [],
            query_tweet : "",
            is_loading : true,
            filterRange : [],
            isFilterValid : false
        }
        this.searchTweet = this.searchTweet.bind(this)
        this.onChange = this.onChange.bind(this)
        this.filterAction = this.filterAction.bind(this)
    }

    componentWillMount() {

        let url = `/ajax/history/get`;
        fetch(url, {
            method:'GET',
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(txt=>{
                this.setState({
                    tweet_data: (txt && txt.data) || [],
                    is_loading : false,
                });
            });
    }

    fireNotification(type,msg,des){
        notification[type]({
            message : msg,
            description : des
        })
    }

    searchTweet(value){

        if(this.state.isFilterValid && (this.state.filterRange.length==0)){
            this.fireNotification("success","FILTER ERROR","select date range");
            return;
        }

        if ( value==undefined ){
            this.fireNotification("error","SEARCH TEXT","The search text cannot be empty");
        } else {
            if(value == "#"){
                this.fireNotification("error","SEARCH TEXT","The search text only #")
                return
            }
            else if (value== "" || value==" " || value==" "){
                this.fireNotification("error","SEARCH TEXT","The search text cannot be empty")
                return
            }
        }

        this.setState({
            query_tweet : value,
            is_loading:true,
        })


        let url = `/ajax/tweets/search/${value}?since=${this.state.filterRange[0]}&until=${this.state.filterRange[1]}&filter=${this.state.isFilterValid||"0"}`;
        fetch(url, {
            method:'GET'
            // credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(txt=>{

                // data is  [] type
                if(txt.data.tweets.statuses.length > 0){
                    this.saveToHistory({data : txt.data.tweets.statuses});
                    this.setState({
                        tweet_data: txt.data.tweets.statuses,
                        is_loading : false
                    });
                } else {
                    this.setState({
                        is_loading : false
                    });
                }

            });

    }


    saveToHistory(data){
        let save_url = `/ajax/history/set`;

        fetch(save_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
    }


    queryStringRender(queryData){
        if(queryData || queryData.length){

            if (queryData.length > 20)
                queryData = queryData.slice(0,20) + "..."
            return <h3 style={{marginTop :5}}>{`Showing tweets for: ${queryData}`}</h3>
        }
        return null

    }

    loaderRender(state){
        if (this.state.is_loading) {
            return (
                    <Spin size="large" className="spinner"/>
            )
        }

        return null;
    }


    onChange(val1,val2){
        this.setState({
            filterRange : val2
        })
    }

    filterAction(){
        // if (this.state.isFilterValid){
        //     this.setState({
        //         isFilterValid : false,
        //         filerRange : []
        //     })
        // }

        this.setState((state)=>{
            if(state.isFilterValid){
                return ({
                    isFilterValid : false,
                    filerRange : []
                })
            }
            return ({isFilterValid : true})
        })

    }

    filterRender(state){
        if(state){
            return (<Button style={{marginLeft :'5%'}} key="remove_filter" onClick={this.filterAction} >Remove Filter</Button>)
        }
        return (<Button style={{marginLeft :'5%'}} key="add_filter" onClick={this.filterAction} type="primary">Add Filter</Button>)
    }

    datePickerRender(state){
        if ( state ){
            return (
                <RangePicker
                    style={{
                        marginLeft : "1%",
                    }}
                    onChange={this.onChange}
                    format={dateFormat}
                    key="rangerpicker"
                />)
        }
        return null;
    }

    render() {

        let shower;
        if(this.state.tweet_data.length){
            shower = this.state.tweet_data.map((value,index)=>{
                return (<CustomTweetListView key={value.id} data={value}/>)
            })
        } else if(!this.state.is_loading && this.state.tweet_data.length==0) {
            shower = (
                <div key="div_empty" className="div_empty">
                    <h1>No Content</h1>


                </div>
            );

        } else {
            shower = null;
        }

        return (
            <div>
                <Search
                    placeholder="Enter search text"
                    size="large"
                    onSearch={this.searchTweet}
                    style={{
                        marginLeft : "3%",
                        width: '40%' ,
                    }}
                    key="tweeting_search"
                />

                {this.filterRender(this.state.isFilterValid)}
                {this.datePickerRender(this.state.isFilterValid)}

                <div className="searchedQuery">
                    {this.queryStringRender(this.state.query_tweet)}
                    {this.loaderRender(this.state)}
                </div>

                <div className="tweetsContainer">
                    {shower}
                </div>



            </div>
        );
    }

}


export default SearchTweets;
