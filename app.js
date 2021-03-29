const express = require('express')
const itemsRoutes = require('./itemsRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/items', itemsRoutes)

//Error Handling
app.use(function (err, req, res, next) {
    let status = err.status || 404;
    let message = err.msg;
  
    return res.status(status).json({
      error: { message, status }
    });
});


module.exports = app;