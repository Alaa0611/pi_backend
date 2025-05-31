const mongoose = require('mongoose');
const { required } = require('../middll/course.validation');

const MessageSchema = new mongoose.Schema({
  author: { type: String, ref: 'User', required: false },
  content: { type: String, required: true },
  sentiment : {
    label: { type: String},
    score: {type: Number}
  }, 
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'User',
  required: true,
  validate: {
    validator: async function(v) {
      const user = await mongoose.model('User').findById(v);
      return user !== null;
    },
    message: props => `User ${props.value} does not exist`
  }
},
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  tags: [{ type: mongoose.Schema.Types.String}],
  messages: [MessageSchema],
  likes : { type: Number, default : 0},
  dislikes : { type: Number, default : 0},
}, { timestamps: true });

TopicSchema.index({ category: 1 });
TopicSchema.index({ tags: 1 });
TopicSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('topic', TopicSchema);