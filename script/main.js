/*
    File: home.js
    Author: Maryam Heidary (100868524), Masooma Haidari (100868525)
    Description: JavaScript file for the main homepage of the Harmony Hub website showcasing community engagement,
    personal development, and connections.
    Date: 2024/27/01
*/
"use strict";

// Project details array
const projectDetails = [
    {
        title: "Community Learning Platform",
        description: "Developed an online learning platform for the community hub, offering a variety of classes, workshops, and educational resources for people of all ages and backgrounds.",
        technologies: "React, Node.js, MongoDB, WebRTC",
        role: "Full Stack Developer",
        image: './file/img_1.png'
    },
    {
        title: "Volunteer Management System",
        description: "Created a volunteer management system to streamline the process of organizing and coordinating community events, projects, and activities with the help of dedicated volunteers.",
        technologies: "Django, PostgreSQL, Bootstrap, AWS",
        role: "Backend Developer",
        image: './file/img_4.png'
    },
    {
        title: "Community Social Network",
        description: "Designed and implemented a social networking platform for the community hub, fostering communication, collaboration, and the sharing of ideas among community members.",
        technologies: "Vue.js, Firebase, Real-time Database, Authentication",
        role: "Frontend Developer",
        image: './file/img_3.png'
    },

];

// Dynamically create and append the video element
document.addEventListener('DOMContentLoaded', function () {
    let videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.id = 'myVideo';

    let videoSource = document.createElement('source');
    videoSource.src = './file/video.mp4';
    videoSource.type = 'video/mp4';

    videoElement.appendChild(videoSource);
    document.body.appendChild(videoElement);
});

