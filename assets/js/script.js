
// prohibited words:
let prohibitedWords = ["fuck", "slut", "shit", "kill"];
let wall = document.getElementById("wall");
let errorMessage = document.getElementById("error-message");
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

    // List of radial gradient values
    const gradients = [
        'radial-gradient(circle at 60% 80%, var(--color-voodoo-700), var(--color-orange-500))',
        'radial-gradient(circle at 60% 80%, var(--color-cabaret-500), var(--color-yellow-500))',
        'radial-gradient(circle at 60% 80%, var(--color-yellow-500), var(--color-cabaret-500))',
        'radial-gradient(circle at 60% 80%, var(--color-orange-500), var(--color-voodoo-700))'
    ];

    // Randomly select a radial gradient from the list
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    // Create postItem element
    const postItem = document.createElement("div");
    postItem.classList.add("post-it-note", "post-card");
    // Set background using CSS radial gradient
    postItem.style.backgroundImage = randomGradient;
    postItem.innerHTML = `
        <div class="post-from"><span>From:</span> ${post.sender}</div>    
        <div class="post-too"><span>To:</span> ${post.name}</div>
        <div class="post-message">"${post.message}"</div>
    `;

    // Create postOptions element
    const postOptions = document.createElement("div");
    postOptions.classList.add("post-options");

    // Create delete buttons
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M31.11,11.85c0,8.35-13.85,18.15-15.11,18.15S.89,20.2.89,11.85,10.96-.75,16,6.81c5.04-7.56,15.11-3.31,15.11,5.04Z"/>
        </svg>
    `;
    
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button", "btn", "btn-outline-light");
    deleteButton.innerText = "delete";
    
    // Build the post and append it to the wall
    postOptions.appendChild(likeButton);
    postItem.appendChild(deleteButton);
    postItem.appendChild(postOptions);
    wall.prepend(postItem);

    // Toggle like button
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("liked");
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

// Function to make ensure user fills input, Future feature: make sure we check alphanumeric responses.
function validateUserMessage() {
    let userName = document.getElementById("name-input").value.trim();
    let userMessage = document.getElementById("message-input").value.trim();
    let userSender = document.getElementById("sender-input").value.trim();
    if (userName === "") {
        showAlert("ERROR: Please write the name of who you want to write a message", "danger");
        return false;
    } else if (userMessage === "") {
        showAlert("ERROR: Please write your message", "danger");
        return false;
    } else if (userSender === "") {
        showAlert("ERROR: Please write your name", "danger");
        return false;
    } else {
        return true;
    }
}

/** Function to initialize event listener for adding a user message */
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
            document.getElementById("name-input").value = ''; // Clear input
            document.getElementById("message-input").value = ''; // Clear input
            document.getElementById("sender-input").value = ''; // Clear input
        } else {
            console.log("Error: message not loaded");
        }
    });
}


/**  Function to hide the delete buttons */
function hideDeleteButton() {
    for (let button of deleteButtonArray) {
        button.style.display = "none";
    }
}

/** Function to handle delete button and delete recent post */
function deletePost() {
    let deleteButtonArray = document.getElementsByClassName("delete-button");
    for (let btn of deleteButtonArray) {
        btn.addEventListener("click", (event) => {
            deleteLastEntry();
            btn.parentNode.remove();
        });
    }
}

/** Function to delete last entry and update the local storage */
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



// https://www.solodev.com/blog/web-design/adding-a-load-more-button-to-your-content.stml JQuery
/** Function handle load more button  using JQuery*/
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

/**
   * Shows an alert message on the UI.
   * The method creates a new alert element, appends it to the alert container,
   * and removes it after 2 seconds.
   * @param {string} message
   * @param {string} type
   * @returns {void}
   * @static
   */
function showAlert(message, type) {
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");

    if (type === "danger") {
      alertDiv.classList.add("alert", "alert--danger");
    } else if (type === "success") {
      alertDiv.classList.add("alert", "alert--success");
    } else {
      alertDiv.classList.add("alert", "alert--info");
    }

    alertDiv.innerText = message;

    alertContainer.appendChild(alertDiv);

    // Remove the alert after 2 seconds
    setTimeout(() => {
      alertContainer.removeChild(alertDiv);
    }, 3000);
  }

// Initialize functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", (event) => {
    retrieveAndDisplayPosts();
    initializeAddUserMessage();
    setInterval(hideDeleteButton(), 5000);
    handleLoadMoreButton();
});