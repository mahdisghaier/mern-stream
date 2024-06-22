const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
//   cameras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camera' }]
});

module.exports = mongoose.model('Room', RoomSchema);