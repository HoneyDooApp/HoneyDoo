const mongoose = require('mongoose')
const Schema = mongoose.Schema

let users = new Schema ({
   name:  { type: String, required: true, trim: true },
   email:  { type: String, trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] },
   thumbnail: { type: String, trim: true },
   password:  { type: String, trim: true },
   householdid:{type:mongoose.Schema.Types.ObjectId}
}, {
   timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
})

module.exports = mongoose.model('users', users)