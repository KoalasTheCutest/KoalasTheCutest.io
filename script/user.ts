// Function to display login page
function DisplayLoginPage() {
    console.log("DisplayLoginPage() called...");

    // Select the message area element
    let messageArea = $("#messageArea");

    // Event listener for login button
    $("#loginButton").on("click", function () {
        // Get username and password from input fields
        let username = $("#username").val();
        let password = $("#password").val();

        // Load user data from JSON file
        $.getJSON("./data/users.json", function (data) {
            let success = false;
            let displayName = ""; // Store display name of logged-in user

            // Loop through user data
            for (const user of data.users) {
                // Check if entered username and password match
                if (username === user.Username && password === user.Password) {
                    success = true;
                    displayName = user.DisplayName; // Store display name of user
                    // Store display name and username in session storage
                    sessionStorage.setItem("displayName", displayName);
                    //sessionStorage.setItem("user", username);
                    // Redirect to index page
                    location.href = "index.html";
                    // Update navbar
                    //loadHeader();
                    return; // Exit loop since match is found
                }
            }

            // If login failed, display error message
            $("#username").trigger("focus").trigger("select");
            messageArea
                .addClass("alert alert-danger")
                .text("Error: Invalid Credentials")
                .show();
        });
    });

    // Event listener for cancel button
    $("#cancelButton").on("click", function () {
        // Reset form and redirect to index page
        document.forms[0].reset();
        location.href = "index.html";
    });
}

// Function to display welcome message
function displayWelcomeMessage() {
    console.log("Displaying welcome message...");

    // Retrieve the display name from session storage
    let displayName = sessionStorage.getItem("displayName");

    // Check if display name exists
    if (displayName) {
        // Construct the welcome message
        let welcomeMessage = `Welcome to Harmony Hub Family, ${displayName}!\nThank you for choosing us.\nThere are so many exciting events and opportunities awaiting you.`;

        // Split the welcome message into separate lines
        let welcomeMessageLines = welcomeMessage.split("\n");

        // Construct HTML for the welcome message
        let welcomeMessageHTML = "";
        welcomeMessageLines.forEach(line => {
            welcomeMessageHTML += `<p class="welcome-message">${line}</p>`;
        });

        // Display the welcome message within the welcomeMessageContainer
        $("#welcomeMessageContainer").html(welcomeMessageHTML);
    } else {
        // If display name is not found, log an error
        console.error("Display name not found in session storage.");
    }
}

