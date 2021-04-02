const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chore = new Schema({
    chore:{type:String},
    bee:{type:String},
    date:{type:Date},
    description:{type:String},
  
  
    householdid: Schema.Types.ObjectId
 }, {
    timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
 })
 
 module.exports = mongoose.model('chore', chore)