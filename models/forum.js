const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
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