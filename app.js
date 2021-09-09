const tweets = document.querySelector("#tweets");

const timeAgo = (milliseconds) => {
  let output = "";

  const seconds = milliseconds / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / (3600 * 24));
  const weeks = Math.floor(seconds / (3600 * 24 * 7));
  const months = Math.floor(seconds / (3600 * 24 * 30));
  const years = Math.floor(seconds / (3600 * 24 * 365));

  if (years > 0) {
    output += years;
    output += " year";
    output += (years > 1) ? "s " : " ";
    return output + "ago";
  }
  if (months > 0) {
    output += months;
    output += " month";
    output += (months > 1) ? "s " : " ";
    return output + "ago";
  }
  if (weeks > 0) {
    output += weeks;
    output += " week";
    output += (weeks > 1) ? "s " : " ";
    return output + "ago";
  }
  if (days > 0) {
    output += days;
    output += " day";
    output += (days > 1) ? "s " : " ";
    return output + "ago";
  }
  if (hours > 0) {
    output += hours;
    output += " hour";
    output += (hours > 1) ? "s " : " ";
    return output + "ago";
  }
  if (minutes > 0) {
    output += minutes;
    output += " minute";
    output += (minutes > 1) ? "s " : " ";
    return output + "ago";
  }

  return "some time ago";
};

const renderTweet = data => {
  const millisecondsAgo = Number(Date.now()) - data.timestamp;
  const time = timeAgo(millisecondsAgo);
  console.log(typeof time);

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
        <p>${timeAgo(millisecondsAgo)}</p>
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
db.collection('tweets').orderBy('timestamp', 'desc').onSnapshot(qSnap => {
  tweets.innerHTML = '';
  qSnap.docs.forEach(doc => {
    const data = doc.data();
    renderTweet(data);
  });
});

// save data to firestore
const button = document.querySelector("#compose-tweet-form button");
const form = document.querySelector("#compose-tweet-form");

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (form.tweetText) {
    db.collection('tweets').add({
      userName: 'user',
      userHandle: '@user',
      tweetText: form.tweetText.value,
      flagged: false,
      liked: false,
      idOfOriginalTweet: '',
      timestamp: Date.now()
    });
    form.tweetText.value = "";
  }
});