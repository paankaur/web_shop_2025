const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3333;

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require('./util/db');

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully to web_shop DB.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



app.get('/', (req, res) => {
    res.send('Express server is running on port 3333');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});