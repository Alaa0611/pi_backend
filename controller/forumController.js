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
    // Extract query parameters
    const { category, tags, search, page, pageSize, limit } = req.query;
    
    // Build the query
    let query = {};
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Tags filter (AND condition - topic must include all specified tags)
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $all: tagsArray };
    }
    
    // Search filter (searches title and content)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination settings
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    
    // Get total count for pagination
    const totalCount = await Topic.countDocuments(query);
    
    // Build the database query
    let dbQuery = Topic.find(query)
      .sort({ createdAt: -1 }); // Sort by newest first
    
    // Apply limit if specified (overrides pagination)
    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit));
    } else {
      // Apply pagination if no limit
      dbQuery = dbQuery.skip(skip).limit(itemsPerPage);
    }
    
    // Execute query
    const topics = await dbQuery.exec();
    
    // Return response
    if (limit) {
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
    getTopic,
    createTopic,
    deleteTopic,
    addMessage,
    searchTopics
};
