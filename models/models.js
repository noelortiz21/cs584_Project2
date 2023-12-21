const mongoose = require("mongoose"); 
const audioDataSchema = new mongoose.Schema({
  filename: String, overall_tempo: Number, peak_1: Number, peak_2: Number,
}); 
const audioData = mongoose.model("AudioData", audioDataSchema); 
module.exports = audioData;
