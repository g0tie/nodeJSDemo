require('dotenv').config()
const app = require('express')();
const connectToDb = require('./config/db.js');
const bodyParser = require("body-parser");
const UserModel = require("./models/User");

connectToDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');

// Compile the source code
app.get('/', async (req, res) => {

    try {
        let user = await UserModel.findOne({name: "Gaultier"});
        res.render(__dirname + '/templates/index.ejs', {user: user.name, gender: user.genre, error:false});
    } catch (e) {
        res.render(__dirname + '/templates/index.ejs', {error: e});
    }

});

app.get('/personne/:id', (req, res) => {
    res.render(__diranme + '/templates/personnes/index.ejs', {name: req.params.id });
});

const listener = app.listen(process.env.PORT, () => console.log(`Server listening on port ${listener.address().port}`));