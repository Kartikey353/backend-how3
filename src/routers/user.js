const express = require("express");
const upload = require("../middleware/upload");
const Article = require("../models/Article");
const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");
const router = new express.Router();

// Upload User Image
router.post("/uploadImage/:id", upload.single("userImage"), async (req, res) => {
  try {
    // Prepare the image URL and public ID from Cloudinary
    // Check if an article with the given article ID exists
    const existingArticle = await Article.findOne({ articleId: req.params.id });

    if (existingArticle) {
      // If an article with the article ID exists, delete the existing image from Cloudinary
      if (existingArticle.publicId) {
        await removeFromCloudinary(existingArticle.publicId);
      } 
      const cloudinaryResponse = await uploadToCloudinary(
        req.file.path,
        "user-images"
      );
      // Update the image URL and public ID in the database
      existingArticle.imageURI = cloudinaryResponse.url;
      existingArticle.publicId = cloudinaryResponse.public_id;
      await existingArticle.save();
    } else {
      // If no article with the article ID exists, create a new Article document
      return res.status(404).send("Article not found");
    }

    res.status(200).send("User image uploaded with success!");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
