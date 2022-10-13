const express = require("express");
const mongoose = require("mongoose");

const modelCity = require("./models/City");
const modelCountry = require("./models/Country");
const modelPerson = require("./models/Person");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/db-test")
  .then(() => {
    console.log("connect");
  })
  .catch((error) => {
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

app.put("/api/country/:id", async (req, res) => {
  const { id } = req.params;
  const { name, language, extension, currency, code, active } = req.body;

  try {
    const country = await modelCountry.findByIdAndUpdate(
      id,
      { name, language, extension, currency, code, active },
      { new: true }
    );

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

app.post("/api/person", async (req, res) => {
  const { name, phone, street, city } = req.body;
  try {
    const person = await modelPerson.create({ name, phone, street, city });
    return res.status(200).json({
      person: person,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      person: null,
      success: false,
    });
  }
});

app.put("/api/person/:personName", async (req, res) => {
  const { personName } = req.params;
  const { phone } = req.body;

  try {
    const person = await modelPerson.findOneAndUpdate(
      { name: personName },
      { phone },
      { new: true }
    );

    return res.status(200).json({
      person: person,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      person: null,
      success: false,
    });
  }
});

app.get("/api/persons", async (req, res) => {
  try {
    const persons = await modelPerson.find({});

    return res.status(200).json({
      persons: persons,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      persons: [],
      success: false,
      message: "Error",
    });
  }
});

app.get("/api/person-count", async (req, res) => {
  try {
    const personCount = await modelPerson.countDocuments();

    return res.status(200).json({
      count: personCount,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      count: 0,
      success: false,
      message: "Error",
    });
  }
});

app.get("/api/person/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const person = await modelPerson.findOne({ name });

    return res.status(200).json({
      person: person,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      person: {},
      success: false,
      message: "Error",
    });
  }
});

app.listen(3001, () => {
  console.log("Ready");
});
