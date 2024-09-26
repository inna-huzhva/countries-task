export async function getCountries() {
  const response = await fetch("/api/availableCountries");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function getCountryInfo(country) {
  const response = await fetch(`/api/borderCountries/${country.countryCode}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
