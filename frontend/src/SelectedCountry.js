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
      <h1>Country Info</h1>
      {loadingStatus === "LOADING" && <div className="loader">Loading....</div>}
      {loadingStatus === "ERROR" && (
        <div className="loading-error">{loadingError}</div>
      )}
      {loadingStatus === "SUCCESS" && <div>{JSON.stringify(countryInfo)}</div>}
    </div>
  );
}

export default SelectedCountry;
