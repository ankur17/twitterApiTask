var admin = require("firebase-admin");
var utils = require("./utils");

var serviceAccount = require("../../../app/keys/algoscale-firebase-adminsdk.json");
admin.initializeApp({
    databaseURL: "https://algoscale-736ec.firebaseio.com",
    credential: admin.credential.cert(serviceAccount),
});
// var storage = admin.storage();
var db = admin.database();

var usersRef = db.ref("/algoscale/private/users/");


function getAll(ref, offset, limit, older, callback) {
    if (!offset) {
        ref.orderByChild("id").limitToLast(limit).once("value", function(snapshot) {
            if (snapshot && snapshot.val()) {

                callback(null, Object.values(snapshot.val()));
            } else {
                callback(null, [], 'Error'); // what the hack
            }
        });
    } else if (older) {
        ref.orderByChild("id").endAt(offset).limitToLast(limit).once("value", function(snapshot) {
            if (snapshot && snapshot.val()) {

                callback(null, Object.values(snapshot.val()));
            } else {
                callback('Error');
            }
        });
    } else {
        ref.orderByChild("id").startAt(offset).limitToFirst(limit).once("value", function(snapshot) {
            if (snapshot && snapshot.val()) {
                callback(null, Object.values(snapshot.val()));
            } else {
                callback('Error');
            }
        });
    }
}

var UserService = {
    authorize: function(user, callback) {
        var userKey = utils.strHash(user.email);
        usersRef.child(userKey).once("value",function(snapshot) {
            var myUser = snapshot.val();
            if( myUser ){
              callback(null,myUser);
            }else{
              UserService.create(user,callback);
            }
        });
    },
    create: function(user, callback) {
        var hash = utils.strHash(user.email);
        let encode = user.email.substring(0,user.email.lastIndexOf('.')).replace('@','_')+"-"+hash; // ankurhinshirts-#
        user.userId = encode;

        usersRef.child(encode).set(user, function(err) {
            if (err) {
                callback('Unexpected Error, Try Again', null);
            } else {
                callback(null, user);
            }
        });
    },

  }

module.exports = UserService;
