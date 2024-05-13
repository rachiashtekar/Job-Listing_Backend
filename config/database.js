const mongoose = require('mongoose')
require('dotenv').config();

const connectDB =  async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`CONNECTED TO MongoDB DATABASE `)

    } catch (error) {
        console.log(error)
        
    }
}
module.exports = connectDB;