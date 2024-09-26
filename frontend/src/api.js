export async function getCountries() {
  const response = await fetch("/api/availableCountries");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

async function getBorderCountries(country) {
  const response = await fetch(`/api/borderCountries/${country.countryCode}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

async function getCountryPopulation(country) {
  const response = await fetch(`/api/countryPopulation/${country.name}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

async function getCountryFlag(country) {
  const response = await fetch(`/api/countryFlag/${country.name}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function getCountryInfo(country) {
  const [borderCountries, population, flag] = await Promise.all([
    getBorderCountries(country),
    getCountryPopulation(country),
    getCountryFlag(country),
  ]);
  return { borderCountries, population, flag };
}
