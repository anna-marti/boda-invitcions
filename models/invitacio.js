const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const Invitacio   = new Schema({
  nom    : String,
  cognoms: String,
  mail   : String,
  vindra : Boolean,
  parella: Number,
  nens   : Boolean,
  visitat: Boolean
});

module.exports = mongoose.model('Invitacio', Invitacio);
