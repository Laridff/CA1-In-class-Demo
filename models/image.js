var mongoose = require('mongoose');

var DataSchema = new mongoose.Schema({ 
   data: { type: {} }
});

module.exports = mongoose.model('Data', DataSchema);