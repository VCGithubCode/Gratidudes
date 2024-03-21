let post = [{
    name: "mika",
    message: "Thank you!"
}, {
    name: "vernell",
    message: "You're Amazing"
}];

// prohibited words:
let prohibitedWords = ["fuck", "slut", "shit", "kill"];

// let userName = document.getElementById("name-input").value.trim();
// let userMessage = document.getElementById("message-input").value.trim();

let wall = document.getElementById("wall");

// Function to filter prohibited words 
function containsBadWords(userinput) {
    let lowerCaseInput = userinput.toLowerCase();

    for (let word of prohibitedWords) {
        if (lowerCaseInput.includes(word)) {
            console.log("contains a bad word")
            return true;
        }
    }
    
}
// Function to generate a post on the wall
function generatePost(post) {
    let postItNote = document.createElement("div");
    postItNote.classList.add("post-it-note");
    postItNote.innerText = `${post.name} message: ${post.message}`;
    wall.append(postItNote);
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

// Function that displays the form
function handleAddButton() {
    let addButton = document.getElementById("add-message");
    let form = document.getElementById("form");
    addButton.addEventListener("click", function () {
        form.style.display = "block";
    });
}

// Function to make ensure user fills input, Future feature: make sure we check alphanumeric responses.
function validateUserMessage() {
    let userName = document.getElementById("name-input").value.trim();
    let userMessage = document.getElementById("message-input").value.trim();
    if (userName === ""){
        console.log("username needs to be filled");
        return false;
    } else if (userMessage === "") {
        console.log("user needs to write a message");
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
        // Verify that the input fields are not empty
        if (!(containsBadWords(userMessage)) && validateUserMessage()) {
            let newPost = { name: userName, message: userMessage };
            addRecentMessage(newPost); // Add the recent message to the wall
            addToLocalStorage(newPost); // Save the new post to local storage
            console.log("message added successfully");
            document.getElementById("form").style.display = "none"; // Optionally hide form
            document.getElementById("name-input").value = ''; // Clear input
            document.getElementById("message-input").value = ''; // Clear input
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

// Initialize functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
    retrieveAndDisplayPosts();
    handleAddButton();
    initializeAddUserMessage();
});