const express = require("express");
const router = express.Router();
const AudioData = require("../models/models.js");

router.get("/", async (req, res) => {
  try {
    const tasks = await AudioData.find(
      {},
      "filename overall_tempo peak_1 peak_2"
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { filename, overall_tempo, peak_1, peak_2 } = req.body;
  console.log("req body from post route", req.body);

  const newData = new AudioData({
    filename, overall_tempo,
    peak_1, peak_2,
  }); 
  
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
