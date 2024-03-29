"use strict";
function DisplayLoginPage() {
    console.log("DisplayLoginPage() called...");
    let messageArea = $("#messageArea");
    $("#loginButton").on("click", function () {
        let username = $("#username").val();
        let password = $("#password").val();
        $.getJSON("./data/users.json", function (data) {
            let success = false;
            let displayName = "";
            for (const user of data.users) {
                if (username === user.Username && password === user.Password) {
                    success = true;
                    displayName = user.DisplayName;
                    sessionStorage.setItem("displayName", displayName);
                    location.href = "index.html";
                    return;
                }
            }
            $("#username").trigger("focus").trigger("select");
            messageArea
                .addClass("alert alert-danger")
                .text("Error: Invalid Credentials")
                .show();
        });
    });
    $("#cancelButton").on("click", function () {
        document.forms[0].reset();
        location.href = "index.html";
    });
}
function displayWelcomeMessage() {
    console.log("Displaying welcome message...");
    let displayName = sessionStorage.getItem("displayName");
    if (displayName) {
        let welcomeMessage = `Welcome to Harmony Hub Family, ${displayName}!\nThank you for choosing us.\nThere are so many exciting events and opportunities awaiting you.`;
        let welcomeMessageLines = welcomeMessage.split("\n");
        let welcomeMessageHTML = "";
        welcomeMessageLines.forEach(line => {
            welcomeMessageHTML += `<p class="welcome-message">${line}</p>`;
        });
        $("#welcomeMessageContainer").html(welcomeMessageHTML);
    }
    else {
        console.error("Display name not found in session storage.");
    }
}
//# sourceMappingURL=user.js.map