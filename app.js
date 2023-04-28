const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

app.listen(3000)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB')

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title field is required!']
    },
    content: {
        type: String,
        required: [true, 'Content field is required!']
    }
})
const Article = mongoose.model("Article", articleSchema)

app.get("/articles", (req, res) => {
    Article.find().then(articles => {
        res.send(articles)
    })
})

app.post("/articles", (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    })
    article.save().then(response => {
        res.status(201).send(article)
    }).catch(err => {
        res.status(400).send(err.errors.title.message)});
})

app.delete("/articles", (req, res) => {
    Article.deleteMany({}).then(() => {
        res.send("Deleted!")
    }).catch(err => {
        res.send(err)
    })
})