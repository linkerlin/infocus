var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var UserSchema = new mongoose.Schema({
    username: {type:String, required: true, trim: true, index: true, unique: true},
    nickname: {type:String, required: true, trim: true, index: true, unique: true},
    addtime: {type:Date, default: Date.now },
    updatetime: {type:Date, default: Date.now }
});

module.exports = mongoose.model('User',UserSchema);