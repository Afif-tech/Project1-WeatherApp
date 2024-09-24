require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const weatherRouter = require('./router/weatherRouter');
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', weatherRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});