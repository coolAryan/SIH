var mongoose = require('mongoose');

function connect() {
   try {
     mongoose.connect(
       "mongodb+srv://khushboo123:SIH123@phantom.agz12to.mongodb.net/authentication"
     );

     var db = mongoose.connection;
     db.on("connected", console.error.bind(console, "MongoDB connection done"));
     db.on("error", console.error.bind(console, "MongoDB connection error:"));
   } catch (error) {
     console.log(error);
   }
}

module.exports = connect;