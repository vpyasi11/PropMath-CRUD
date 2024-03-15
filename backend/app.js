const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors =  require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

mongoose
  .connect( process.env.MOBGO_URI ||
    "mongodb+srv://vpyasi11:Vishu%401196@clusterchandramani.nbqzn3w.mongodb.net/crud_app"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
