export async function getCountries() {
  const response = await fetch("/api/availableCountries");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.map((country) => country.name);
}
