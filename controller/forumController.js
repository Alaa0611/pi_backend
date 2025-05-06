const Topic = require('../models/forum');

async function getTopics(req, res) {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTopic(req, res){
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;
    const topics = await Topic.find(filter)
      .populate('author', 'email')
      .populate('category')
      .populate('tags');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createTopic(req, res){
  try {

    const newTopic = new Topic(req.body);
    const saved = await newTopic.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteTopic(req, res){
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addMessage(req, res){
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ msg: 'Topic not found' });
    topic.messages.push({ author: req.body.author, content: req.body.content });
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function searchTopics(req, res) {
  try {
    const { keyword, category, tags, startDate, endDate } = req.query;

    // Build the search query
    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $all: tagsArray };
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const topics = await Topic.find(query)
      .populate('category')
      .populate('author')
      .sort({ createdAt: -1 });

    res.status(200).json(topics);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
    getTopics,
    getTopic,
    createTopic,
    deleteTopic,
    addMessage,
    searchTopics
};
