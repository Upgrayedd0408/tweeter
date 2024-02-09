/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  function createTweetElement(tweetData) {
    const formattedDate = moment(tweetData.created_at).fromNow();

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const elementHTML = `
      <article class="tweet">
        <header>
          <div>
            <img src=${tweetData.user.avatars}>
            <h3>${tweetData.user.name}</h3>
          </div>
          <h3>${tweetData.user.handle}</h3>
        </header>

          <p>${escape(tweetData.content.text)}</p>

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

  const renderTweets = function (tweets) {
    $('.tweets-container').empty();
    tweets.forEach(function (tweet) {
      // Here, call createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
      // Then, append it to the tweets container
      $('.tweets-container').prepend($tweetElement);
    });
  };

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        console.log('Success: ', renderTweets(data))
        console.log(data);
      });

  };

  loadTweets();



  $("section.new-tweet form").on("submit", function (handler) {
    event.preventDefault();

    let inputLength = $(this).closest('form').find('textarea').val().length;
    let characterCount = 140 - inputLength;

    if (characterCount < 0) {
      $('.over-140').slideDown("slow")
      return;
    }

    if (characterCount === 140) {
      $('.no-text').slideDown("slow");
      return;
    }

    $('.over-140').slideUp('slow');
    $('.no-text').slideUp("slow");

    let serialData = $(this).serialize();
    $.post("/tweets", serialData)
      .then(() => {
        loadTweets()
      });

    $('textarea').val('').trigger("input");
    
  });


});