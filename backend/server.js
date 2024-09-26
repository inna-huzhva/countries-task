const express = require("express");
const axios = require("axios");

const app = express();
const port = 3330;

// Available Countries
app.get("/api/availableCountries", async (req, res) => {
  const countries = await axios.get(
    "https://date.nager.at/api/v3/AvailableCountries"
  );
  res.json(countries.data);
});

// List of Border Countries
app.get("/api/borderCountries/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  const response = await axios.get(
    `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
  );
  const borderCountries = response.data?.borders.map((c) => c.commonName) || [];
  res.json(borderCountries);
});

// Population Data
app.get("/api/countryPopulation/:countryName", async (req, res) => {
  const { countryName } = req.params;
  const response = await axios.get(
    `https://countriesnow.space/api/v0.1/countries/population`
  );
  const countryPopulation = response.data.data.find(
    (c) => c.country === countryName
  );
  res.json(countryPopulation);
});

// Flag
app.get("/api/countryFlag/:countryName", async (req, res) => {
  const { countryName } = req.params;
  const response = await axios.get(
    `https://countriesnow.space/api/v0.1/countries/flag/images`
  );
  const countryFlag = response.data.data.find(
    (c) => c.name === countryName
  ).flag;
  res.json(countryFlag);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
