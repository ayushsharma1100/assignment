const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/iNotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{console.log("connected to db successfully");}).catch(error=>console.log(error));
}

module.exports = connectToMongo;