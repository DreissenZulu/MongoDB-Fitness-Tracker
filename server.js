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

app.get("/populate/:workoutID", (req, res) => {
    db.Workout.find({_id: req.params.workoutID})
    .populate("exercises")
    .then(dbRoutine => {
        res.status(200).send(dbRoutine);
    })
        .catch(err => {
        res.status(200).send(err);
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
    let exerciseInfo = {
        name: req.body.name,
        reps: req.body.reps
    }
    const newExercise = new db.Exercise(exerciseInfo)
    db.Exercise.create(newExercise)
        .then(({_id}) => 
            db.Workout.findOneAndUpdate({_id: req.body.workout}, { $push: { exercises: _id } }, { new: true }))
        .then(dbRoutine => {
            res.status(200).send(dbRoutine);
        })
        .catch(err => {
            res.status(200).send(`Invalid data.`)
        })
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});