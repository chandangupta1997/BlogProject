const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({


     title: {type:String},
      body: {type:String}, 
     authorId: {mandatory, refs to author model},
     tags: {array of string},
      category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, 
      subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] },
       createdAt, updatedAt, deletedAt: {when the document is deleted}, 
       isDeleted: {boolean, default: false}, 
       publishedAt: {when the blog is published}, isPublished: {boolean, default: false}

    








})