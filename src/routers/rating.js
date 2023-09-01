// in rating system we require :

// 1.)   article_id - >{query parameters}
// 2.)  translated_article_id -> {query parameters}
//  3.) prompt_category -> {query parameters}
// 4.) rating in the form of number -> {request body}

// const mongoose = require("mongoose");  

const express = require("express");
const Article = require("../models/Article");
const router = new express.Router();
router.post("/articleRating", async (req,res) => {
    
    const { promptCategory, translatedArticleId, articleId } =
        req.query;
    const requestBody = req.body;
    const { articleRating } = requestBody;
    try {
        // If an articleId is present in the query parameters, update the Article document
        if (articleId) {
            console.log(`Updating Article with id: ${articleId}`)
        }

        // if articleId, translatedArticleId and promptCategory, articleId is present then only save the rating of the system

        if (articleId && translatedArticleId && promptCategory && articleRating) {
            // Find the article
            const article = await Article.findOne({
                [`translatedArticles.${promptCategory}.translatedArticleId`]:
                    translatedArticleId,
            });

            if (article) {
                const translatedArticles = article.translatedArticles[promptCategory];
                const translatedArticle = translatedArticles.find(
                    (article) => article.translatedArticleId === translatedArticleId
                );

                // if translated article exisist,then go and add the rating value;
                if (translatedArticle) {
                    console.log(`article rating of a particular article ${articleRating}`);

                    translatedArticle.articleRating = articleRating;

                    const saveRatingSystem = await article.save();
                    console.log("Rating has been added");

                    // return {
                    //     statusCode: 200,
                    //     body: JSON.stringify(saveRatingSystem),
                    //     headers: {
                    //         "Content-Type": "application/json",
                    //         // "Access-Control-Allow-Origin": "*",
                    //         // "Access-Control-Allow-Credentials": true,
                    //         // "Access-Control-Allow-Headers": "Content-Type",
                    //         // "Access-Control-Allow-Methods": "POST",
                    //     },
                    // }; 
                    res.status(200).json(saveRatingSystem);
                }
                else {
                    throw new Error("Translated article not found");
                }

            }
            else {
                throw new Error("Article not found");
            }

        }
        else {
            throw new Error("Insufficient Parameters provided")
        }
    }
    catch (err) {
        console.error(`Error occurred: ${err.message}`);
        // return {
        //     statusCode: 500,
        //     body: JSON.stringify({ error: err.message }),
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Headers": "Content-Type",
        //         "Access-Control-Allow-Methods": "POST",
        //     },
        // }; 
        res.status(200).json({ error: err.message });

    }
}); 
module.exports = router;