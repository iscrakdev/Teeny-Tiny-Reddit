// addEventListener to run the fetch code
const errorDiv = document.querySelector('#error-alert')
let darkMode = false

document.querySelector("#darkModeToggle").addEventListener('click', (e) => {
    if (darkMode){
        darkMode = false
        document.body.classList.remove('dark-mode')
    } else {
        darkMode = true
        document.body.classList.add('dark-mode')
    }
})

document.querySelector("#search-bar-submit").addEventListener("click", (e) => {
    e.preventDefault()
    let subredditName = e.target.parentNode.children[1].value
    fetch(`https://www.reddit.com/r/${subredditName}.json`)
    .catch((err) => {
        document.querySelector('#search-results-list').innerText = `Hmmm, It seems that the subreddit "${subredditName}" does not exist, please try another one?`
        return
    })
    .then((data) => {
        console.log(data)
        return data.json()
    })
    .then((data) => {
        console.log(data.data.children.length)
      const subreddit = data;
      const ul = document.querySelector("#search-results-list");
      ul.innerHTML = "";
      // for each post
      for (let child of subreddit.data.children) {
        // get information (author, title, upvotes?, link)
        // console.log(child.data);
        let author = child.data.author;
        let postURL = child.data.url;
        let authorURL = `https://www.reddit.com/user/${author}/`;
        let title = child.data.title;

        const post = document.createElement("li");
        post.classList.add("post-card");

        const titleElement = document.createElement("h2");
        const titleLink = document.createElement("a");

        const authorElement = document.createElement("p");
        const authorLink = document.createElement("a");

        titleLink.href = postURL;
        titleLink.innerText = title;
        titleLink.target = "_blank";
        titleElement.appendChild(titleLink);

        authorLink.href = authorURL;
        authorLink.innerText = author;
        authorLink.target = "_blank";
        authorElement.appendChild(authorLink);

        post.appendChild(authorElement);
        post.appendChild(titleElement);

        ul.appendChild(post);
      }
    });
});
