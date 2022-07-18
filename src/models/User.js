/* eslint-disable object-curly-newline */
/** THIS CAPTURED THE USERS AND PROFILES INFORMATION
 * FailedMax : Max number of failed login attempt
 * Failed : Number of failed login attempt
 * mnemonics : This is the user's account recorvery seed phrase, encrypted and backedup for  them.
 */
const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  return re.test(email)
};

const UserStatus = Object.freeze({
  VERIFIED: 'VERIFIED',
  BLOCKED: 'BLOCKED',
  DEACTIVATED: 'DEACTIVATED',
  UNVERIFIED: 'UNVERIFIED',
});

const UserSchema = new Schema(
  {
    password: {
      type: Schema.Types.String,
      select: true,
    },
    firstname: {
      type: Schema.Types.String,
      select: true,
    },
    lastname: {
      type: Schema.Types.String,
      select: true,
    },
    email: {
      type: Schema.Types.String,
      select: true,
    },
    phone: {
      type: Schema.Types.String,
      select: true,
    },
    dob: {
      type: Schema.Types.String,
      select: true,
    },
    gender: { type: String },
    username: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    status: {
      type: Schema.Types.String,
      default: UserStatus.UNVERIFIED,
    },

   
    country: { type: String },
    telephoneCode: { type: String,  },
  },
  {
    timestamps: true,
    toObject: { getters: true, setters: true },
    toJSON: {
      getters: true,
      setters: true,
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
    runSettersOnQuery: true,
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

const User = model('Users', UserSchema);

module.exports = User;
