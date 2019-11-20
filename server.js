const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost/fitness', {useNewUrlParser: true});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});