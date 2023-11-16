// addEventListener to run the fetch code
const errorDiv = document.querySelector("#error-alert");
let darkMode = false;

document.querySelector("#darkModeToggle").addEventListener("click", (e) => {
  if (darkMode) {
    darkMode = false;
    document.body.classList.remove("dark-mode");
  } else {
    darkMode = true;
    document.body.classList.add("dark-mode");
  }
});

document.querySelector("#search-bar-submit").addEventListener("click", (e) => {
  e.preventDefault();
  let subredditName = e.target.parentNode.children[1].value;
  fetch(`https://www.reddit.com/r/${subredditName}.json`)
    .catch((err) => {
      document.querySelector(
        "#search-results-list"
      ).innerText = `Hmmm, It seems that the subreddit "${subredditName}" does not exist, please try another one?`;
      return;
    })
    .then((data) => {
      return data.json();
    })
    .then(async (data) => {
      const subreddit = data;
      const ul = document.querySelector("#search-results-list");
      ul.innerHTML = "";
      // for each post
      for (let child of subreddit.data.children) {
        // get information (author, title, upvotes?, link)
        let author = child.data.author;
        let postURL = "https://www.reddit.com" + child.data.permalink;
        let authorURL = `https://www.reddit.com/user/${author}/`;
        let title = child.data.title;
        let selfText = child.data.selftext;

        const post = document.createElement("li");
        post.classList.add("post-card");

        const titleElement = document.createElement("h2");
        const titleLink = document.createElement("a");

        const authorElement = document.createElement("p");
        const authorLink = document.createElement("a");

        const div = document.createElement("div");

        titleLink.href = postURL;
        titleLink.innerText = title;
        titleLink.target = "_blank";
        titleElement.appendChild(titleLink);

        authorLink.href = authorURL;
        authorLink.innerText = author;
        authorLink.target = "_blank";
        authorElement.appendChild(authorLink);

        div.appendChild(authorElement);
        div.appendChild(titleElement);
        post.appendChild(div);
        if (
          child.data.thumbnail !== "self" &&
          child.data.secure_media === null &&
          child.data.thumbnail !== ""
        ) {
          let thumbnail = child.data.thumbnail;
          const thumbnailElement = document.createElement("img");
          thumbnailElement.src = thumbnail;
          post.append(thumbnailElement);
        } else {
          const selfTextContainer = document.createElement("p");
          const link = document.createElement("a");
          link.classList.add("blue-link");
          link.target = '_blank'
          link.innerText = " read more...";
          link.href = postURL;
          selfTextContainer.innerText = selfText.slice(0, 200);
          selfTextContainer.appendChild(link);
          div.appendChild(selfTextContainer);
        }

        ul.appendChild(post);
      }
    });
});
