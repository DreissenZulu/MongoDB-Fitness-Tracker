const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const db = require("../models");

mongoose.connect('mongodb://localhost/fitness', { useNewUrlParser: true });

router.get("/", (req, res) => {
    res.status(200).sendFile("index.html");
})

router.get("/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbRoutine => {
            res.status(200).send(dbRoutine);
        })
        .catch(err => {
            res.status(200).send("No data");
        });
})

router.get("/populate/:workoutID", (req, res) => {
    db.Workout.find({_id: req.params.workoutID})
    .populate("exercises")
    .then(dbRoutine => {
        res.status(200).send(dbRoutine);
    })
        .catch(err => {
        res.status(200).send(err);
    });
})

router.post("/submit", (req, res) => {
    const newRoutine = new db.Workout(req.body)
    db.Workout.create(newRoutine)
        .then(dbRoutine => {
            res.status(200).send(dbRoutine);
        })
        .catch(err => {
            res.status(200).send(`Workout already exists.`)
        })
});

router.post("/add", (req, res) => {
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

module.exports = router;