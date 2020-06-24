const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for exxpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Terry Frye'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'Terry Frye Jr'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        name: 'Terry Frye',
        message: 'Here is your help text'
    })
})

app.get('/weather', (req, res) => {
    const geoLocationToSearch = req.query.address;
    if (!geoLocationToSearch) {
        return res.send({
            error: 'You must provide a search address'
        })
    }
    
    geocode(geoLocationToSearch, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            } 

            res.send({
                forecast: forecastData,
                location: location,
                address: geoLocationToSearch
            })
        })    
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []  
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My 404 page', 
        name: 'Terry Frye',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 page', 
        name: 'Terry Frye',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is now up on port 3000.')
})