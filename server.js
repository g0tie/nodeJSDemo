require('dotenv').config()
const app = require('express')();
const connectToDb = require('./config/db.js');
const bodyParser = require("body-parser");
const UserModel = require("./models/User");
const { redirect } = require('express/lib/response');

//Set connection to database
connectToDb();

//set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');

// SETTING ROUTES AND CONTROLLERS DIRECTLY (because it's a small app)

// Homepage
app.get('/', async (req, res) => {

    try {
        let user = await UserModel.findOne({name: "Eric"});
        let list = await UserModel.find() || [];
        res.render(__dirname + '/templates/index.ejs', {user: user.name, gender: user.genre, error:false, success: req.query.success || false, list});
    } catch (e) {
        res.render(__dirname + '/templates/index.ejs', {error: e, success: false});
    }

});

// 404 page
app.get("/notfound", (req, res) => {
    res.send("404 not found");
});

//Custom editing page based on user id (username)
app.get('/personne/:id', async (req, res) => {
    try {
        let infos = await UserModel.findOne({name: req.params.id});

        if (!infos) await res.redirect('/notfound');

        res.render(__dirname + '/templates/personne/index.ejs', { name: infos.name, genre: infos.genre, success: req.query.success || false });
    } catch (e) {
        res.render(__dirname + '/templates/personne/index.ejs', {error: e, success: false});
    }
});

//Handle update when submitting form
app.post('/personne/:id', async (req, res) => {
    try {
        let user = await UserModel.findOne({name: req.params.id});
        user.name = await req.body.username;
        user.genre = await req.body.genre;

        await user.save();

        res.redirect(`/personne/${req.body.username}/?success=1`);
    } catch (e) {
        res.redirect(`/personne/${req.body.username}/?success=0`);
    }
});

// Add a new entry, new user in database
app.post('/personne', async (req, res) => {
    try {
        let newUser = UserModel.create({
            name: req.body.username,
            genre: req.body.genre
        });

        res.redirect('/?success=1');
    } catch(e) {
        res.redirect('/?success=0');
    }
});

//start server
const listener = app.listen(process.env.PORT, () => console.log(`Server listening on port ${listener.address().port}`));