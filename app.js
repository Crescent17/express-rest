const express = require("express");
const app = express()
const mongoose = require("mongoose")

app.listen(3000)
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