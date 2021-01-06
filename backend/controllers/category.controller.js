const Category = require("../models/category.model");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  //console.log(req.body)
  const category = new Category(req.body);
  //category.name = req.body.name;
  if ( "image" in req.body ) {
    category.image = req.body.image;
  }
  category.save((err, category) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    res.json({
      category,
    });
  });
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    return res.status(200).json(categories);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  console.log(req.body)
  if ( "image" in req.body ) {
    console.log(req.body.image)
    category.image = req.body.image;
  }
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to upload category.",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove category",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};
