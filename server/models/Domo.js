const mongoose = require('mongoose');
const _ = require('underscore');

let DomoModel = {};

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',

  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  height: {
    type: Number,
    min: 0,
    required: true,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  height: doc.height,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };
  return DomoModel.find(search).select('name age height').lean().exec(callback);
};

DomoSchema.statics.deleteByOwner = (ownerId, name, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
    name,
  };
  return DomoModel.deleteOne(search).select('name age height').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;


