var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var bookRouter = require('./routes/book');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var addressRouter = require('./routes/address');
// var basketRouter = require('./routes/basket');

var cors = require('cors');

var app = express();


console.log(process.env.DATABASE_HOST);
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/book',bookRouter);
app.use('/user',userRouter);
app.use('/order',orderRouter);
app.use('/address',addressRouter);
// app.use('/basket',basketRouter);

//catch 404 and forword to error handler
app.use(function(req,res,next){
    next(createError(404));
});

//error handler
app.use(function(err,req,res,next){
    //set locals, only providing error in development

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

