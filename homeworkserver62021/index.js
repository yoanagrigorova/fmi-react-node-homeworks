const cors = require('cors')

const usersRouter = require('./users.js');
const users = usersRouter.router;

const recipesRouter = require('./recipes.js');
const recipes = recipesRouter.router;

const port = 8000;

const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodb = require('mongodb');
const monk = require('monk');
const db = monk('mongodb://yoana.grigorova:magic123@ds029828.mlab.com:29828/homework62021');
const app = express();
const MongoStore = require('connect-mongo')(session);
let router = express.Router();

app.use(function (req, res, next) {
    req.db = db;
    next();
});


app.use(bodyParser.json())
const corsOptions = {
    origin: ["http://localhost:3000", "https://homework62021.herokuapp.com", "*"], //the port my react app is running on.
    credentials: true,
};

// var whitelist = ["http://localhost:3000", 'https://homework62021.herokuapp.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }, 
//   credentials: true
// }
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'Shh, its a secret!', maxAge: 600000000, resave: true, saveUninitialized: false,
    cookie: { secure: false, httpOnly: false, maxAge: 600000000 },
    store: new MongoStore({ url: 'mongodb://yoana.grigorova:magic123@ds029828.mlab.com:29828/homework62021', autoRemove: 'native', ttl: 1 * 1 * 5 * 60 })
}));
app.use(router);
app.use('/users', users);
app.use('/recipes', recipes);
const server = http.createServer(app);

const io = socketIo(server);


server.listen(process.env.PORT || port, () => {
    console.log(`app started on port ${port}`);
});