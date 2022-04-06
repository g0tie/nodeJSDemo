require('dotenv').config()
const app = require('express')();
const connectToDb = require('./config/db.js');
const bodyParser = require("body-parser");
const UserModel = require("./models/User");
const { redirect } = require('express/lib/response');

connectToDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');

// Compile the source code
app.get('/', async (req, res) => {

    try {
        let user = await UserModel.findOne({name: "Eric"});
        res.render(__dirname + '/templates/index.ejs', {user: user.name, gender: user.genre, error:false, success: req.query.success || false});
    } catch (e) {
        res.render(__dirname + '/templates/index.ejs', {error: e, success: false});
    }

});

app.get("/notfound", (req, res) => {
    res.send("404 not found");
});

app.get('/personne/:id', async (req, res) => {
    try {
        let infos = await UserModel.findOne({name: req.params.id});

        if (!infos) await res.redirect('/notfound');

        res.render(__dirname + '/templates/personne/index.ejs', { name: infos.name, genre: infos.genre, success: req.query.success || false });
    } catch (e) {
        res.render(__dirname + '/templates/personne/index.ejs', {error: e, success: false});
    }
});

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

const listener = app.listen(process.env.PORT, () => console.log(`Server listening on port ${listener.address().port}`));