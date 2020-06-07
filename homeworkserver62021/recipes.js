var express = require('express');
var router = express.Router();

router.get("/all", function (req, res) {
    let db = req.db;
    let Recipes = db.get("recipes");
    Recipes.find().then(recipes => {
        res.send(recipes)
    })
})

router.get("/recipe", function (req, res) {
    let db = req.db;
    let Recipes = db.get("recipes");
    Recipes.find({_id: req.query.recipeID}).then(recipe => {
        res.send(recipe)
    })
})

router.post('/create', function (req, res) {
    let db = req.db;
    let Recipes = db.get("recipes");
    Recipes.insert({
        user: req.body.user,
        name: req.body.name,
        short_description: req.body.short_description,
        time_to_cook: req.body.time_to_cook,
        products: req.body.products,
        photo: req.body.photo,
        time_of_creation: req.body.time_of_creation,
        time_of_modification: null,
        long_description: req.body.long_description,
        tags: req.body.tags
    }).then((data) => {
        res.send({
            result: "success",
            ...data
        })
    }).catch((err) => {
        res.send(err)
    });

})

router.put("/edit", function (req, res) {
    let db = req.db;
    let Recipes = db.get("recipes");
    Recipes.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
            user: req.body.user,
            name: req.body.name,
            short_description: req.body.short_description,
            time_to_cook: req.body.time_to_cook,
            products: req.body.products,
            photo: req.body.photo,
            time_of_creation: req.body.time_of_creation,
            time_of_modification: req.body.time_of_modification,
            long_description: req.body.long_description,
            tags: req.body.tags
        }
    }).then(data => {
        res.send(data)
    })
})

router.delete("/delete", function (req, res) {
    let db = req.db;
    let Recipes = db.get("recipes");
    Recipes.findOneAndDelete({ _id: req.body._id }).then(data => {
        res.send(data)
    })
})

module.exports = {
    router: router
};
