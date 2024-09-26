import { useEffect, useState } from "react";
import { getCountryInfo } from "./api";

function SelectedCountry({ country }) {
  const [[loadingStatus, loadingError, countryInfo], setLoadingResult] =
    useState(["LOADING", undefined, undefined]);

  useEffect(() => {
    setLoadingResult(["LOADING", undefined, undefined]);
    getCountryInfo(country)
      .then((countryInfo) =>
        setLoadingResult(["SUCCESS", undefined, countryInfo])
      )
      .catch((err) => setLoadingResult(["ERROR", err.message, undefined]));
  }, [country.countryCode]);

  return (
    <div>
      {loadingStatus === "LOADING" && <div className="loader">Loading....</div>}
      {loadingStatus === "ERROR" && (
        <div className="loading-error">{loadingError}</div>
      )}
      {loadingStatus === "SUCCESS" && (
        <div>
          <h1>{country.name}</h1>
          <div className="flag">
            <img src={countryInfo.flag} alt="flag" height={100} />
          </div>
          <div className="borders">
            <h2>Bordering countries</h2>
            <ul>
              {countryInfo.borderCountries.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {countryInfo.borderCountries.length === 0 && (
              <div>There is no neighbours</div>
            )}
          </div>
          <div className="population">
            <h2>Population data</h2>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {countryInfo.population?.populationCounts.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedCountry;
