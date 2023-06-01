const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bookRoutes = require('./routes/bookRoutes');

// Connect to MongoDB
try{
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // const db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    // db.once('open', () => {
    // console.log('Connected to MongoDB');
    // });
}catch(error){
    console.log(error);
}

app.use(express.json());
app.use('/books', bookRoutes);

// home testing
app.get('/',(req,res)=>{
    res.status(200).send('App is running');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});