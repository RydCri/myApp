var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');
const multiparty = require("multiparty");
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var layoutRouter = require('./routes/layout');
var databaseRouter = require('./routes/database');
var categoriesRouter = require('./routes/categories');
const createHttpError = require("http-errors");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/layout', layoutRouter);
app.use('/api/v1/database', databaseRouter);
app.use('/api/v1/coins/categories', categoriesRouter)

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

const transporter = nodemailer.createTransport({
    host: "smtp.live.com", //your email provider
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

app.post("/send", (req, res) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });

        //2. You can configure the object however you want
        const mail = {
            from: data.name,
            to: process.env.EMAIL,
            subject: data.subject,
            text: `${data.name} <${data.email}> \n${data.message}`,
        };

        //3.
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
            } else {
                res.status(200).send("Email successfully sent to recipient!");
            }
        });
    });
});


//404 err view
app.use(function(req,res,next){
    res.status(404).render('404');
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
        message: err.message,
        error: {}
    });
});

app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
            'port'
        )} | Environment : ${app.get('env')}`
    );
});

module.exports = app;
