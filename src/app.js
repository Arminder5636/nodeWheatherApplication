const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Temple engines are used to add dynamic pages for your website

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
// const view


const app = express();
//define paths for express congiure
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handelebargs engine for view
app.set('view engine', 'hbs');
app.set('views', viewPaths);
hbs.registerPartials(partialPath);


//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arminder singh'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'about me..'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Help'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please search for a location'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

    // res.send({
    //     location: req.query.address,
    //     forecast: 'weather is in love'
    // });
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please search for something'
        });
    }
    // console.log(req.query.search);
    res.send({
        products: [req.query.search]
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather app',
        name: 'Page doesn\'t exist',
        errorMessage: 'page you are trying to access is currently not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather app',
        name: '404 Page',
        errorMessage: 'Page not found.Please change your search term or visit later'
    });
})



app.listen(3000, () => {
    console.log('server is up on port 3000');
})

