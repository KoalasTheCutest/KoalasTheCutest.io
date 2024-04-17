/*
Name: Brody Dentinger
Date: January 19 , 2024
Description: This is our javascript for our website.
File: app.js
*/

"use strict";

// IIFE - Immediately invoked functional expression . Doesn't have a name, calls itself
// the () at the end makes it a IIFE
(function(){



    /**
     * Check login attempts to fetch a user from session storage. Dynamically changes login/logout based on if found.
     * On Logout, clears session Storage and redirects to index.
     */
    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id = "logout" class="nav-link nav-item" href="#">
                                                   <i class="fas fa-undo"></i>Logout</a>`);
        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            $("#login").html(`<a id = "login" class="nav-link nav-item" href="/login">
                                                  <i class="fas fa-sign-in-alt"></i>Login</a>`);

            location.href = "/home";
        });
    }

    /**
     * LoadHeader takes html data from an HTTP request, and then loads it into the header element.
     * Also checks all anchor elements that are children of li elements for the containing of the current page title
     * If the anchor elements matches, loads active classes/stylings onto it.
     *
     * Checks Login on every page by implementing it into header.
     *
     * @param html_data data to load into header.
     *
     */

    /**
     * Calls validateField() on each form element of the contact form.
     *
     */
    function ContactFormValidation(){

        ValidateField ("#fullName",
                  /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
                     "Please enter a valid first and last name. Ex: First Name [Middle Name] Last Name");

        ValidateField("#contactNumber",
                  /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
                     "Please provide a valid contact number. Ex. 123-456-7891.");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please provide a valid email address. Ex. email@email.com");

    }

    /**
     * This function validates input for contact and edit pages.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     *
     */
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string){

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val() as string;

            if(!regular_expression.test(inputFieldText)){
                // fail
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();

            }else{
                // pass
                messageArea.removeClass("class").hide();
            }
        });
    }

    /**
     * AddContact takes a name, number, and email, and creates a new contact object with that data.
     * Will also create a unique key as first character of name + current date and write this to local storage.
     * @param fullName Contacts full name.
     * @param contactNumber Contacts Phone Number.
     * @param emailAddress Contacts Email.
     *
     */
    function AddContact(fullName:string, contactNumber:string, emailAddress:string){

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){

            // Creating our own key (like an assoc. array) to identify the CSV.
            // substring takes the (start index, last index... so first character), concat. the current date
            let key = contact.fullName.substring(0,1) + Date.now();

            // write the key value pair to local storage
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    // Functions that provide actions when a page is loaded. Will be implemented in our switch.
    function DisplayHomepage(){
        console.log("Called Display Homepage...");

        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";

        });

        // select main tag, append the information to it
        $("main").append(`<p id = "MainParagraph" class = "mt-3">This is my first paragraph.</p>`)

        $("main").append(`<article class="container">
                            <p id = "ArticleParagraph" class = "mt-3">This is my article paragraph.</p>
                        </article>`)
    }

    function DisplayAboutUs(){
        console.log("Called About Us...");
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage...");

        $("a[href='/contact-list']").off("click");
        $("a[href='/contact-list']").on("click", function(){
            location.href = "/contact-list"
        });

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function () {
            // boolean value returned for .checked
            if(subscribeCheckbox.checked){

                let fullName:string = document.forms[0].fullName.value;
                let contactNumber:string = document.forms[0].contactNumber.value;
                let emailAddress:string = document.forms[0].emailAddress.value;

                // fetching the value by targeting the NAME from the form element.
                AddContact(fullName, contactNumber, emailAddress);
                }
        });
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage...");
    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage...");
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage...");

        $("a.delete").on("click", function(event){

            if(!confirm("Confirm contact delete?")){
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...");
        ContactFormValidation();
    }

    function DisplayLoginPage(){
        console.log("Calling DisplayLoginPage()...");

        $("#cancelButton").on("click", function(){
           document.forms[0].reset();
            location.href = "/home";
        });

        $("#register-link").on("click", () => {
            location.href = "/register";
        });
    }

    function DisplayRegisterPage(){
        console.log("Calling DisplayRegisterPage()...");

        $("#login-link").on("click", () => {
            location.href = "/login";
        });
    }

    function Display404Page(){
        console.log("Calling Display404Page()...");
    }

    function Start(){
        console.log("App Started...");

        // get the page id that the router is passing in through the ejs variable
        let page_id = $("body")[0].getAttribute("id"); // body tags are in an array in the dom



        // use the page id to determine which JS display function to call
        switch(page_id){
            case "home":
                DisplayHomepage();
                break;
            case "about":
                DisplayAboutUs();
                break;
            case "services" :
                DisplayServicesPage();
                break;
            case "contact":
                DisplayContactUsPage();
                break;
            case "contact-list" :
                DisplayContactListPage();
                break;
            case "products" :
                DisplayProductPage();
                break;
            case "register" :
                DisplayRegisterPage();
                break;
            case "login" :
                DisplayLoginPage();
                break;
            case "edit" :
            case "add" :
                DisplayEditPage();
                break;
            case "404" :
                Display404Page();
                break;
        }
    }
    window.addEventListener("load", Start);

}) ()