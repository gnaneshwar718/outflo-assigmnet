// scraper.ts
import puppeteer from "puppeteer";
import mongoose from "mongoose";

// 1. Mongo Schema
const profileSchema = new mongoose.Schema({
    name: String,
    title: String,
    company: String,
    location: String,
    url: String,
});

const Profile = mongoose.model("Profile", profileSchema);

// 2. Connect to MongoDB
async function connectMongo() {
    await mongoose.connect("mongodb://localhost:27017/linkedin_scraper", {
        dbName: "linkedin_scraper",
    });
    console.log("✅ Connected to MongoDB");
}

// 3. Puppeteer Logic
async function scrapeProfile(url: string) {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const name = await page.$eval(".text-heading-xlarge", el => el.textContent?.trim());
    const title = await page.$eval(".text-body-medium.break-words", el => el.textContent?.trim());
    const location = await page.$eval(".text-body-small.inline.t-black--light.break-words", el => el.textContent?.trim());

    const company = await page.$$eval(".pvs-entity__path-node", els =>
        els.length > 0 ? els[0].textContent?.trim() : ""
    );

    const profileData = { name, title, company, location, url };

    await Profile.create(profileData);
    console.log("✅ Scraped and saved:", profileData);

    await browser.close();
}

// 4. Run Scraper
(async () => {
    await connectMongo();

    // 👇 Add profile URLs here (can loop multiple)
    const linkedInUrl = "https://www.linkedin.com/in/xyz"; // replace with actual profile

    await scrapeProfile(linkedInUrl);
    process.exit();
})();