// Function to generate a project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');

    const titleElement = document.createElement('h2');
    titleElement.textContent = project.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Project Description: ${project.description}`;

    const technologiesElement = document.createElement('p');
    technologiesElement.textContent = `Key Technologies Used: ${project.technologies}`;

    const roleElement = document.createElement('p');
    roleElement.textContent = `Role: ${project.role}`;

    const imageElement = document.createElement('img');
    imageElement.src = project.image;
    imageElement.alt = project.title;

    // Make only the first image smaller
    imageElement.style.maxWidth = '50%';
    imageElement.style.height = 'auto';

    card.appendChild(titleElement);
    card.appendChild(descriptionElement);
    card.appendChild(technologiesElement);
    card.appendChild(roleElement);
    card.appendChild(imageElement);

    return card;
}

// Define variables
let projectsPerLoad = 1;
let currentProjects = projectDetails.slice(0, projectsPerLoad);
const projectContainer = document.getElementById('projects-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Display projects function
function displayProjects(projects) {
    projectContainer.innerHTML = '';
    projects.forEach(project => {
        const card = createProjectCard(project);
        projectContainer.appendChild(card);
    });
}

// Load more projects function
function loadMoreProjects() {
    projectsPerLoad += 1;
    currentProjects = projectDetails.slice(0, projectsPerLoad);
    displayProjects(currentProjects);

    // Hide 'Load More' button if all projects are displayed
    if (projectsPerLoad >= projectDetails.length) {
        loadMoreBtn.style.display = 'none';
    }
}



// Event listener for page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    // Create footer element
    let footerElement = document.createElement('footer');

// Create paragraph element
    let paragraphElement = document.createElement('p');
    paragraphElement.style.color = 'white'; // Set text color to white

// Create copyright text
    let copyrightText = document.createTextNode('\u00A9 2024 Harmony Hub. All rights reserved. | ');

// Append copyright text to paragraph element
    paragraphElement.appendChild(copyrightText);

// Append paragraph element to footer
    footerElement.appendChild(paragraphElement);


    // Create Privacy Policy link
    // Create Privacy Policy link
    let privacyLink = document.createElement('a');
    privacyLink.href = 'privacy.html';
    privacyLink.textContent = 'Privacy Policy';
    privacyLink.style.color = 'white'; // Set color to white

// Create Terms of Service link
    let termsLink = document.createElement('a');
    termsLink.href = 'terms.html';
    termsLink.textContent = 'Terms of Service';
    termsLink.style.color = 'white'; // Set color to white

// Create Contact page link
    let contactLink = document.createElement('a');
    contactLink.href = 'contact.html';
    contactLink.textContent = 'Contact';
    contactLink.style.color = 'white'; // Set color to white


    // Append elements
    paragraphElement.appendChild(copyrightText);
    paragraphElement.appendChild(privacyLink);
    paragraphElement.appendChild(document.createTextNode(' | ')); // Pipe separator
    paragraphElement.appendChild(termsLink);
    paragraphElement.appendChild(document.createTextNode(' | ')); // Pipe separator
    paragraphElement.appendChild(contactLink);

    footerElement.appendChild(paragraphElement);

    // Append footer to the body
    document.body.appendChild(footerElement);
});


document.addEventListener('DOMContentLoaded', function () {
    // Create a new list item element
    const listItem = document.createElement('li');
    listItem.classList.add('nav-item');

    // Create a new anchor element
    const anchor = document.createElement('a');
    anchor.classList.add('nav-link');
    anchor.href = "career.html"; // Set the href attribute to the desired URL
    anchor.textContent = "Careers"; // Set the text content of the link

    // Append the anchor element to the list item
    listItem.appendChild(anchor);

    // Get the navbar list and append the new list item to it
    const navbarList = document.querySelector('.navbar-nav');
    navbarList.appendChild(listItem);
});
$(document).ready(function () {
    let currentIndex = 0; // Start with the first post

    // Function to load more posts using AJAX
    function loadPosts() {
        $.ajax({
            url: './data/news.json', // URL of your JSON file containing blog posts
            method: 'GET',
            success: function (response) {
                // Display one post at a time
                if (currentIndex < response.length) {
                    $('#blog-container').append('<div class="blog-article"><h2>' + response[currentIndex].title + '</h2><p>' + response[currentIndex].content + '</p><a href="' + response[currentIndex].readMoreLink + '" class="read-more-link">Read More</a></div>');
                    currentIndex++; // Move to the next post
                }
            },
            error: function (xhr, status, error) {
                console.error('Error loading posts:', error);
            }
        });
    }

    // Load posts one by one when clicking the button
    $('#load-more').click(loadPosts);

    // Load initial posts on page load
    loadPosts();
});


// Function to fetch weather data based on user location
function getWeather() {
    // Get user location input from the DOM
    const location = document.getElementById('location').value;
    // API key for accessing weather data
    const apiKey = '9GrRSOw4pQcNJ7LXvS3ClYDavhOtfJ84';
    // Construct API URL with user location and API key
    const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${encodeURIComponent(location)}&fields=temperature,weatherCode&timesteps=current&units=metric&apikey=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response data as JSON
            return response.json();
        })
        .then(data => {
            // Check if the response data has the expected structure
            if (!data.data || !data.data.timelines || !data.data.timelines[0] || !data.data.timelines[0].intervals || !data.data.timelines[0].intervals[0] || !data.data.timelines[0].intervals[0].values || !data.data.timelines[0].intervals[0].values.temperature || !data.data.timelines[0].intervals[0].values.weatherCode) {
                throw new Error('Unexpected response format');
            }
            // Extract current weather and weather code from the response
            const currentWeather = data.data.timelines[0].intervals[0].values.temperature;
            const weatherCode = data.data.timelines[0].intervals[0].values.weatherCode;
            // Display weather information
            displayWeather(location, currentWeather, weatherCode); // Pass weatherCode to displayWeather
        })
        .catch(error => {
            // Handle errors that occur during fetching or processing of weather data
            console.error('Error fetching weather data:', error);
        });
}

// Function to fetch image data from a JSON file and populate the gallery
$.ajax({
    url: './data/image.json',
    dataType: 'json',
    success: function (data) {
        // Extract image data from the JSON response
        let images = data.images;
        let desiredWidth = 200;
        let desiredHeight = 150;
        // Iterate over each image and dynamically create HTML elements
        images.forEach(function (image) {
            // Combine title and caption for display in the gallery
            const titleAndCaption = image['data-title'] + ' - ' + image.caption;
            // Append image HTML elements to the gallery
            $('#gallery').append(`
                <a href="${image.src}" data-lightbox="${image['data-lightbox']}" data-title="${titleAndCaption}">
                    <img src="${image.src}" alt="${image.alt}" style="width: 200px; height: 150px;">
                    <div class="caption">${image['data-title']}</div>
                </a>
            `);
        });

        // Initialize the lightbox gallery
        baguetteBox.run('#gallery', {
            // Customize overlay background color
            overlayBackgroundColor: 'rgba(0,0,0,0.8)',
            // Define captions function to display titles or titles with captions
            captions: function (element) {
                // Check if the element has been opened in lightbox
                if (element.getAttribute('data-opened') === 'true') {
                    // If opened, display both title and caption
                    const titleAndCaption = element.dataset.title ? element.dataset.title : 'No title';
                    return '<div class="caption">' + titleAndCaption + '</div>';
                } else {
                    // If not opened, display only the title
                    const title = element.dataset.title ? element.dataset.title : 'No title';
                    return '<div class="caption">' + title + '</div>';
                }
            },
            // Callback function to mark the element as opened in lightbox
            afterShow: function (imageIndex, element) {
                element.setAttribute('data-opened', 'true');
            }
        });
    },
    // Handle errors that occur during the AJAX request
    error: function (xhr, status, error) {
        console.error('Error loading images:', error);
    }
});


// Function to fetch event data from JSON file
function fetchEventData() {
    $.ajax({
        url: './data/event.json',
        dataType: 'json',
        success: function (data) {
            // On success, call displayEvents function with the fetched data
            let events = data.events;
            displayEvents(events);
        },
        error: function (xhr, status, error) {
            // Handle errors that occur during fetching event data
            console.error('Error fetching event data:', status, error);
        }
    });
}

// Function to display events on the page
function displayEvents(events) {
    // Get reference to the event list container
    let eventList = $('#event-list');
    // Clear previous event items
    eventList.empty();

    // Iterate over each event and create event items
    events.forEach(function (event) {
        let eventItem = $('<div class="event-item"></div>');
        // Append event details to the event item
        eventItem.append('<h2>' + event.title + '</h2>');
        eventItem.append('<p>Date: ' + event.date + '</p>');
        eventItem.append('<p>Time: ' + event.time + '</p>');
        eventItem.append('<p>Location: ' + event.location + '</p>');
        eventItem.append('<p>Description: ' + event.description + '</p>');

        // If event has an image, append it to the event item
        if (event.image) {
            eventItem.append('<img src="' + event.image + '" alt="' + event.title + '">');
        }

        // Append the event item to the event list container
        eventList.append(eventItem);
    });
}

// Function to fetch event data when the document is ready
$(document).ready(function () {
    fetchEventData();
});

// Function to display weather information
function displayWeather(location, temperature, weatherCode) {
    // Log weather code for debugging
    console.log('Weather Code:', weatherCode);
    // Get reference to the weather info container
    const weatherInfoContainer = document.getElementById('weather-info');
    // Set inner HTML of weather info container with weather details
    weatherInfoContainer.innerHTML = `
    <h2>Current Weather in ${location}</h2>
    <p>Temperature: ${temperature}°C</p>
    `;
}


// Function to populate services from JSON data
$(document).ready(function () {
    function populateServices() {
        // Fetch service data from JSON file
        $.getJSON('./data/service.json', function (data) {
            // Loop through each service in the data
            data.forEach(function (service) {
                // Create service container
                const serviceContainer = $('<div>').addClass('service-container');

                // Create service tab
                const serviceTab = $('<div>').addClass('service-tab').attr('onclick', 'toggleService("' + service.id + '")');
                $('<span>').text(service.title).appendTo(serviceTab); // Add service title
                $('<i>').addClass('fa-solid fa-chevron-down').appendTo(serviceTab); // Add chevron icon
                serviceTab.appendTo(serviceContainer);

                // Create service content
                const serviceContent = $('<div>').attr('id', service.id).addClass('service-content');
                $('<h3>').text(service.title).appendTo(serviceContent); // Add service title
                $('<p>').text(service.description).appendTo(serviceContent); // Add service description
                $('<img>').attr('src', service.image).attr('alt', 'Harmony Hub').css('max-width', '50%').css('height', 'auto').css('display', 'block').css('margin', '0 auto').appendTo(serviceContent); // Add service image
                serviceContent.appendTo(serviceContainer);

                // Append service container to main placeholder
                serviceContainer.appendTo($('#serviceDataPlaceholder'));
            });
        });
    }

    // Call the populateServices function to display services
    populateServices();

    // Function to toggle service content visibility
    function toggleService(serviceId) {
        const serviceContent = $('#' + serviceId);
        serviceContent.toggle(); // Toggle visibility of service content
    }
});

// Function to load header content dynamically
function loadHeader() {
    // Load header content from header.html
    $.get("./header.html", function (html_data) {
        $("header").html(html_data); // Replace header content with loaded HTML

        // Check if user is logged in
        if (sessionStorage.getItem("user")) {
            // If logged in, update navbar link to "Logout"
            $("#loginLink").text("Logout");
            $("#loginLink").attr("href", "login.html"); // Set logout page link

            // Add click event handler for logout
            $("#loginLink").on("click", function () {
                sessionStorage.clear(); // Clear user session
                location.href = "index.html"; // Redirect to index page after logout
            });
        } else {
            // If not logged in, update navbar link to "Login"
            $("#loginLink").text("Login");
            $("#loginLink").attr("href", "login.html"); // Set login page link
        }
    });
}




// Call loadHeader function when the page loads
$(document).ready(function () {
    loadHeader();
});

// Define the CheckLogin function outside of the $(document).ready() function

$(document).ready(function () {


    // Function to validate the registration form
    function validateRegistrationForm() {
        // Reset previous validation errors
        $(".form-control").removeClass("is-invalid");
        $(".invalid-feedback").empty();

        // Flag to track overall form validity
        let isValid = true;

        // Validate Display Name
        let displayName = $("#displayName").val();
        if (!displayName.match(/^[A-Za-z\s]+$/)) {
            $("#displayName").addClass("is-invalid");
            $("#displayName").siblings(".invalid-feedback").text("Please enter a valid display name (only letters and spaces).");
            isValid = false;
        }

        // Validate Email Address
        let emailAddress = $("#emailAddress").val();
        if (!emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            $("#emailAddress").addClass("is-invalid");
            $("#emailAddress").siblings(".invalid-feedback").text("Please enter a valid email address.");
            isValid = false;
        }

        // Validate Phone Number
        let phoneNumber = $("#phoneNumber").val();
        if (!phoneNumber.match(/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/)) {
            $("#phoneNumber").addClass("is-invalid");
            $("#phoneNumber").siblings(".invalid-feedback").text("Please enter a valid phone number.");
            isValid = false;
        }

        // Validate Address (if applicable)
        let address = $("#address").val();
        if (!address) {
            $("#address").addClass("is-invalid");
            $("#address").siblings(".invalid-feedback").text("Please enter your address.");
            isValid = false;
        }

        // Other field validations (if any)

        return isValid;
    }

    // Event listener for register button click
    $("#registerButton").click(function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Validate the registration form
        if (validateRegistrationForm()) {
            // Form is valid, proceed with registration process
            // You can submit the form data to the server or perform other actions here
            alert("Registration successful!");

            // Reset the form fields
            $("#registrationForm")[0].reset();
        }
    });
});

// Event listener for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    // Get the current page filename
    let currentPage = location.pathname.split("/").pop();

    // Find the corresponding navigation item and make it bold
    let navLinks = document.querySelectorAll("header nav ul.navbar-nav li a");
    navLinks.forEach(function (navLink) {
        let navItemLink = navLink.getAttribute("href");
        if (navItemLink === currentPage || navItemLink === "../" + currentPage) {
            navLink.classList.add("active");
            navLink.style.fontWeight = "bold";
        }
    });
});




// Function to validate email format
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


// Function to show confirmation modal and populate with user input
function showConfirmationModal() {
    // Get user input from form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const rating = document.getElementById('ratingSelect').value;

    // Validate form fields
    if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
    }

    // Display confirmation modal
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';

    // Populate confirmation modal with user input
    document.getElementById('confirmName').textContent = name;
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('confirmSubject').textContent = subject;
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('confirmRating').textContent = getRatingText(rating);
}

// Function to hide confirmation modal
function hideConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

// Function to convert rating value to text
function getRatingText(ratingValue) {
    switch (ratingValue) {
        case '5':
            return 'Excellent';
        case '4':
            return 'Good';
        case '3':
            return 'Fair';
        case '2':
            return 'Poor';
        case '1':
            return 'Very Poor';
        default:
            return '';
    }
}

// Function to submit form and display modal
function submitForm() {
    hideConfirmationModal();

    // Display modal for form submission confirmation
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Countdown timer before redirecting to home page
    let seconds = 5;
    let countdownElement = document.getElementById("countdown");
    let countdownInterval = setInterval(function () {
        seconds--;
        countdownElement.textContent = seconds.toString();
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            window.location.href = "home.html"; // Redirect to home page
        }
    }, 1000);
}
