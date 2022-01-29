const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: 'You did not enter an email.',
      trim: true,
      unique: true,
      validate: [ isEmail, 'invalid email format' ]
    },
    createdAt: {
      type: Date,
      default: Date.now,
    //   get: createdAtVal => dateFormat(createdAtVal)
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of thoughts and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce(
    (total, friends) => total + friends.replies.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
