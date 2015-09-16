/**
 * Set environment variables on windows (command line)
 * set MYVAR=MYVALUE
 * Set environment variables on linux (command line)
 * export MYVAR=MYVALUE
 *
 * @type {{mongodbInstance: (*|string), mongoDatabase: (*|string), appSecret: (*|string), appName: (*|string), cookieName: (*|string), httpPort: (*|string), facebook_app_id: (*|string), facebook_app_secret: (*|string)}}
 */
var config = {
    mongodbInstance:process.env.mongoDB||'My mongodb instance',
    mongoDatabase:process.env.MONGODATABASE||'multiAuth',
    appSecret:process.env.APPSECRET||'supersecret',
    appName:process.env.APPNAME||'MyApp',
    cookieName:process.env.KEY||'tokenizer',
    httpPort:process.env.PORT||'3000',
    facebook_app_id:process.env.FACEBOOK_APP_ID||'My facebook app id',
    facebook_app_secret:process.env.FACEBOOK_APP_SECRET||'My facebook app secret'
};

module.exports = config;