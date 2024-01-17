"use strict";
//LIFE - immidiately invoked functionl expression
(function(){

    function DisplayHomePage(){
        console.log("Called DisplayHomePage");

        let AboutUsBtn = document.getElementById("AboutUsBtn");
        AboutUsBtn.addEventListener("click", function(){
            location.href= "about.html";
        });

        let MainContent = document.getElementsByTagName("main")[0]

        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is my first paragraph";

        MainContent.appendChild(MainParagraph);

        let FirstString ="This is";
        let SecondString = `${FirstString}The main paragraph`;
        MainParagraph.textContent = SecondString;

        MainContent.appendChild(MainParagraph);

        let DocumentBody = document.body;

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3"> This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML= ArticleParagraph;

        DocumentBody.appendChild(Article);
    }
    function DisplayServicePage(){
        console.log("Called DisplayServicePage");
    }
    function DisplayAboutPage(){
        console.log("Called DisplayAboutPage");
    }
    function DisplayContactPage(){
        console.log("Called DisplayContactPage");
    }
    function DisplayProductPage(){
        console.log("Called DisplayProductPage");
    }

    function Start(){
        console.log("App Started...");

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "Contact us":
                DisplayContactPage();
                break;
            case "About us":
                DisplayAboutPage();
                break;
            case "Our Service":
                DisplayServicePage();
                break;
        }
    }
    window.addEventListener(  "load", Start);


})()