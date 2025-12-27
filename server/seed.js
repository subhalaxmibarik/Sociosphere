import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import dotenv from "dotenv";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await User.deleteMany();
    await Post.deleteMany();

    await User.insertMany(users);
    await Post.insertMany(posts);

    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
