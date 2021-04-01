const mongoose = require('mongoose')
const Schema = mongoose.Schema

let household = new Schema ({
   name:  { type: String, required: true, trim: true },
   id:  { type: String, trim: true }
}, {
   timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
})

module.exports = mongoose.model('household', household)