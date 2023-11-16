// addEventListener to run the fetch code

fetch("https://www.reddit.com/r/javascript.json")
.catch(err => console.error(err))
.then(data => data.json())
.then((data) => {
    const subreddit = data
    const ul = document.querySelector('#search-results-list')
    ul.innerHTML = ''
    // for each post
    for (let child of subreddit.data.children) {
        // get information (author, title, upvotes?, link)
        console.log(child.data)
        let author = child.data.author
        let postURL = child.data.url
        let authorURL = `https://www.reddit.com/user/${author}/`
        let title = child.data.title

        const post = document.createElement('li')
        post.classList.add('post-card')
        
        const titleElement = document.createElement('h2') 
        const titleLink = document.createElement('a')
        
        const authorElement = document.createElement('p')
        const authorLink = document.createElement('a')

        titleLink.href = postURL
        titleLink.innerText = title
        titleLink.target = '_blank'
        titleElement.appendChild(titleLink)
        
        authorLink.href = authorURL
        authorLink.innerText = author
        authorLink.target = '_blank'
        authorElement.appendChild(authorLink)

        post.appendChild(titleElement)
        post.appendChild(authorElement)

        ul.appendChild(post)
    }
})