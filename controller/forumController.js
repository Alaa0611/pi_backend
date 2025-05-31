const Topic = require('../models/forum');
const mongoose = require('mongoose');

async function getTopics(req, res) {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTopicById(req, res) {
  try {
    const topicId = req.params.id; // Get ID from URL params
    
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ error: 'Invalid topic ID' });
    }

    const topic = await Topic.findById(topicId)
      .populate('author', 'username email') // Only include username and email
      .populate('category', 'name') // Only include category name
      .populate({
        path: 'messages',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'author' }
      })
      .exec();

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json({
      ...topic.toObject(),
      // Add any additional transformations here
    });

  } catch (err) {
    res.status(500).json({ 
      error: 'Server error',
      details: err.message 
    });
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
    // Build the query
    let query = {};
    
    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Tags filter (AND condition - topic must include all specified tags)
    if (req.query.tags) {
      const tagsArray = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
      query.tags = { $all: tagsArray };
    }
    
    // Search filter (searches title and content)
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Pagination settings
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.pageSize) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    
    // Get total count for pagination
    const totalCount = await Topic.countDocuments(query);
    
    // Build the database query
    let dbQuery = Topic.find(query)
      .populate('author')
      .populate('category')
      .populate({
        path: 'messages',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'author' }
      })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    // Apply limit if specified (overrides pagination)
    if (req.query.limit) {
      dbQuery = dbQuery.limit(parseInt(req.query.limit));
    } else {
      // Apply pagination if no limit
      dbQuery = dbQuery.skip(skip).limit(itemsPerPage);
    }
    
    // Execute query
    const topics = await dbQuery.exec();
    
    // Return response
    if (req.query.limit) {
      // When limit is specified, return just the array
      res.json(topics);
    } else {
      // Otherwise return paginated response
      res.json({
        topics: topics,
        totalCount: totalCount,
        currentPage,
        totalPages: Math.ceil(totalCount / itemsPerPage)
      });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getTopics,
    getTopicById,
    createTopic,
    deleteTopic,
    addMessage,
    searchTopics
};
