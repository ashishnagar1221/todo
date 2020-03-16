const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const routes = require('./routes/ShowAll')

const port = process.env.PORT || 3600;
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://user:root@taramandal-puhil.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }).then(() => console.log("DB Connected"))


app.set('view engine','ejs')
app.use(express.static(__dirname + "/public"));
app.use('/',routes);

app.listen(port , function(){
    console.log(`Listening at port ${port}`);
})


/*Mongo URL*/

//mongodb+srv://user:root@ashish-gupgf.mongodb.net/test?retryWrites=true&w=majority