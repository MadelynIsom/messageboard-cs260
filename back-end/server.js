const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const commentSchema = new mongoose.Schema({
  username: String,
  body: String,
  date: String,
  room: {type: mongoose.Schema.Types.ObjectId, ref: "Room"}
});

commentSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
  commentSchema.set('toJSON', {
  virtuals: true
});

const Comment = mongoose.model('Comment', commentSchema);

const roomSchema = new mongoose.Schema({
    name: String
});

roomSchema.virtual('id')
  .get(function() {
    return this._id;
  });
  
roomSchema.set('toJSON', {
  virtuals: true
});

const Room = mongoose.model('Room', roomSchema);

app.get('/api/comments/:room', async(req, res) => { //gets all comments from a specified room
  let room = req.params.room;
  let found = await Comment.find({room});
  if(!found){
    res.status(404)
      .send("Sorry those comments couldn't be found");
    return;
  }
  res.send(found);
});

app.post('/api/comments', async (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    body: req.body.body,
    date: new Date().toISOString(),
    room: req.body.room
  });
  try {
    await comment.save();
    res.send({
      comment: comment
    });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/comments/:id', async(req, res) => {
  try{
    await Comment.updateOne({
      _id: req.params.id,
    }, {
      body: req.body.body,
      date: req.body.date
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/comments/:id', async(req, res) => {
  try{
    await Comment.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/rooms', async(req, res) => { //get list of rooms
  try {
    let rooms = await Room.find();
    res.send({
      rooms: rooms
    });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.get('/api/rooms/:id', async(req, res) =>{ //get room with specified name and return list of comments in room
  let id = req.params.id;
  let found = await Room.findById(id);
  if (!found) {
    res.sendStatus(404)
      .send("Sorry, that room doesn't exist");
    return;
  }
  res.send(found);
});

app.post('/api/rooms', async(req, res) => {
    const room = new Room({
    name: req.body.name
  });
  try {
    await room.save();
    res.send({room});
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/rooms/:id', async (req, res) => {
  try{
    await Room.updateOne({
      _id: req.params.id,
    }, {name: req.body.name});
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/rooms/:id', async (req, res) => {
  try {
    await Room.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(3001, () => console.log('Server listening on port 3001!'));