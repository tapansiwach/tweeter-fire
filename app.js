const tweets = document.querySelector("#tweets");

const renderTweet = data => {
  const tweet = document.createElement("article");
  tweet.classList.add("tweet");
  tweet.innerHTML = `
      <div>
        <span>${data.userName}</span>
        <span>${data.userHandle}</span>
      </div>
      <p>${data.tweetText}</p>
      <hr>
      <div>
        <p>${data.timestamp}</p>
        <div class="tweet-icons">
          <i class="far fa-flag"></i>
          <i class="hidden fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
          <i class="hidden fas fa-heart"></i>
        </div>
      </div>
  `;
  tweets.appendChild(tweet);
};

// get data from firestore
db.collection('tweets').onSnapshot(qSnap => {
  qSnap.docs.forEach(doc => {
    const data = doc.data();
    renderTweet(data);
  });
});