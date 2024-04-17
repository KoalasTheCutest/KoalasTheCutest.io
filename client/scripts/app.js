"use strict";
(function () {
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id = "logout" class="nav-link nav-item" href="#">
                                                   <i class="fas fa-undo"></i>Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html(`<a id = "login" class="nav-link nav-item" href="/login">
                                                  <i class="fas fa-sign-in-alt"></i>Login</a>`);
            location.href = "/home";
        });
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and last name. Ex: First Name [Middle Name] Last Name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please provide a valid contact number. Ex. 123-456-7891.");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please provide a valid email address. Ex. email@email.com");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeClass("class").hide();
            }
        });
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomepage() {
        console.log("Called Display Homepage...");
        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });
        $("main").append(`<p id = "MainParagraph" class = "mt-3">This is my first paragraph.</p>`);
        $("main").append(`<article class="container">
                            <p id = "ArticleParagraph" class = "mt-3">This is my article paragraph.</p>
                        </article>`);
    }
    function DisplayAboutUs() {
        console.log("Called About Us...");
    }
    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage...");
        $("a[href='/contact-list']").off("click");
        $("a[href='/contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayProductPage() {
        console.log("Called DisplayProductPage...");
    }
    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage...");
    }
    function DisplayContactListPage() {
        console.log("Called DisplayContactListPage...");
        $("a.delete").on("click", function (event) {
            if (!confirm("Confirm contact delete?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Called DisplayEditPage()...");
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("Calling DisplayLoginPage()...");
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "/home";
        });
        $("#register-link").on("click", () => {
            location.href = "/register";
        });
    }
    function DisplayRegisterPage() {
        console.log("Calling DisplayRegisterPage()...");
        $("#login-link").on("click", () => {
            location.href = "/login";
        });
    }
    function Display404Page() {
        console.log("Calling Display404Page()...");
    }
    function Start() {
        console.log("App Started...");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                DisplayHomepage();
                break;
            case "about":
                DisplayAboutUs();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact":
                DisplayContactUsPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "products":
                DisplayProductPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "edit":
            case "add":
                DisplayEditPage();
                break;
            case "404":
                Display404Page();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map