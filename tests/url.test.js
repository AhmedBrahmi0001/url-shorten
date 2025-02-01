// tests/urlShortener.test.js - Unit Tests for URL Shortener

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Url = require("../models/Url");

describe("URL Shortener API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/urlshortener_test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    await Url.deleteMany();
  });

  test("Should return a shortened URL", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ originalUrl: "https://example.com" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("shortUrl");
  });

  test("Should redirect to original URL", async () => {
    const newUrl = await Url.create({
      originalUrl: "https://example.com",
      shortUrl: "test123",
    });
    const res = await request(app).get("/test123");
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("https://example.com");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
