import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} from "../controllers/tweets.js";

const router = express.Router();

// Create a Tweet
router.post("/", verifyToken, createTweet);

// Delete a Tweet
router.delete("/:id", verifyToken, deleteTweet);

// Like or Dislike a Tweet
router.put("/:id/like", likeOrDislike);

// Get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// Get User Tweets Only
router.get("/user/all/:id", getUserTweets);

// Explore
router.get("/explore", getExploreTweets);
export default router;
