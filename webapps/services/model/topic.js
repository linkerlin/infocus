var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var TopicSchema = new mongoose.Schema({
	title: {type:String, required:true, trim:true, index:true, unique:true},
	query: {type:String, required:true, trim:true},
	desc: {type:String, trim:true},
    category: {type:String, required: true, trim: true, index: true},
    status: {type:Number, default: 1},
    power: {type:Number, default: 1},
    addtime: {type:Date, default: Date.now},
    updatetime: {type:Date, default: Date.now}
});

module.exports = mongoose.model('Topic',TopicSchema);