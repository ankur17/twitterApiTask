
var Twitter = require('twitter');

var twitterKeys = require("../../../app/keys/algoscale-twitter-sdk.json");

var client = new Twitter(twitterKeys);


var TwitterService = {
    searchTweet : function ( string,params,callback ) {
        let data = {};

        let query_params = {
            q : string,
            lang : "en",
            count : 100,
            ...params
        }

        client.get('search/tweets', query_params, function(error, tweets, response) {
            data['tweets'] = tweets
            callback(error,data)
        });

    },
    searchInRange :function (query,callback) {

        let injected_Query = {
            q: '#nodejs',
            lang : "en",
            count : 110,
            since : "2019-04-18",
            until : "2019-04-20"

        }

        client.get('search/tweets', injected_Query, function(error, tweets, response) {
            let data = {};
            data['tweets'] = [];
            for(let each in tweets.statuses){
                let temp = tweets.statuses[each]["created_at"].split(" ");
                data['tweets'].push(temp.splice(1,2))
            }
            data["count"] = tweets.search_metadata.count
            callback(error,data)
        });

    }
}

module.exports = TwitterService;

