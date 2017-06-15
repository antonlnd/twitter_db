'use strict';
var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var client = require('../twitterdb');




module.exports = function makeRouterWithSockets (io) {


  function respondWithAllTweets (req, res, next){
      // var allTheTweets = tweetBank.list();
      client.query('select * from tweets inner join users on users.id = tweets.user_id', function (err, result) {
        if (err) return next(err);
        var tweets = result.rows;
        res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true});
      });
    }

  function respondWithAllTweets (req, res, next){
      // var allTheTweets = tweetBank.list();
      client.query('select * from tweets inner join users on users.id = tweets.user_id', function (err, result) {
        if (err) return next(err);
        var tweets = result.rows;
        res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true});
      });
    }




  // a reusable function

// client.query('SELECT name FROM users WHERE name=$1', ['Nimit'], function (err, data) {/** ... */});

// client.query('INSERT INTO tweets (userId, content) VALUES ($1, $2)', [10, 'I love SQL!'], function (err, data) {/** ... */});

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page



  router.get('/users/:username', function(req, res, next){
    client.query('select * from tweets inner join users on users.id = tweets.user_id where name = $1', [req.params.username], function (err, result) {
        if (err) return next(err);
        var tweets = result.rows;
        res.render('index', {
          title: 'Twitter.js',
          tweets: tweets,
          username : req.params.username,
          showForm: true,
        })
    });
  });


  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    client.query('select * from tweets where id = $1', [req.params.id], function (err, result) {
      if (err) return next(err);
      var tweets = result.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
      })
    });
  });
  //   var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsWithThatId // an array of only one element ;-)
  //   });
  // });



  // create a new tweet
  router.post('/tweets', function(req, res, next){
    client.query('insert into tweets (user_id, content), values ($1, $2)', [req.body.name, req.body.content], function (err, result) {
      if (err) return next(err);
      res.redirect('/tweets');
    })
  });

  //   var newTweet = tweetBank.add(req.body.name, req.body.content);
  //   io.sockets.emit('new_tweet', newTweet);
  //   res.redirect('/');
  // });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
