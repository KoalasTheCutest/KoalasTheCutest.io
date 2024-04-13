const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('./middleware/auth.middleware');
const path = require('path');
const { User } = require('./models/index.model');
const router = require('./controllers/index.controller');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client'));
app.use(router);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/portfolio', (req, res) => {
  res.render('gallery');
});

app.get('/gallery', (req, res) => {
  res.render('gallery');
});

app.get('/service', (req, res) => {
  res.render('service');
});

app.get('/team', (req, res) => {
  res.render('team');
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/weather', (req, res) => {
  res.render('weather');
});
app.get('/statistics', (req, res) => {
  res.render('statistics');
});

app.get('/events-planning', (req, res) => {
  res.render('events-planning');
});

app.get('/blog', (req, res) => {
  res.render('blog');
});

app.get('/user/profile', (req, res) => {
  res.render('profile');
});


app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.get('/terms', (req, res) => {
  res.render('terms');
});






// Import the user model
// Register API
app.post('/auth/register', async (req, res) => {
  try {
    const { username, password, phoneNumber, address, email } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      phoneNumber,
      address,
      email,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'secretKey');

    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login API
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect to MongoDB using mongoose
mongoose
  .connect(
    'mongodb+srv://harmony:admin123@harmony.oawznpc.mongodb.net/?retryWrites=true&w=majority&appName=harmony'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
