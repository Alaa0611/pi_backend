const Category = require('../models/category');
const Tag = require('../models/tag');

// Categories CRUD
exports.getCategories = async (req, res) => {
  const cats = await Category.find().populate('parent');
  res.json(cats);
};

exports.getCategoryById = async (req, res) => {
    try{
      const cat = await Category.findById(req.params.id)
        .populate('parent', 'name')
        .exec();
  
      if (!cat) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json({
        ...cat.toObject(),
        // Add any additional transformations here
      });
  
    } catch (err) {
      res.status(500).json({ 
        error: 'Server error',
        details: err.message 
      });
    }
};

exports.createCategory = async (req, res) => {
  const { name, parent } = req.body;
  const cat = new Category({ name, parent: parent || null });
  await cat.save();
  res.status(201).json(cat);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Category deleted' });
};

// Tags CRUD
exports.getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};

exports.createTag = async (req, res) => {
  const tag = new Tag({ name: req.body.name });
  await tag.save();
  res.status(201).json(tag);
};

exports.deleteTag = async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Tag deleted' });
};