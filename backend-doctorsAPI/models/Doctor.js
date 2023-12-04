var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

doctorSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

doctorSchema.methods.verifyPassword = async function (password) {
  try {
    var result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
  bcrypt.compare();
};

doctorSchema.methods.signToken = async function () {
  console.log(this);
  var payload = { userId: this.id, email: this.email };
  try {
    var token = await jwt.sign(payload, 'thisisasecret');
    return token;
  } catch (error) {
    return error;
  }
};

doctorSchema.methods.userJSON = function (token) {
  return {
    name: this.name,
    email: this.email,
    token: token,
  };
};

module.exports = mongoose.model('Doctor', doctorSchema);
