var request = require('request');
var services = require(_dir.DIR_SERVICES);
var fs = require('fs');
var fetch = require('node-fetch');
var UserService = services.UserService;


var TwitterService = services.TwitterService



module.exports = {
    testController: function(req,res){
        res.send({ans : "This controller is really working"});
    },

    getTweets : function (req,res) {

        let search = req.params.searchText || "";
        let param = {};

        // if(search==""){
        //     res.send({
        //         err : "EMPTY SEARCH",
        //         data : {
        //             tweets : {
        //                 statuses : []
        //             }
        //         }
        //     })
        //     return
        // }



        if (req.query.filter!="0"){
            param = {
                since : req.query.since.replace("/","-").replace("/","-"),
                until : req.query.until.replace("/","-").replace("/","-"),
            }
        }

        TwitterService.searchTweet(search,param,(err,data)=>{
            res.send({
                err:err,
                data : data
            })
        })
    },

    saveTweet : function (req,res) {
        let data = req.body;
        let user = req.user;
        UserService.saveTweet(user,data,(err,result)=>{
            res.send({
                err : err,
                result : result
            })
        })
    },
    getArchivedTweets: function (req,res) {
        let user = req.user;
        UserService.getAllArchivedTweets(user,(err,data)=>{
            res.send({
                err : err,
                data : data
            })
        })
    },

    deleteArchivedTweet: function (req,res) {
        let user = req.user;
        let tweet_id = req.params.tweet_id || "";
        UserService.deleteArchivedTweet(user,tweet_id,(err,data)=>{
            res.send({
                err : err,
                data : data
            })
        })
    },


    getTweetInRange : function (req,res) {
        let query = {}
        TwitterService.searchInRange(query,(err,data)=>{
            res.send({
                err : err,
                data : data
            })
        })

    },

    setHistoryTweets: function (req,res) {
        let data = req.body;
        let user = req.user;
        UserService.setHistoryTweets(user,data,(err,data)=>{
            res.send({
                err : err,
                data : data
            })
        })
    },

    getHistoryTweets: function (req,res) {
        let user = req.user;
        UserService.getHistoryTweets(user,(err,data)=>{
            res.send({
                err : err,
                data : data
            })
        })
    }



};
