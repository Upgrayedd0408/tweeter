/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
/*   const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1706859768749
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1706946168749
    }
  ]; */

  function createTweetElement(tweetData) {
    const formattedDate = moment(tweetData.created_at).fromNow();

    const elementHTML = `
      <article class="tweet">
        <header>
          <div>
            <img src=${tweetData.user.avatars}>
            <h3>${tweetData.user.name}</h3>
          </div>
          <h3>${tweetData.user.handle}</h3>
        </header>

          <p>${tweetData.content.text}</p>

        <footer>
          <h6>${formattedDate}</h6>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>

      </article>
  `;

    return $(elementHTML);
  }

/*   const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1706859768749
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1706946168749
    }
  ]; */

  const renderTweets = function(tweets) {
    tweets.forEach(function(tweet) {
      // Here, call createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
      // Then, append it to the tweets container
      $('.tweets-container').append($tweetElement);
    });
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log('Success: ', renderTweets(data))
    });

  };

  loadTweets();
  


  $("section.new-tweet form").on("submit", function(handler) {
    event.preventDefault();

    let inputLength = $(this).closest('form').find('textarea').val().length;
    let characterCount = 140 - inputLength;

    if(characterCount < 0) {
      alert("Tweet is over the 140 character limit");
      return;
    }

    if(characterCount === 140) {
      alert("Please enter text into the field below");
      return;
    }

    let serialData = $(this).serialize();
    $.post("/tweets", serialData);
    console.log(serialData);
  })


});