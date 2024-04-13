


(function () {

  fetchAndDisplayImages()
  fetchAndDisplayServices()
  displayLoginPage()
  DisplayRegistrationPage()
  displayEventPlanningData()
  loadBlogPosts()
  displayUserProfile()

  function createChartFromJSON() {
    $.getJSON('../data/statistics.json', function (data) {
      const config = {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Sales',
              data: data.data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      const canvasElement = document.getElementById('myChart');
      if (canvasElement) {
        const myChart = new Chart(canvasElement, config);
      } else {
        console.error('Canvas element "myChart" not found.');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(createChartFromJSON, 1000);
  });
  function AddNavigationEvents() {
    let navLinksExtra = $('.navbar-brand');
    let navlinks = $('ul>li>a');
    navLinksExtra.off('click');
    navLinksExtra.off('mouseover');
    navlinks.off('click');
    navlinks.off('mouseover');
    navlinks.on('click', function () {
      LoadLink($(this).attr('data'));
    });
    navLinksExtra.on('click', function () {
      LoadLink($(this).attr('data'));
    });
    navlinks.on('mouseover', function () {
      $(this).css('cursor', 'pointer');
    });
    navLinksExtra.on('mouseover', function () {
      $(this).css('cursor', 'pointer');
    });
  }
  function LoadLink(link, data = '') {
    router.ActiveLink = link;
    AuthGuard();
    router.LinkData = data;
    history.pushState({}, '', router.ActiveLink);
    document.title = CapitalizeFirstCharacter(router.ActiveLink);
    $('ul>li>a').each(function () {
      $(this).removeClass('active');
    });
    $('.navbar-brand').each(function () {
      $(this).removeClass('active');
    });
    $('li>a:contains(${document.title})').addClass('active');
    LoadContent();
  }
  function AuthGuard() {
    let protected_routes = ['contact-list'];
    if (protected_routes.indexOf(router.ActiveLink) > -1) {
      if (!sessionStorage.getItem('user')) {
        router.ActiveLink = 'login';
      }
    }
  }
  function ContactFormValidation() {
    ValidateField(
      '#fullName',
      /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
      'Please enter a valid First and Last Name.'
    );
    ValidateField(
      '#contactNumber',
      /^\d{10}$/,
      'Please enter a 10-digit mobile number.'
    );
    ValidateField(
      '#email',
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
      'Please enter a valid email address.'
    );
  }
  function ValidateField(input_field_id, regular_expression, error_message) {
    let messageArea = $('#messageArea').hide();
    $(input_field_id).on('blur', function () {
      console.log('test');
      let inputFieldText = $(this).val();
      if (!regular_expression.test(inputFieldText)) {
        $(this).trigger('focus').trigger('select');
        messageArea.addClass('alert alert-danger').text(error_message).show();
      } else {
        messageArea.removeClass('class').hide();
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.backgroundImage = 'url(./file/img_8.png)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  });
  function generateFooter() {
    const footer = document.createElement('div');
    footer.id = 'footer';
    const paragraphElement = document.createElement('p');
    paragraphElement.classList.add('footer-text');
    const copyrightText = document.createTextNode(
      '\u00A9 2024 Harmony Hub. All rights reserved. | '
    );
    paragraphElement.appendChild(copyrightText);
    const privacyLink = document.createElement('a');
    privacyLink.href = '/privacy';
    privacyLink.textContent = 'Privacy Policy';
    paragraphElement.appendChild(privacyLink);
    paragraphElement.appendChild(document.createTextNode(' | '));
    const termsLink = document.createElement('a');
    termsLink.href = '/terms';
    termsLink.textContent = 'Terms of Service';
    paragraphElement.appendChild(termsLink);
    paragraphElement.appendChild(document.createTextNode(' | '));
    const contactLink = document.createElement('a');
    contactLink.href = '/contact';
    contactLink.textContent = 'Contact';
    paragraphElement.appendChild(contactLink);
    footer.appendChild(paragraphElement);
    document.body.appendChild(footer);
  }
  function createFooterLink(text, link) {
    const navItem = document.createElement('li');
    navItem.classList.add('nav-item');
    const navLink = document.createElement('a');
    navLink.classList.add('nav-link');
    navLink.href = link;
    navLink.textContent = text;
    navItem.appendChild(navLink);
    return navItem;
  }

  async function loadBlogPosts() {
    console.log(document.getElementById('click-me-to-add-post'));
    document
      .getElementById('click-me-to-add-post')
      .addEventListener('click', (e) => {
        e.preventDefault();
        addBlog(e);
      });

    const response = await axios.get('http://localhost:3000/posts', {
      headers: {
        Authorization: sessionStorage.getItem('displayName'),
      },
    });

    if (response.status === 200) {
      const posts = response.data;
      const postList = document.getElementById('blog-container');
      postList.innerHTML = '';
      posts.forEach((post) => {
        // Create elements
        const blogArticle = document.createElement('div');
        const heading = document.createElement('h2');
        const paragraph = document.createElement('p');
        const readMoreLink = document.createElement('a');

        //create edit and delete buttons and their function as well
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn');
        editButton.classList.add('btn-success');
        editButton.addEventListener('click', async () => {
          const newDescription = prompt('Enter new description');
          if (!newDescription) return;
          const response = await axios.put(
            `http://localhost:3000/posts/${post._id}`,
            {
              description: newDescription,
            },
            {
              headers: {
                Authorization: sessionStorage.getItem('displayName'),
              },
            }
          );
          if (response.status === 200) {
            paragraph.textContent = newDescription;
          }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn-danger');
        deleteButton.classList.add('btn');
        deleteButton.addEventListener('click', async () => {
          const response = await axios.delete(
            `http://localhost:3000/posts/${post._id}`,
            {
              headers: {
                Authorization: sessionStorage.getItem('displayName'),
              },
            }
          );
          if (response.status === 200) {
            blogArticle.remove();
          }
        });

        // Set classes
        blogArticle.classList.add('blog-article');
        readMoreLink.classList.add('read-more-link');

        // Set text content
        heading.textContent = post.title;
        paragraph.textContent = post.content;
        readMoreLink.textContent = 'Read More';

        // Set href attribute
        readMoreLink.href = post.readMoreLink;

        // Append elements
        blogArticle.appendChild(heading);
        blogArticle.appendChild(paragraph);
        blogArticle.appendChild(readMoreLink);
        blogArticle.appendChild(editButton);
        blogArticle.appendChild(deleteButton);

        // Append blogArticle to #blog-container
        document.getElementById('blog-container').appendChild(blogArticle);
      });
    }
  }

  function getWeather() {
    console.log('get weather called');
    const locationElement = document.getElementById('location');
    if (!locationElement) {
      console.error('Location input element not found');
      return;
    }
    const location = locationElement.value;
    const apiKey = '9GrRSOw4pQcNJ7LXvS3ClYDavhOtfJ84';
    const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${encodeURIComponent(
      location
    )}&fields=temperature,weatherCode&timesteps=current&units=metric&apikey=${apiKey}`;
    console.log('Location Element:', locationElement);
    console.log('Location Value:', location);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (
          !data.data ||
          !data.data.timelines ||
          !data.data.timelines[0] ||
          !data.data.timelines[0].intervals ||
          !data.data.timelines[0].intervals[0] ||
          !data.data.timelines[0].intervals[0].values ||
          !data.data.timelines[0].intervals[0].values.temperature ||
          !data.data.timelines[0].intervals[0].values.weatherCode
        ) {
          throw new Error('Unexpected response format');
        }
        const currentWeather =
          data.data.timelines[0].intervals[0].values.temperature;
        const weatherCode =
          data.data.timelines[0].intervals[0].values.weatherCode;
        const weatherInfo = document.getElementById('weather-info');
        if (weatherInfo) {
          weatherInfo.innerHTML = `Weather in ${location}: Temperature ${currentWeather}°C, Weather Code ${weatherCode}`;
        } else {
          console.error('Weather info element not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }
  function fetchAndDisplayImages() {
    $.ajax({
      url: './data/image.json',
      dataType: 'json',
      success: function (data) {
        if (!Array.isArray(data.images)) {
          console.error('Images property is missing or not an array');
          return;
        }
        let images = data.images;
        let desiredWidth = 200;
        let desiredHeight = 150;
        images.forEach((image) => {
          if (typeof image.src !== 'string' || typeof image.alt !== 'string') {
            console.error('Image source or alt text is missing');
            return;
          }
          const titleAndCaption =
            (image['data-title'] ? image['data-title'] + ' - ' : '') +
            (image.caption || '');
          $('#gallery').append(`
                    <a href="${image.src}" data-lightbox="${image['data-lightbox']}" data-title="${titleAndCaption}">
                        <img src="${image.src}" alt="${image.alt}" style="width: ${desiredWidth}px; height: ${desiredHeight}px;">
                        <div class="caption">${image['data-title']}</div>
                    </a>
                `);
        });
        window.baguetteBox.run('#gallery', {
          overlayBackgroundColor: 'rgba(0,0,0,0.8)',
          captions: function (element) {
            if (element.getAttribute('data-opened') === 'true') {
              const titleAndCaption = element.dataset.title || 'No title';
              return '<div class="caption">' + titleAndCaption + '</div>';
            } else {
              const title = element.dataset.title || 'No title';
              return '<div class="caption">' + title + '</div>';
            }
          },
          afterShow: function (imageIndex, element) {
            element.setAttribute('data-opened', 'true');
          },
        });
      },
      error: function (xhr, status, error) {
        console.error('Error loading images:', error);
      },
    });
  }
  function displayEventsPage() {
    fetchEventData();
  }
  function displayGallerysPage() {
    console.error('Gallery Page');
  }
  async function fetchEventData() {
    const response = await axios.get('http://localhost:3000/public/events');
    console.log('Response:', response);
    displayEvents(response.data);
  }
  async function displayEvents(events) {
    console.log("🚀 ~ displayEvents ~ events:", events)
    let eventList = $('#event-list');
    eventList.empty();

    events.forEach((event) => {
      let eventItem = $('<div class="event-item"></div>');
      eventItem.append('<h2>' + event.title + '</h2>');
      eventItem.append(
        '<p>Date: ' + new Date(event.date).toDateString() + '</p>'
      );
      eventItem.append(
        '<p>Time: ' + new Date(event.date).toTimeString() + '</p>'
      );
      eventItem.append('<p>Description: ' + event.description + '</p>');
      if (event.image) {
        eventItem.append(
          '<img src="' + event.image + '" alt="' + event.title + '">'
        );
      }
      eventList.append(eventItem);
    });
  }

  function displayWeather(location, temperature, weatherCode) {
    console.log('Weather Code:', weatherCode);
    const weatherInfoContainer = document.getElementById('weather-info');
    if (weatherInfoContainer) {
      weatherInfoContainer.innerHTML = `
        <h2>Current Weather in ${location}</h2>
        <p>Temperature: ${temperature}°C</p>
        `;
    } else {
      console.error('Weather info container not found.');
    }
  }
  function fetchAndDisplayServices() {
    console.error('service loaded');
    $.getJSON('../../data/service.json', function (data) {
      const serviceContainer = $('#serviceDataPlaceholder');
      serviceContainer.empty();
      data.forEach(function (service) {
        const serviceTab = $('<div>').addClass('service-tab');
        const serviceName = $('<span>')
          .text(service.title)
          .appendTo(serviceTab);
        const chevronIcon = $('<i>')
          .addClass('fa-solid fa-chevron-down')
          .appendTo(serviceTab);
        serviceTab.appendTo(serviceContainer);
        const serviceContent = $('<div>')
          .addClass('service-content')
          .attr('id', service.id);
        $('<h3>').text(service.title).appendTo(serviceContent);
        $('<p>').text(service.description).appendTo(serviceContent);
        $('<img>')
          .attr('src', service.image)
          .attr('alt', service.title)
          .css({
            'max-width': '50%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          })
          .appendTo(serviceContent);
        serviceContent.appendTo(serviceContainer);
        serviceTab.on('click', function () {
          serviceContent.slideToggle();
          chevronIcon.toggleClass('fa-chevron-down fa-chevron-up');
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayServices();
  });
  function fetchAndDisplayPortfolio() {
    $.getJSON('./data/portfolio.json', function (data) {
      const projectContainer = $('#projectContainer');
      projectContainer.empty();
      data.forEach(function (project) {
        const projectDetails = $('<div>').addClass('project-details');
        $('<h2>').text(project.title).appendTo(projectDetails);
        $('<p>')
          .text('Description: ' + project.description)
          .appendTo(projectDetails);
        $('<p>')
          .text('Technologies: ' + project.technologies)
          .appendTo(projectDetails);
        $('<p>')
          .text('Role: ' + project.role)
          .appendTo(projectDetails);
        $('<img>')
          .attr('src', project.image)
          .attr('alt', project.title)
          .appendTo(projectDetails);
        projectDetails.appendTo(projectContainer);
      });
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayPortfolio();
  });
  function LoadHeader() {
    console.log('LoadHeader called');
    updateNavigation();
    $.get('header.html', function (html_data) {
      $('header').html(html_data);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    LoadHeader();
  });
  function DisplayRegistrationPage() {
    const validateRegistrationForm = () => {
      $('.form-control').removeClass('is-invalid');
      $('.invalid-feedback').empty();
      let isValid = true;
      const displayName = $('#displayName').val();
      if (!displayName.match(/^[A-Za-z\s]+$/)) {
        $('#displayName').addClass('is-invalid');
        $('#displayName')
          .siblings('.invalid-feedback')
          .text('Please enter a valid display name (only letters and spaces).');
        isValid = false;
      }
      const emailAddress = $('#emailAddress').val();
      if (!emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        $('#emailAddress').addClass('is-invalid');
        $('#emailAddress')
          .siblings('.invalid-feedback')
          .text('Please enter a valid email address.');
        isValid = false;
      }
      const phoneNumber = $('#phoneNumber').val();
      if (!phoneNumber.match(/^\d{10}$/)) {
        $('#phoneNumber').addClass('is-invalid');
        $('#phoneNumber')
          .siblings('.invalid-feedback')
          .text('Please enter a valid phone number.');
        isValid = false;
      }
      const address = $('#address').val();
      if (!address) {
        $('#address').addClass('is-invalid');
        $('#address')
          .siblings('.invalid-feedback')
          .text('Please enter your address.');
        isValid = false;
      }
      return isValid;
    };
    document.addEventListener('DOMContentLoaded', function () {
      const currentPage = location.pathname.split('/').pop();
      const navLinks = document.querySelectorAll(
        'header nav ul.navbar-nav li a'
      );
      navLinks.forEach((navLinkElement) => {
        const navLink = navLinkElement;
        const navItemLink = navLink.getAttribute('href');
        if (
          navItemLink &&
          (navItemLink === currentPage ||
            navItemLink === '../view/' + currentPage)
        ) {
          navLink.classList.add('active');
          navLink.style.fontWeight = 'bold';
        }
      });
    });
    $('#registerButton').click(async function (event) {
      event.preventDefault();
      if (validateRegistrationForm()) {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username: $('#displayName').val(),
          email: $('#emailAddress').val(),
          phoneNumber: $('#phoneNumber').val(),
          address: $('#address').val(),
          password: $('#password').val(),
        });
        if (response.status === 200) {
          alert('Registration successful!');
          const form = $('#registrationForm').get(0);
          form.reset();
        }
        const form = $('#registrationForm').get(0);
        form.reset();
      }
    });
    registerLinkHandler();
  }
  document.addEventListener('DOMContentLoaded', function () {
    const currentPage = location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('header nav ul.navbar-nav li a');
    navLinks.forEach((navLink) => {
      const navItemLink = navLink.getAttribute('href');
      if (
        navItemLink &&
        (navItemLink === currentPage ||
          navItemLink === '../view/' + currentPage)
      ) {
        navLink.classList.add('active');
        navLink.style.fontWeight = 'bold';
      }
    });
  });
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function showConfirmationModal() {
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const subjectElement = document.getElementById('subject');
    const messageElement = document.getElementById('message');
    const ratingElement = document.getElementById('ratingSelect');
    if (
      !nameElement ||
      !emailElement ||
      !subjectElement ||
      !messageElement ||
      !ratingElement
    ) {
      alert('Some form elements could not be found.');
      return;
    }
    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const subject = subjectElement.value.trim();
    const message = messageElement.value.trim();
    const rating = ratingElement.value;
    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.style.display = 'block';
      const confirmName = document.getElementById('confirmName');
      const confirmEmail = document.getElementById('confirmEmail');
      const confirmSubject = document.getElementById('confirmSubject');
      const confirmMessage = document.getElementById('confirmMessage');
      const confirmRating = document.getElementById('confirmRating');
      if (confirmName) confirmName.textContent = name;
      if (confirmEmail) confirmEmail.textContent = email;
      if (confirmSubject) confirmSubject.textContent = subject;
      if (confirmMessage) confirmMessage.textContent = message;
      if (confirmRating) confirmRating.textContent = getRatingText(rating);
    } else {
      console.error('Confirmation modal not found.');
    }
  }

  async function addEvent(e) {
    e.preventDefault();
    let title = $('#event-title').val();
    let description = $('#event-description').val();

    const response = await axios.post(
      'http://localhost:3000/events',
      {
        title,
        description,
        date: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: sessionStorage.getItem('displayName'),
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      $('#event-title').val('');
      $('#event-description').val('');
    }

    console.log('Response:', response);
    displayEventPlanningData();
  }

  async function updateProfile(e) {
    e.preventDefault();
    let phoneNumber = $('#user-phone-number').val();
    let address = $('#user-address').val();

    const response = await axios.put(
      'http://localhost:3000/profile',
      {
        phoneNumber,
        address,
      },
      {
        headers: {
          Authorization: sessionStorage.getItem('displayName'),
        },
      }
    );

    displayUserProfile();
  }

  async function addBlog(e) {
    e.preventDefault();
    let title = $('#blog-title').val();
    let description = $('#blog-description').val();

    const response = await axios.post(
      'http://localhost:3000/posts',
      {
        title: title,
        content: description,
      },
      {
        headers: {
          Authorization: sessionStorage.getItem('displayName'),
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      $('#blog-title').val('');
      $('#blog-description').val('');
    }

    console.log('Response:', response);
    loadBlogPosts();
  }
  function hideConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.style.display = 'none';
    } else {
      console.error('Confirmation modal not found.');
    }
  }
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
  function submitForm() {
    hideConfirmationModal();
    const modal = document.getElementById('myModal');
    if (!modal) {
      console.error('Modal element not found.');
      return;
    }
    modal.style.display = 'block';
    let seconds = 5;
    let countdownElement = document.getElementById('countdown');
    if (!countdownElement) {
      console.error('Countdown element not found.');
      return;
    }
    let countdownInterval = setInterval(function () {
      seconds--;
      const element = countdownElement;
      element && (element.textContent = seconds.toString());
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        window.location.href = 'home.html';
      }
    }, 1000);
  }
  function DisplayCareerPage() {
    console.error('Gallery Page');
  }
  function DisplayLoginPage() {
    console.error('Gallery Page');
  }
  function DisplayServicePage() {
    console.log('Called DisplayServicePage');
  }
  function DisplayContactPage() {
    console.error('contact Page');
  }
  function DisplayHomePage() {
    console.error('home Page');
  }
  function DisplayAboutPage() {
    console.error('about Page');
  }
  function updateNavigation() {
    const displayName = sessionStorage.getItem('displayName');
    const loginLink = $('#loginLink');
    const registerLink = $('#registerLink');
    const statisticsLink = $('#statisticsLink');
    const planningLink = $('#PlanningLink');
    const profileLink = $('#ProfileLink');
    const blogLink = $('#BlogLink');

    if (displayName) {
      loginLink.text('Logout').data('action', 'logout');
      statisticsLink.show();
      registerLink.hide();
      planningLink.show();
      profileLink.show();
      blogLink.show();
    } else {
      loginLink.text('Login').data('action', 'login');
      statisticsLink.hide();
      planningLink.hide();
      profileLink.hide();
      blogLink.hide();
    }
  }
  $('#loginLink').on('click', function () {
    const action = $(this).data('action');
    if (action === 'logout') {
      sessionStorage.removeItem('displayName');
      loginLink.text('Login').data('action', 'login');
    }
    updateNavigation();
    window.location.href = '/';
  });
  function displayLoginPage() {
    console.log('Displaying login page...');
    registerLinkHandler();
    $('#loginButton').on('click', async function () {
      let username = $('#username').val();
      let password = $('#password').val();
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        sessionStorage.setItem('displayName', response.data.token);
        updateNavigation();
        location.href = '/';
        return;
      }
      $('#username').trigger('focus').trigger('select');
      $('#messageArea')
        .addClass('alert alert-danger')
        .text('Error: Invalid Credentials')
        .show();
    });
    $('#cancelButton').on('click', function () {
      document.forms[0].reset();
      location.href = 'index.html';
    });
  }
  async function displayEventPlanningData() {
    document.getElementById('addEventToThis').addEventListener('click', (e) => {
      e.preventDefault();
      addEvent(e);
    });

    const response = await axios.get('http://localhost:3000/events', {
      headers: {
        Authorization: sessionStorage.getItem('displayName'),
      },
    });

    if (response.status === 200) {
      const events = response.data;
      const eventList = document.getElementById('calendar');
      eventList.innerHTML = '';
      events.forEach((eventItem) => {
        const eventPlanningContainer = document.createElement('div');
        eventPlanningContainer.classList.add('event-planning-item');
        const titleElement = document.createElement('h2');
        titleElement.textContent = eventItem.title;
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = eventItem.description;
        const organizerElement = document.createElement('p');
        organizerElement.innerHTML = `<strong>Organizer:</strong> MySelf`;
        const dateElement = document.createElement('p');
        dateElement.innerHTML = `<strong>Date:</strong> ${new Date(
          eventItem.date
        ).toDateString()}`;
        const timeElement = document.createElement('p');
        timeElement.innerHTML = `<strong>Time:</strong> ${new Date(
          eventItem.date
        ).toLocaleTimeString()}`;
        //add two button edit and delete
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn');
        editButton.classList.add('btn-success');
        editButton.addEventListener('click', async () => {
          const newDescription = prompt('Enter new description');
          if (!newDescription) return;
          const response = await axios.put(
            `http://localhost:3000/events/${eventItem._id}`,
            {
              description: newDescription,
            },
            {
              headers: {
                Authorization: sessionStorage.getItem('displayName'),
              },
            }
          );
          if (response.status === 200) {
            descriptionElement.textContent = newDescription;
          }
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn-danger');
        deleteButton.classList.add('btn');
        deleteButton.addEventListener('click', async () => {
          const response = await axios.delete(
            `http://localhost:3000/events/${eventItem._id}`,
            {
              headers: {
                Authorization: sessionStorage.getItem('displayName'),
              },
            }
          );
          if (response.status === 200) {
            eventPlanningContainer.remove();
          }
        });

        eventPlanningContainer.appendChild(titleElement);
        eventPlanningContainer.appendChild(descriptionElement);
        eventPlanningContainer.appendChild(organizerElement);
        eventPlanningContainer.appendChild(dateElement);
        eventPlanningContainer.appendChild(timeElement);
        eventPlanningContainer.appendChild(editButton);
        eventPlanningContainer.appendChild(deleteButton);
        const mainContainer = document.querySelector('.container');
        if (mainContainer) {
          mainContainer.appendChild(eventPlanningContainer);
        } else {
          console.error('Main container not found');
        }
      });
    }

    fetch('../data/planning.json')
      .then((response) => response.json())
      .then((data) => {
        data.events.forEach((eventItem) => {});
      })
      .catch((error) => {
        console.error('Error fetching event planning data:', error);
      });
  }

  async function displayUserProfile() {
    document
      .getElementById('click-me-to-add-user')
      .addEventListener('click', (e) => {
        e.preventDefault();
        updateProfile(e);
      });

    const response = await axios.get('http://localhost:3000/profile', {
      headers: {
        Authorization: sessionStorage.getItem('displayName'),
      },
    });

    if (response.status === 200) {
      const user = response.data;
      const userContainer = document.getElementById('user-container');
      userContainer.innerHTML = '';
      const userItem = document.createElement('div');
      userItem.classList.add('user-item');
      const nameElement = document.createElement('h2');
      nameElement.textContent = user.username;
      const emailElement = document.createElement('p');
      emailElement.textContent = user.email;
      const phoneElement = document.createElement('p');
      phoneElement.textContent = user.phoneNumber;
      const addressElement = document.createElement('p');
      addressElement.textContent = user.address;

      userItem.appendChild(nameElement);
      userItem.appendChild(emailElement);
      userItem.appendChild(phoneElement);
      userItem.appendChild(addressElement);
      userContainer.appendChild(userItem);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn-danger');
      deleteButton.classList.add('btn');
      deleteButton.addEventListener('click', async () => {
        const response = await axios.delete('http://localhost:3000/profile', {
          headers: {
            Authorization: sessionStorage.getItem('displayName'),
          },
        });
        if (response.status === 200) {
          userItem.remove();
          //remove displayName form session
          sessionStorage.removeItem('displayName');
          updateNavigation();
          window.location.href = '/';
        }
      });

      document.getElementById('user-phone-number').value = user.phoneNumber;
      document.getElementById('user-address').value = user.address;

      userItem.appendChild(deleteButton);
    }
  }
  function registerLinkHandler() {
    $('a[data="register"]').on('click', () => {
      window.location.href = '../view/content/register.html';
    });
  }
  registerLinkHandler();
  function ActiveLinkCallback() {
    switch (router.ActiveLink) {
      case 'home':
        return LoadHeader;
      case 'blog':
        return loadBlogPosts;
      case 'service':
        return fetchAndDisplayServices;
      case 'events':
        return displayEventsPage;
      case 'contact':
        return DisplayContactPage;
      case 'register':
        return DisplayRegistrationPage;
      case 'portfolio':
        return fetchAndDisplayPortfolio;
      case 'weather':
        return getWeather;
      case 'gallery':
        return fetchAndDisplayImages;
      case 'career':
        return DisplayCareerPage;
      case 'login':
        return displayLoginPage;
      case 'statistics':
        return createChartFromJSON;
      case 'events-planning':
        return displayEventPlanningData;
      case 'profile':
        return displayUserProfile;
      default:
        console.error(
          'Error callback function does not exist' + router._activeLink
        );
        return new Function();
    }
  }
  function CapitalizeFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  ActiveLinkCallback();
  function LoadHeaderone() {
    console.log('header');
    $.get('./view/components/header.html', function (html_data) {
      $('header').html(html_data);
      document.title = CapitalizeFirstCharacter(router.ActiveLink);
      $(`li>a:contains(${document.title})`)
        .addClass('active')
        .attr('aria-current', 'page');
      updateNavigation();
      AddNavigationEvents();
    });
  }
  function LoadContent() {
    let page_name = router.ActiveLink;
    let callback = ActiveLinkCallback();
    $.get(`./view/content/${page_name}.html`, function (html_data) {
      $('main').html(html_data);
      callback();
    });
  }
  LoadContent();
  ActiveLinkCallback();
  function LoadFooter() {
    $.get('./view/components/footer.html', function (html_data) {
      $('footer').html(html_data);
    });
  }
  function Start() {
    console.log('App Started...');
    updateNavigation();
    LoadHeaderone();
    generateFooter();
    ActiveLinkCallback();
  }
  window.addEventListener('load', Start);
})();
//# sourceMappingURL=main.js.map
