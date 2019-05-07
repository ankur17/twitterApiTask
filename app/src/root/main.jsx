import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './../styles/style.css';

import App from '../App.jsx';
import UserProfile from '../components/userPage/UserProfile.jsx';

import SearchTweets from '../components/home/SearchTweets'
import { HashRouter, Route, Redirect } from 'react-router-dom'


import { LocaleProvider } from 'antd';
import en_ES from 'antd/lib/locale-provider/en_US';


function appRouter(){
    return (
        <LocaleProvider locale={en_ES} >
            <HashRouter>
                <Route path='/' component={App}/>
                <Route path='/home' component={SearchTweets} />
                <Route path='/details/user/:userId' component={UserProfile} />
            </HashRouter>
        </LocaleProvider>

    )
}

function run() {
    ReactDOM.render(
        appRouter()
        , document.getElementById('root'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];
if ((loadedStates.indexOf(document.readyState) != -1) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}
