// import files
import express from 'express'
import morgan from 'morgan'
import lodash from 'lodash'
import nunjucks from 'nunjucks'
import path from 'path'
import url from 'url'

// create my express instance
const app = express()

// setup middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

const rootDir = url.fileURLToPath(new URL('.', import.meta.url))
app.use(express.static(path.join(rootDir, 'public')))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// endpoints/handler functions
app.get('/hello', (req, res) => {
    res.send('Hello there')
})

app.get('/', (req, res) => {
    res.render("home.html")
})

// create a get request that renders the form.html
// when someone hits the /form endpoint

app.get('/form', (req, res) => {
    res.render('form.html')
})

app.get('/welcome', (req, res) => {
    console.log(req.query)
    let {person} = req.query

    res.send(`Welcome, ${person}`)
})

app.post('/favNumber', (req, res) => {
    console.log('query', req.query)
    console.log('body', req.body)
    console.log('params', req.params)

    let {favoriteNum} = req.body

    res.send(`Your favorite number, ${favoriteNum}, has been noted`)
})

app.post('/users/:userColor', (req, res) => {
    console.log('query', req.query)
    console.log('body', req.body)
    console.log('params', req.params)

    res.send(`${req.body.color} is a great favorite color`)
})

app.get('/bridge', (req, res) => {
    res.render('bridge.html')
})

app.post('/otherSide', (req, res) => {
    console.log(req.body)

    let compliments = ['nice', 'cool', 'smart']

    let {name, quest, color} = req.body

    res.render('otherSide.html', {
        username: name,
        userQuest: quest,
        userColor: color,
        compliments: compliments
    })
})

// open server with app.listen
app.listen(4545, () => console.log('Avengers assemble on port 4545'))