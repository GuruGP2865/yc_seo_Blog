const mongoose = require("mongoose");
const slugify = require("slugify");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 150,
    },
    intro_content: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    story: {
      type: Boolean,
      default: false
    },
    storyContent: {
      type: String,
      default: ''
    },
    storyContentImage: {
      type: String,
      default: ''
    },
    storySmallContent: {
      type: String,
      default:'',
    },
    storySmallImage: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: [
      {
       type: ObjectId,
       ref: "Category",
       required: true
      }
    ],
    hashtag: [
     {
      type: ObjectId,
      ref: "Hashtag",
      required: true
     }
    ],
    sidead: {
      type: ObjectId,
      ref: "Sidead"
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

postSchema.pre("validate", function (next) {
  if (this.title) {
    
    this.slug = slugify(this.title.concat(this.date), { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
