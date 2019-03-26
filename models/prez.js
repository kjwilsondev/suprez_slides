const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrezSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    thumbnails: [String]
});

module.exports = mongoose.model("Prez", PrezSchema);