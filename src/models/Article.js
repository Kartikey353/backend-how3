const mongoose = require("mongoose");

// Define article related schemas
const SimilarArticleSchema = mongoose.Schema({
  title: String,
  source: String,
  articleId: String,
});

const MetadataSchema = mongoose.Schema({
  articleSource: String,
  articleBaseUrl: String,
  articleTimeStampExtracted: Number,
  category: String,
  articlePublishedOn: String,
  author: String,
  tags: String,
  articleLastUpdatedOn: String,
  articleMetrics: {
    articleLiked: Number,
    articleDisliked: Number
  }
});

const TranslatedArticleSchema = mongoose.Schema({
  translatedArticleId: String,
  translatedArticle: String,
  toPublish: Boolean,
  promptUsed: String,
  articleRating : Number,
});

const ArticleSchema = new mongoose.Schema({
  articleId: { type: String, required: true, unique: true },
  title: String,
  link: String,
  imageURI: String, 
  publicId:String,
  translatedArticles: {
    Politics: [TranslatedArticleSchema],
    Music: [TranslatedArticleSchema],
    "MoviesAndShows": [TranslatedArticleSchema],
    Food: [TranslatedArticleSchema],
    Fitness: [TranslatedArticleSchema],
    Sports: [TranslatedArticleSchema],
    Humour: [TranslatedArticleSchema],
    "ArtsAndliterature": [TranslatedArticleSchema],
    Travel: [TranslatedArticleSchema],
    "FashionAndBeauty": [TranslatedArticleSchema],
  },
  metadata: MetadataSchema,
  content: String,
  ArticleSimilarFrom: [SimilarArticleSchema],
});

// Create mongoose model for the Article
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;


// publicId: {
//   type: String, // This field will store the Cloudinary public ID
//   required: false // It's not mandatory since it might not be available initially
// }