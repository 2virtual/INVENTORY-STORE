const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({

    title: String,
    author: String,
    images: []


})

module.exports= Tutorial=mongoose.model('tutorial',TutorialSchema)