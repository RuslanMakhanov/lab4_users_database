const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: String,
  suite: String,
  city: {
    type: String,
    match: [/^[a-zA-Z\s]*$/, 'City name can only contain alphabets and spaces']
  },
  zipcode: {
    type: String,
    match: [/^\d{5}-\d{4}$/, 'Zip code format must be like 12345-1234']
  },
  geo: {
    lat: String,
    lng: String
  }
});

const companySchema = new Schema({
  name: String,
  catchPhrase: String,
  bs: String
});

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']

  },
  address: addressSchema,
  phone: {
    type: String,
    required: true,
    match: [/^1-\d{3}-\d{3}-\d{4}$/, 'Phone format must be like 1-123-123-1234']
  },
  website: {
    type: String,
    required: true,
    match: [/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, 'Please enter a valid URL']
  },
  company: companySchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
