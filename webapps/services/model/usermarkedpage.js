var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var UserMarkedPageSchema = new mongoose.Schema({
	markid: {type:String, required:true, trim:true, index:true, unique:true},
    userid: {type:String, required:true, trim:true, index:true},
    pagetitle: {type:String, required: true, trim: true, index: true},
    pubdate: {type:Date, required: true, trim: true, index: true},
    url: {type:String},
    addtime: {type:Date, default: Date.now },
    updatetime: {type:Date, default: Date.now }
});

module.exports = mongoose.model('UserMarkedPage',UserMarkedPageSchema);