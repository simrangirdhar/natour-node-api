/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */

const dotenv = require('dotenv');
const mongoose= require('mongoose');
const app = require('./app');


dotenv.config({ path: './config.env' });
const uri = process.env.DATABASE;
// Connect to MongoDB using Mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB using Mongoose!");
 } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } 
}
// Call the function to connect
connectToDatabase();

//console.log(process.env);
const port = process.env.process || 3000;
app.listen(port,'0.0.0.0', () => {
  console.log(`app is listening on port number ${port}`);
});
