import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const profileSchema = new mongoose.Schema({
    name: String,
    title: String,
    company: String,
    location: String,
    url: String,
});

const Profile = mongoose.model("Profile", profileSchema);

router.get("/", async (req, res) => {
    const { q } = req.query;
    const query = q
        ? { url: { $regex: q as string, $options: "i" } }
        : {};

    const profiles = await Profile.find(query);
    res.json(profiles);
});

export default router;
