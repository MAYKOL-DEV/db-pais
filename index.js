const express = require("express");
const mongoose = require("mongoose");

const modelCity = require("./models/City");
const modelCountry = require("./models/Country");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/db-test")
  .then(() => {
    console.log("connect");
  })
  .catch(() => {
    console.log("error");
  });

// ROUTES

app.get("/api/cities", async (req, res) => {
  try {
    const cities = await modelCity.find({});

    return res.status(200).json({
      docs: cities,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      docs: [],
      success: false,
      message: "Error",
    });
  }
});

app.get("/api/cities/:countryId", async (req, res) => {
  const { countryId } = req.params;
  try {
    const cities = await modelCity.find({ country: countryId }, null, {
      populate: [
        {
          path: "country",
          model: modelCountry,
        },
      ],
    });

    return res.status(200).json({
      docs: cities,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      docs: [],
      success: false,
      message: "Error",
    });
  }
});

app.post("/api/city", async (req, res) => {
  const { name, code, country } = req.body;
  try {
    const city = await modelCity.create({ name, code, country });
    return res.status(200).json({
      doc: city,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      doc: null,
      success: false,
    });
  }
});

app.get("/api/countries", async (req, res) => {
  try {
    const countries = await modelCountry.find({});

    return res.status(200).json({
      docs: countries,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      docs: [],
      success: false,
      message: "Error",
    });
  }
});

app.post("/api/country", async (req, res) => {
  const { name, language, extension, currency, code } = req.body;
  try {
    const country = await modelCountry.create({
      name,
      language,
      extension,
      currency,
      code,
    });
    return res.status(200).json({
      doc: country,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      doc: null,
      success: false,
    });
  }
});

app.listen(3001, () => {
  console.log("Ready");
});
