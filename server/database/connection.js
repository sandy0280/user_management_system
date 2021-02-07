const mongoose = require('mongoose')

var connectDB = async() => {
    try {
       const conn = mongoose.connect(process.env.MONGO_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify : true,
           useCreateIndex : true
       }) 
       console.log(`MongoDB connected `);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;