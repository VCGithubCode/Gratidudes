let post = [{
    name: "mika",
    message: "Thank you!",
    sender: "Mika"
}, {
    name: "vernell",
    message: "You're Amazing",
    sender: "vernell"
}];

// prohibited words:
let prohibitedWords = ["fuck", "slut", "shit", "kill"];

// let userName = document.getElementById("name-input").value.trim();
// let userMessage = document.getElementById("message-input").value.trim();

let wall = document.getElementById("wall");
let errorMessage = document.getElementById("error-message");
let cards = document.getElementsByClassName("post-it-note");
let deleteButtonArray = document.getElementsByClassName("delete-button");

// Function to filter prohibited words 
function containsBadWords(userinput) {
    let lowerCaseInput = userinput.toLowerCase();

    for (let word of prohibitedWords) {
        if (lowerCaseInput.includes(word)) {
            errorMessage.innerText = "ERROR: Please stop using foul language";
            return true;
        }
    }

}

// Function to generate a post on the wall
function generatePost(post) {
    hideDeleteButton();

    const postItem = document.createElement("div");
    const postOptions = document.createElement("div")
    const deleteButton = document.createElement("button");
    const likeButton = document.createElement("button");
    const likeIcon = document.createElement("span");

    postItem.classList.add("post-it-note", "post-card");
    postItem.innerHTML = `
        <div class="post-too"><span>To:</span> ${post.name}</div>
        <div class="post-from"><span>From:</span> ${post.sender}</div>
        <div class="post-message">"${post.message}"</div>
    `;

    likeButton.classList.add("like-button");
    likeIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M31.11,11.85c0,8.35-13.85,18.15-15.11,18.15S.89,20.2.89,11.85,10.96-.75,16,6.81c5.04-7.56,15.11-3.31,15.11,5.04Z"/>
        </svg>
    `;
    likeButton.appendChild(likeIcon);

    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "delete";

    postItem.appendChild(postOptions);

    postOptions.classList.add("post-options");
    postOptions.appendChild(likeButton);
    postItem.appendChild(deleteButton);

    wall.prepend(postItem);

    // Add click event listener to the like button
    likeButton.addEventListener("click", function () {
        // Toggle between SVG heart and "Liked❤️" text
        if (likeButton.innerHTML.includes("Liked")) {
            likeButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M31.11,11.85c0,8.35-13.85,18.15-15.11,18.15S.89,20.2.89,11.85,10.96-.75,16,6.81c5.04-7.56,15.11-3.31,15.11,5.04Z"/>
                </svg>
            `;
        } else {
            likeButton.innerHTML = "Liked❤️";
        }
    });
    deletePost();
}


// Function to add recently added message to the wall
function addRecentMessage(recentPost) {
    generatePost(recentPost); // Use the generatePost function to add the post
}

// Function to add post to localStorage
function addToLocalStorage(post) {
    // Retrieve posts from localStorage, parse it, or default to an empty array if undefined
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    // Add the new post to the array
    posts.push(post);
    // Save the updated array back to local storage
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to retrieve and display posts from local storage
function retrieveAndDisplayPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    wall.innerHTML = ''; // Clear the wall first
    posts.forEach(generatePost); // Display each post on the wall
}

/**
 * Function to add a post tile to the wall
 */
function addPostTile() {
    const postTile = document.createElement("div");
    postTile.classList.add("post-add", "card");
    postTile.innerText = "Add a new Card";
    wall.appendChild(postTile);
    postTile.addEventListener("click", function () {
        form.style.display = "block";
    });
}

// Function to make ensure user fills input, Future feature: make sure we check alphanumeric responses.
function validateUserMessage() {
    let userName = document.getElementById("name-input").value.trim();
    let userMessage = document.getElementById("message-input").value.trim();
    let userSender = document.getElementById("sender-input").value.trim();
    if (userName === "") {
        console.log("Name needs to be filled");
        errorMessage.innerText = "ERROR: Please write the name of who you want to write a message";
        return false;
    } else if (userMessage === "") {
        console.log("user needs to write a message");
        errorMessage.innerText = "ERROR: Please write your message";
        return false;
    } else if (userSender === "") {
        console.log("user needs to write their name");
        errorMessage.innerText = "ERROR: Please write your name";
        return false;
    } else {
        return true;
    }
}

// Function to initialize event listener for adding a user message
function initializeAddUserMessage() {
    let submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", function () {
        let userName = document.getElementById("name-input").value.trim();
        let userMessage = document.getElementById("message-input").value.trim();
        let userSender = document.getElementById("sender-input").value.trim();

        // Verify that the input fields are not empty
        if (!(containsBadWords(userMessage)) && validateUserMessage()) {
            let newPost = {
                name: userName,
                message: userMessage,
                sender: userSender
            };
            addRecentMessage(newPost); // Add the recent message to the wall
            addToLocalStorage(newPost); // Save the new post to local storage
            console.log("message added successfully");
            document.getElementById("form").style.display = "none"; // Optionally hide form
            document.getElementById("name-input").value = ''; // Clear input
            document.getElementById("message-input").value = ''; // Clear input
            document.getElementById("sender-input").value = ''; // Clear input
        } else {
            console.log("Error: message not loaded");
        }
    });
}

// Function to get a random message from the stored posts without removing it from the array
function getRandomMessage() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    if (posts.length > 0) {
        let randomNumber = Math.floor(Math.random() * posts.length);
        return posts[randomNumber];
    }
    return null; // Return null if there are no posts
}

// Function to hide the delete buttons 
function hideDeleteButton() {
    for (button of deleteButtonArray) {
        button.style.display = "none";
    }
}

function deletePost() {
    let deleteButtonArray = document.getElementsByClassName("delete-button");
    for (let btn of deleteButtonArray) {
        btn.addEventListener("click", (event) => {
            deleteLastEntry();
            btn.parentNode.remove();
        });
    }
}

function deleteLastEntry() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    // Check if there are entries to delete
    if (posts.length > 0) {
        // Remove the last entry from the array
        posts.pop();


        // Update local storage with the modified array
        localStorage.setItem('posts', JSON.stringify(posts));
    } else {
        console.log('No entries to delete.');
    }
}

const closeFormButton = document.getElementById("close-form");
closeFormButton.addEventListener("click", closeForm);

function closeForm() {
    document.getElementById("form").style.display = "none";
}

// https://www.solodev.com/blog/web-design/adding-a-load-more-button-to-your-content.stml JQuery
// Adding load more button 
function handleLoadMoreButton() {
    $(".post-it-note").css("display", "none");
    $(".post-it-note").slice(0, 9).show();
    if ($(".post-it-note:hidden").length != 0) {
        $("#load-more-btn").show();
    }
    $("#load-more-btn").on('click', function (e) {
        e.preventDefault();
        const currentPage = $(".post-it-note:visible").length / 9;
        $(".post-it-note").slice(currentPage * 9, (currentPage + 1) * 9).slideDown();
        if ($(".post-it-note:hidden").length == 0) {
            $("#load-more-btn").fadeOut('slow');
        }
    });

}

// Initialize functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
    retrieveAndDisplayPosts();
    initializeAddUserMessage();
    addPostTile()
    setInterval(hideDeleteButton(), 5000);
   handleLoadMoreButton();
});