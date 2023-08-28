const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const User = require('./models/user.js'); 

mongoose.set("strictQuery", false);
require("dotenv").config();

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/submit-record', async (req, res) => {
  const { username, numTime, time, level} = req.body;
  console.log('Received POST request to /submit-record', req.body);

  const collectionName = getCollectionNameFromLevel(level);
  console.log(`Level: ${level}, Collection Name: ${collectionName}`);

  try {
    const user = new User({ username, numTime, time });
    const collection = mongoose.connection.collection(collectionName);
    
    await collection.insertOne(user.toObject());


    console.log(user);

    res.status(201).json({ message: 'Record saved successfully' });
  } catch (error) {
    console.error('Error saving record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/leaderboard/airport', async (req, res) => {
  const collectionName = 'airport'; 
  const collection = mongoose.connection.collection(collectionName);

  try {
    const leaderboardData = await collection.find().sort({ time: 1 }).toArray();
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/leaderboard/mario', async (req, res) => {
  const collectionName = 'mario'; 
  const collection = mongoose.connection.collection(collectionName);

  try {
    const leaderboardData = await collection.find().sort({ time: 1 }).toArray();
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/leaderboard/aquarium', async (req, res) => {
  const collectionName = 'aquarium'; 
  const collection = mongoose.connection.collection(collectionName);

  try {
    const leaderboardData = await collection.find().sort({ time: 1 }).toArray();
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getCollectionNameFromLevel(level) {
  switch (level) {
    case 'airport':
      return 'airport';
    case 'mario':
      return 'mario';
    case 'aquarium':
      return 'aquarium';
    default:
      return 'default_collection';
  }
}