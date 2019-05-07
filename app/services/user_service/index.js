var service = require('./service')
var userCRUD = require('./userCRUD')

module.exports = {
    authorize: service.authorize,
    create: service.create,

    saveTweet : userCRUD.saveTweet,
    getAllArchivedTweets : userCRUD.getAllArchivedTweets,
    deleteArchivedTweet : userCRUD.deleteArchivedTweet,
    setHistoryTweets : userCRUD.setHistoryTweets,
    getHistoryTweets : userCRUD.getHistoryTweets,

};
