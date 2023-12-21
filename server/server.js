const mongoose = require("mongoose");
const express = require("express");
const router = require("../routes/routes.js");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/audiodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello, this is your Express server!");
//   });

  // Route to handle POST requests
app.post("/api/file_tempo/save_data", async (req, res) => {
    try {
        console.log('this is the req.body', req.body);
      const { filename, overall_tempo, peak_1, peak_2 } = req.body;
  
      // Create a new instance of your AudioData model
      const newData = new AudioData({
        filename,
        overall_tempo,
        peak_1,
        peak_2,
      });
  
      // Save the data to the MongoDB database
      await newData.save();
  
      res.status(201).send(newData); // Respond with the saved data
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

app.use(cors());
app.use("/api/file_tempo", router);
app.listen(3000);
