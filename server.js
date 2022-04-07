require('dotenv').config()
const app = require('express')();
const connectToDb = require('./config/db.js');
const bodyParser = require("body-parser");
const UserModel = require("./models/User");
const FavoriteBrandModel = require("./models/FavoriteBrand");
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
        let list = await  UserModel.aggregate().lookup({
            from: 'favoritebrands',
            localField: 'favorite_brand_id', 
            foreignField: '_id', as: 'brand'
        }) || [];

        let brands = await FavoriteBrandModel.find() || [];
        
        res.render(__dirname + '/templates/index.ejs', {
            user: user.name, 
            gender: user.genre, 
            error:false, 
            success: req.query.success || false, 
            list,
            brands
        });

    } catch (e) {
        res.render(__dirname + '/templates/index.ejs', {error: e, success: false});
    }
    
});

// Add a new entry, new user in database
app.post('/personne', async (req, res) => {
    try {
        let newUser = await UserModel.create({
            name: req.body.username,
            genre: req.body.genre,
            favorite_brand_id:   req.body.favbrand 
        });

        newUser && res.redirect('/?success=1');
    } catch(e) {
        res.redirect('/?success=0');
    }
});

// 404 page
app.get("/notfound", (req, res) => {
    res.send("404 not found");
});

//Custom editing page based on user id (username)
app.get('/personne/:id', async (req, res) => {
    try {

        //find user and join infos with favoritebrand collection
        let infos = await UserModel.aggregate().match({name: req.params.id}).lookup({
            from: 'favoritebrands',
            localField: 'favorite_brand_id', 
            foreignField: '_id', as: 'brand'
        });

        let brands = await FavoriteBrandModel.find() || [];
        let brand = await infos[0].brand.length > 0 ?  infos[0].brand[0]['_id'] : "";

        if (!infos) await res.redirect('/notfound');


        res.render(__dirname + '/templates/personne/edit.ejs', { brand, name: infos[0].name, genre: infos[0].genre, success: req.query.success || false, brands});
    } catch (e) {
        console.log(e)
        res.render(__dirname + '/templates/personne/edit.ejs', {error: e, success: false});
    }
});

//Handle update when submitting form
app.post('/personne/:id', async (req, res) => {
    try {
        let user = await UserModel.findOne({name: req.params.id});
        user.name = await req.body.username;
        user.genre = await req.body.genre;
        user.favorite_brand_id = await req.body.favbrand;

        await user.save();

        res.redirect(`/personne/${req.body.username}/?success=1`);
    } catch (e) {
        res.redirect(`/personne/${req.body.username}/?success=0`);
    }
});


//start server
const listener = app.listen(process.env.PORT, () => console.log(`Server listening on port ${listener.address().port}`));