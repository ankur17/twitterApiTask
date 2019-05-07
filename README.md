# Algoscale: Twitter Api Task

### Stack used
***
1. Front end : React, css
2. DB : No-SQL (Firebase)
3. Authentication: Google authentication
4. Back end : NodeJs
5. Extra module import : twitter api module for JS




All tasks given in the project have been implemented and completed.

### Project flow
***
The entire project is a single page web application which reduces the unnecessary network calls and server load.
The website is first opened with the login screen. The login credentials are taken from the Google profile. If the user enters the link manually then it is taken to login screen. The login credentials are saved on the client side. In the Navigation bar, there is home and profile (written welcome <user-name> )
In the home button, only the search bar is there. The user enters the tweet he/she wants to search.
User may archive any of the tweets they want. The archived tweets are seen on the profile page.
The last search is stored in the database. So next time when the user comes, it is shown that last searched tweets.


Run Project
***
```
git clone https://github.com/ankur17/twitterApiTask
cd twitterApiTask
npm install
gulp
```
