import { useEffect, useState } from "react";
import { getCountries } from "./api";
import SelectedCountry from "./SelectedCountry";

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
      {loadingStatus === "LOADING" && <div className="loader">Loading....</div>}
      {loadingStatus === "ERROR" && (
        <div className="loading-error">{loadingError}</div>
      )}
      {loadingStatus === "SUCCESS" && (
        <div className="container">
          <div className="countries">
            <h1>List of Countries</h1>
            {countries.map((country) => (
              <div className="country" key={country.countryCode}>
                {country.name}
              </div>
            ))}
          </div>
          <div className="selected-country">
            <SelectedCountry country={{ name: "Ukraine", countryCode: "UA" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CountiesList;
