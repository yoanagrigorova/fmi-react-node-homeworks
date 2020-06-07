var express = require('express');
var router = express.Router();
const sha1 = require('sha1');

router.get("/all", function (req, res) {
    let db = req.db;
    let User = db.get("users");
    User.find().then(data => {
        let users = data.filter(u => u._id).map(data => {
            return {
                id: data._id,
                name: data.name,
                username: data.username,
                role: data.role,
                description: data.description,
                gender: data.gender,
                dateOfRegistration: data.dateOfRegistration,
                dateOfModification: data.dateOfModification,
                photo: data.photo
            }
        })
        res.send(users)
    })
})

router.get('/checkSession', function (req, res) {
    // console.log(req.sessionID)
    if (req.session.user) {
        res.send(req.session.user)
    } else {
        res.send(JSON.stringify(null));
    }
});

router.get('/signOut', function (req, res) {
    // console.log(req.sessionID)
    if (req.session.user) {
        req.session.destroy();
        res.send(JSON.stringify(null))
    } else {
        res.sendStatus(JSON.stringify(null));
    }
});

router.post('/create', function (req, res) {
    let db = req.db;
    let User = db.get("users");
    User.insert({
        username: req.body.username,
        name: req.body.name,
        password: sha1(req.body.password),
        gender: req.body.gender,
        description: null,
        status: "active",
        dateOfRegistration: req.body.dateOfRegistration,
        dateOfModification: null,
        role: "user",
        photo: "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
    }).then((data) => {
        req.session.user = {
            id: data._id,
            name: data.name,
            username: data.username,
            role: data.role,
            description: data.description,
            gender: data.gender,
            dateOfRegistration: data.dateOfRegistration,
            dateOfModification: data.dateOfModification,
            photo: data.photo
        }
        res.send({
            result: "success",
            id: data._id,
            name: data.name,
            username: data.username,
            role: data.role,
            description: data.description,
            gender: data.gender,
            dateOfRegistration: data.dateOfRegistration,
            dateOfModification: data.dateOfModification,
            photo: data.photo
        })
    }).catch((err) => {
        if (err.errmsg && err.errmsg.indexOf(req.body.username) !== -1) {
            res.send({
                result: "error",
                key: "username",
                message: "This username is already taken."
            })
        }
        res.send(err)
    });

})

router.post('/login', function (req, res) {
    let db = req.db;
    let User = db.get("users");
    User.findOne({
        username: req.body.username,
        password: sha1(req.body.password),
    }).then((data) => {
        req.session.user = {
            id: data._id,
            name: data.name,
            username: data.username,
            role: data.role,
            description: data.description,
            gender: data.gender,
            dateOfRegistration: data.dateOfRegistration,
            dateOfModification: data.dateOfModification,
            photo: data.photo
        }
        req.session.save()
        res.send({
            result: "success",
            id: data._id,
            name: data.name,
            username: data.username,
            role: data.role,
            description: data.description,
            gender: data.gender,
            dateOfRegistration: data.dateOfRegistration,
            dateOfModification: data.dateOfModification,
            photo: data.photo
        })
    }).catch((err) => {
        res.send({
            result: "error",
            message: "User information is incorrect."
        })
    });

})

router.put("/edit", function (req, res) {
    let db = req.db;
    let User = db.get("users");
    User.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            name: req.body.name,
            username: req.body.username,
            role: req.body.role,
            description: req.body.description,
            gender: req.body.gender,
            dateOfRegistration: req.body.dateOfRegistration,
            dateOfModification: req.body.dateOfModification,
            photo: req.body.photo
        }
    }).then(data => {
        if (req.session.user.id === req.body.id) {
            req.session.user = {
                id: data._id,
                name: data.name,
                username: data.username,
                role: data.role,
                description: data.description,
                gender: data.gender,
                dateOfRegistration: data.dateOfRegistration,
                dateOfModification: data.dateOfModification,
                photo: data.photo
            }
        }
        res.send(data)
    })
})

router.delete("/delete", function (req, res) {
    let db = req.db;
    let User = db.get("users");
    User.findOneAndDelete({ _id: req.body.id }).then(data => {
        res.send(data)
    })
})

module.exports = {
    router: router
};
