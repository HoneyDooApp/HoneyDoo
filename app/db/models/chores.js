const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chore = new Schema({
   chore: { type: String },
   bee: { type: String },
   date: { type: Date },
   description: { type: String },
   purpose: {
      type: String,
      default: 'Just Because'
   },
   effort: { type: String },
   status: { type: String },
   peachpoints: { type: String },
   ownerId: Schema.Types.ObjectId,
   householdid: Schema.Types.ObjectId
}, {
   timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
})

module.exports = mongoose.model('chore', chore)