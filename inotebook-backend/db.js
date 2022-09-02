const mongoose = require('mongoose')


const connection_url =
  "mongodb+srv://admin:1jVCfTLeja4SfTan@cluster0.x6uenfx.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = ()=>{
    mongoose.connect(connection_url,()=>{
        console.log('connected to db')
    })
}

module.exports = connectToMongo
