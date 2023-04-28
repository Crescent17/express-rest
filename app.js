const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

app.listen(3000)
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB')

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})