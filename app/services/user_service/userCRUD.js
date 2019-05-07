
var firebase = require("firebase-admin");
var db =  firebase.database();


var dbmain = db.ref("/algoscale/");
var dbSaveTweetRef = db.ref("/algoscale/private/archives");
var dbHistoryRef = db.ref("/algoscale/private/history");


var Operations = {
    saveTweet : function(user,data,callback){
        let USER = (user && user.userId) || false;
        if ( !USER ){
            callback("USER NOT FOUND",false )
            return null;
        }
        let Child = `${USER}/tweets/${data.id||"corrupted"}`
        dbSaveTweetRef.child(Child).set(data,(err)=>{
            if(err){
                callback("Unable to save",false )
            } else {
                callback(null,true)
            }
        })

    },

    getAllArchivedTweets : function (user, callback) {
        let USER = (user && user.userId) || false;
        if ( !USER ){
            callback("USER NOT FOUND",false )
            return null;
        }
        let Child = `${USER}/tweets`

        dbSaveTweetRef.child(Child).once("value",(snapshot)=>{
            if(snapshot && snapshot.val()){
                callback(null,snapshot.val())
            } else {
                callback(null,null)
            }

        })
    },

    deleteArchivedTweet : function (user,tweet_id, callback) {
        let USER = (user && user.userId) || false;
        if ( !USER ){
            callback("USER NOT FOUND",false )
            return null;
        }

        if(!tweet_id.length){
            callback("TWEET ID NOT PRESENT",false)
            return null;
        }

        let Child = `${USER}/tweets/${tweet_id}`
        dbSaveTweetRef.child(Child).set(null,(err)=>{
            if(err){
                callback("Unable to delete",false )
            } else {
                callback(null,true)
            }
        })

    },
    getHistoryTweets : function (user,callback) {

        let USER = (user && user.userId) || false;
        if ( !USER ){
            callback("USER NOT FOUND",false )
            return null;
        }

        let Child = `${USER}/tweets`;
        dbHistoryRef.child(Child).once('value',(snapshot)=>{
            if(snapshot && snapshot.val()){

                let data_array = Object.values(snapshot.val())
                callback(null,data_array)
            } else {
                callback(null,null)
            }
        })

    },
    setHistoryTweets : function (user,data,callback) {

        let USER = (user && user.userId) || false;
        if ( !USER ){
            callback("USER NOT FOUND",false );
            return null;
        }

        data = data["data"];

        let Child = `${USER}/tweets`;
        let temp_obj = {}

        for(let each=0;each<data.length;each++){
            temp_obj[data[each]["id"]] = data[each]

        }



        dbHistoryRef.child(Child).set(temp_obj,(error)=>{
            if(error){
                callback("FAILED TO STORE",false )
            } else {
                callback(null,true)
            }
        })

    }
}


module.exports = Operations;
