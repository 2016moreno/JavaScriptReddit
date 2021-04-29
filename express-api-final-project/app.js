let express = require('express')
let cors = require('cors')
let app = express()
const Sequelize = require('sequelize');

// instantiate the library for use, connecting to the sqlite database file
let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'posts.sqlite'
})

// If port is set in environment variable use that port
// if not, use port 5000
const PORT = process.env.PORT || 5000

// Enable CORS middleware
app.use(cors());
// Enable receiving data in JSON format
app.use(express.json());
// Enable receiving data from HTML forms
app.use(express.urlencoded({ extended: false }));

// Start: Change only below this line

const Post = sequelize.import("./models/posts.js");

// View all posts
// Happy Path: returns all posts in an array in JSON format (Status 200)
// Sad Path: None
app.get("/posts", function(req, res){

    Post.findAll().then(function(element){
        res.status(200);
        res.json(element);
    });
});

// Create a post
// Happy Path: creates the post item (Status 201 - returns copy of created post)
// Sad Path: none
app.post("/posts", function(req, res){
    let title = req.body.title;
    let url = req.body.url;

    if(title != null && url != null)
    {
        let NP = Post.build({
            title: title,
            url: url,
        });

        NP.save().then(postitem => {
            res.status(201);
            res.json(postitem);
        })
        .catch(error => {
            res.json({"message": error});
        })
    }
    else
    {
        res.status(422).json({"message": "error"});
    }

});

// Upvote a post
// Happy Path: upvote a post (Status 204 - empty JSON)
// Sad Path: post does not exist (Status 404 - empty JSON)
app.patch("/posts/:id/upvote", function(req, res){

    Post.findByPk(req.params.id).then((element)=>{
        if(element != null)
        {
            element.points + 1;
            element.save().then(function(){
                res.status(204);
                res.json(element);
            })
        }
        else
        {
            res.status(404);
        }
    });
});

// Downvote a post
// Happy Path: downvote a post (Status 204 - empty JSON)
// Sad Path: post does not exist (Status 404 - empty JSON)
app.patch("/posts/:id/downvote", function(req, res){

    Post.findByPk(req.params.id).then((element)=>{
        if(element != null)
        {
            element.points - 1;
            element.save().then(function()
            {
              res.status(204);
              res.json(element);
            })
        }
        else
        {
            res.status(404);
        }
    });
});

// STOP: Don't change anything below this line

app.listen(PORT, function () {
    console.log("Server started...")
});