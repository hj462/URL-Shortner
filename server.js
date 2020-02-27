const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const server = express();

server.use(express.json());
server.use(cors());

const uri = process.env.ATLAS_URI;
console.log(uri)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');
const urlRoutes = require('./routes/urls');

server.use('/student', studentRoutes);
server.use('/user', userRoutes);
server.use('/api/shorturl', urlRoutes);

server.listen(5000, (res, req) => {
    console.log('Listening to port', 5000);
})
