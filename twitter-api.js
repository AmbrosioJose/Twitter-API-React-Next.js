config = require( './config.json');
Twitter = require( 'twitter');


let client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token,
    access_token_secret: config.token_secret
  });
  



// gets the latest tweets containing batman
// client.get('search/tweets', {q: 'Batman'}, function(error, tweets, response) {
//     if(error)
//         throw error
//     else{
//         tweets.statuses.forEach( (twt)=>{console.log('tweet:--------- \n' + twt.text)})
//         //console.log(tweets)
//     }
//  });

// url GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2
let screenName = 'Btmn_Ambrosio';
let tweetCount = 2;
//Gets a certain number of tweets from user.
exports.getTweets = () => {
        return new Promise ((resolve,reject)=>{

            client.get('statuses/user_timeline',{screen_name:screenName,count:tweetCount},function(error, tweets, response) {
                if(error){
                    reject('error')
                    throw error
                }
                else{
                    tweets.forEach( (twt)=>{console.log('tweet:--------- \n' + twt.id)})
                    console.log('---------------------------------')
                    
                    resolve(tweets)

                }
            });
        });
}

exports.searchTweets = (term) => {
    return new Promise ((resolve,reject)=>{
        // gets most recent tweets with this term
        //client.get('search/tweets', {q: term}, function(error, tweets, response) {
        
        // gets most popular tweets containing given term
        client.get('search/tweets', {q: term, result_type:'popular'}, function(error, tweets, response) {
            if(error){
                reject(error)
                throw error
            }
            else{
                resolve(tweets.statuses)
            }
        });
    });
}