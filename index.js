require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const user = require('./controllers/usercontroller');
const poll = require('./controllers/pollcontroller');
const response = require('./controllers/responsecontroller');
const admin = require('./controllers/admincontroller');
//test this

sequelize.sync() //{force:true}

let PORT = 3001

app.use(express.json())
app.use(require('./middleware/header'))


app.use('/user', user)
app.use(require('./middleware/stalePoll'))
app.use('/poll', poll)
app.use('/response', response)
app.use('/admin', admin)

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`)
})