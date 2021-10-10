const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" + process.env.MGDB + "@cluster0.1crpl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => console.log("FAILED TO MONGODB", err));
