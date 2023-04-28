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

app.route("/articles")
    .get((req, res) => {
        Article.find().then(articles => {
            res.status(200).send(articles)
        }).catch(err => {
            res.status(401).send(err.errors.title.message)
        })
    })
    .post((req, res) => {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        })
        article.save().then(() => {
            res.status(201).send(article)
        }).catch(err => {
            res.status(400).send(err.errors.title.message)
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}).then(() => {
            res.status(200).send("Deleted!")
        }).catch(err => {
            res.status(400).send(err.errors.title.message)
        })
    })

app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({
            title: req.params.articleTitle
        }).then(result => {
            if (result) {
                res.send(result)
            } else {
                res.send(`There is no ${req.params.articleTitle} article`)
            }
        }).catch(err => {
            res.status(400).send(err.errors.title.message)
        })
    })
    .put((req, res) => {
        Article.updateOne({
                title: req.params.articleTitle
            },
            {
                title: req.body.title,
                content: req.body.content
            }).then(result => {
            if (result.matchedCount !== 0) {
                res.status(200).send(result)
            } else {
                res.send(`There is no ${req.params.articleTitle} article`)
            }
        }).catch(err => {
            res.status(400).send(err.errors.title.message)
        })
    })
    .patch((req, res) => {
        Article.updateOne({
                title: req.params.articleTitle
            },
            {$set: req.body}).then(result => {
            if (result.matchedCount !== 0) {
                res.status(200).send(result)
            } else {
                res.send(`There is no ${req.params.articleTitle} article`)
            }
        }).catch(err => {
            res.status(400).send(err.errors.title.message)
        })
    })
    .delete((req, res) => {
        Article.deleteOne({
            title: req.body.articleTitle
        }).then(result => {
            if (result.deletedCount !== 0) {
                res.status(200).send('Deleted!')
            } else {
                res.send(`There is no ${req.params.articleTitle} article`)
            }
        }).catch(err => {
            res.status(400).send(err.errors.title.message)
        })
    })