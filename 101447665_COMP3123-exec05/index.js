const express = require('express');
const fs = require('fs');  
const path = require('path'); 

const app = express();
const router = express.Router();

// Middleware to parse JSON body
app.use(express.json());

// 1. Route to serve the home.html file
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// 2. Route to serve user data from user.json
router.get('/profile', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading user data' });
        }
        res.json(JSON.parse(data));  // Send the user data as JSON
    });
});

// 3. Route for user authentication
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read user data from user.json
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading user data' });
        }

        const user = JSON.parse(data); // Assuming user.json contains a single user object

        // Validate the username and password
        if (user.username !== username) {
            return res.json({ status: false, message: 'User Name is invalid' });
        }

        if (user.password !== password) {
            return res.json({ status: false, message: 'Password is invalid' });
        }

        // If credentials are valid
        res.json({ status: true, message: 'User Is valid' });
    });
});

// 4. Route for logging out a user
router.get('/logout', (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).send('<b>Username is required to logout.<b>');
    }

    res.send(`<b>${username} successfully logged out.<b>`);
});

// 5. Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Server Error');
});

// Use the router
app.use('/', router);

// Start the server
app.listen(process.env.PORT || 8081, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
