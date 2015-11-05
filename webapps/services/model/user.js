var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var UserSchema = new mongoose.Schema({
    weiboid: {type:String, required:true, trim:true, index:true, unique:true},
    username: {type:String, required: true, trim: true, index: true, unique: true},
    nickname: {type:String, required: true, trim: true, index: true, unique: true},
    avatar: {type:String},
    weibouid: {type:String},
    addtime: {type:Date, default: Date.now },
    updatetime: {type:Date, default: Date.now }
});

module.exports = mongoose.model('User',UserSchema);