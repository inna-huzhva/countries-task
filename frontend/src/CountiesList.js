import { useEffect, useState } from "react";
import { getCountries } from "./api";

function CountiesList() {
  const [[loadingStatus, loadingError, countries], setLoadingResult] = useState(
    ["LOADING", undefined, undefined]
  );

  useEffect(() => {
    setLoadingResult(["LOADING", undefined, undefined]);
    getCountries()
      .then((countries) => setLoadingResult(["SUCCESS", undefined, countries]))
      .catch((err) => setLoadingResult(["ERROR", err.message, undefined]));
  }, []);

  return (
    <div>
      <h1>List of Countries</h1>
      {loadingStatus === "LOADING" && <div className="loader">Loading....</div>}
      {loadingStatus === "ERROR" && (
        <div className="loading-error">{loadingError}</div>
      )}
      {loadingStatus === "SUCCESS" && (
        <ul>
          {countries.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountiesList;
