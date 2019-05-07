var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/tweets/search/:searchText',controller.getTweets);
router.post('/tweets/save',controller.saveTweet);
router.get('/tweets/archived/all',controller.getArchivedTweets);
router.get('/tweets/archived/remove/:tweet_id',controller.deleteArchivedTweet);

router.get('/tweets/range',controller.getTweetInRange);


router.post('/history/set',controller.setHistoryTweets);
router.get('/history/get',controller.getHistoryTweets);





module.exports = router;
