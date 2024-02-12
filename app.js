const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./module/user'); 

const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Connect to MongoDB
const DB_HOST = "cluster0.bytowar.mongodb.net"
const DB_USER = "misterruslan1701"
const DB_PASSWORD = "544081"
const DB_NAME = "lab3_restaurant_database"
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Read JSON file
const usersData = JSON.parse(fs.readFileSync('UsersData.json', 'utf-8')); 

// Import data into MongoDB
const importData = async () => {
  try {
    await User.create(usersData); 
    console.log('Data successfully imported!');
    process.exit();
  } catch (err) {
    console.error('Error importing data: ', err);
    process.exit(1);
  }
};

importData();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });


