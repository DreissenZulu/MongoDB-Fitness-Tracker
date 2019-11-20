const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/fitness', { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.status(200).sendFile("index.html");
})

app.get("/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbRoutine => {
            res.status(200).send(dbRoutine);
        })
        .catch(err => {
            res.status(200).send("No data");
        });
})

app.post("/submit", (req, res) => {
    const newRoutine = new db.Workout(req.body)
    db.Workout.create(newRoutine)
        .then(dbRoutine => {
            res.status(200).send(dbRoutine);
        })
        .catch(err => {
            res.status(200).send(`Workout already exists.`)
        })
});

app.post("/add", (req, res) => {
    const newRoutine = new db.Workout(req.body)
    db.Workout.create(newRoutine)
        .then(dbRoutine => {
            res.status(200).send(dbRoutine);
        })
        .catch(err => {
            res.status(200).send(`Workout already exists.`)
        })
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});