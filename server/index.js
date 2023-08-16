let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const recipeRoute = require('../server/routes/recipe.routes.js')
const app = express();

const createError = (x) => {
  console.log('error', x)
};

mongoose.connect('mongodb+srv://admin:3f9YhY15kdONnCrp@maincluster.chmo1rm.mongodb.net/?retryWrites=true&w=majority').then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  }).catch((err) => {
    console.error('Error connecting to mongo', err.reason)
})


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/recipes', recipeRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});