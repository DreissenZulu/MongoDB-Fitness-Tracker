const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fitness', { useNewUrlParser: true });

router.get("/", (req, res) => {
    res.status(200).sendFile("index.html");
})

try {
router.get("/workouts", async (req, res) => {
    let dbRoutine = await db.Workout.find({})
    res.status(200).send(dbRoutine);
})

router.get("/populate/:workoutID", async (req, res) => {
    let dbRoutine = await db.Workout.find({_id: req.params.workoutID}).populate("exercises")
    res.status(200).send(dbRoutine);
})

router.post("/submit", async (req, res) => {
    const newRoutine = new db.Workout(req.body)
    let dbRoutine = await db.Workout.create(newRoutine)
    res.status(200).send(dbRoutine);
});

router.post("/add", async (req, res) => {
    let exerciseInfo = {
        name: req.body.name,
        reps: req.body.reps
    }
    const newExercise = new db.Exercise(exerciseInfo)
    let addExercise = await db.Exercise.create(newExercise)
    let dbRoutine = await db.Workout.findOneAndUpdate({_id: req.body.workout}, { $push: { exercises: addExercise._id } }, { new: true })
    res.status(200).send(dbRoutine);
});

} catch (err) {
    console.log(`Failed server action. Error: ${err}`)
}

module.exports = router;