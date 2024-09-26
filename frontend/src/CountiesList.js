import { useEffect, useState } from "react";
import { getCountries } from "./api";
import SelectedCountry from "./SelectedCountry";

function CountiesList() {
  const [[loadingStatus, loadingError, countries], setLoadingResult] = useState(
    ["LOADING", undefined, undefined]
  );
  const [selectedCountry, setSelectedCountry] = useState(undefined);

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
            {countries.map((country) => {
              let classes = "country";
              if (country === selectedCountry) {
                classes += " selected";
              }
              return (
                <div
                  className={classes}
                  key={country.countryCode}
                  onClick={() => setSelectedCountry(country)}
                >
                  {country.name}
                </div>
              );
            })}
          </div>
          <div className="selected-country">
            {selectedCountry && <SelectedCountry country={selectedCountry} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default CountiesList;
