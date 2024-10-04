import React, { useEffect, useState } from "react";
import axios from "axios";
import PopupCard from "./PopupCard";

// Mapping of currency codes to their respective flag country codes
const currencyFlags = {
  USD: "us",
  NGN: "ng",
  EUR: "eu",
  GBP: "gb",
};

const ConversionCard = () => {
  const [amount, setAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("NGN");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [exchangeRateDate, setExchangeRateDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    setConversionRate("0.00");
    setConvertedAmount("");
  }, [amount]);

  // Handle input changes
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleCurrencyFromChange = (e) => setCurrencyFrom(e.target.value);
  const handleCurrencyToChange = (e) => setCurrencyTo(e.target.value);

  // Format the amount
  const formatAmountWithCommas = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (numericValue === "") return "";
    const [integerPart, decimalPart] = numericValue.split(".");
    const formattedInteger = new Intl.NumberFormat().format(
      parseInt(integerPart, 10)
    );
    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  // Fetch conversion rate and convert amount
  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) {
      //   alert("Please enter a valid amount");
      handleInvalidInput();
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8090/api/convert", {
        fromCurrency: currencyFrom,
        toCurrency: currencyTo,
        amount: amount,
      });
      const data = response.data;
      console.log(data);

      // Update converted amount
      setConvertedAmount(data.convertedAmount);
      setConversionRate(data.conversionRate);
      setExchangeRateDate(data.rateUpdateTime);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      //   alert("Failed to fetch conversion data");
      handleFetchError();
    }

    setLoading(false);
  };

  const handleError = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleInvalidInput = () => {
    handleError("Please enter a valid amount");
  };

  const handleFetchError = () => {
    handleError("Failed to fetch conversion data");
  };
  const getFormattedTime = (utcTime) => {
    const date = new Date(utcTime); // Create a Date object from the UTC string
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Get hours
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Get minutes
    const formattedDate = date.toUTCString();
    return `${formattedDate}`;
  };

  return (
    <>
      <div className="mx-[20px] mt-5 pb-8">
        <h1 className="font-oswald font-semibold text-5xl text-[#9fe870] text-center my-8 tracking-tight leading-none block relative z-10">
          Currency <br />
          <span className="mt-[-4x] block z-0 text-center">Converter</span>
        </h1>

        <div className="card bg-white px-6 pt-6  rounded-lg shadow-lg h-[340px] flex flex-col justify-between">
          {/* Input for Amount */}
          <div className="mb-2 bg-white">
            <label
              htmlFor="amount"
              className="block font-sourceSans text-gray-700 font-medium mb-2 bg-white"
            >
              Amount
            </label>
            <div className="relative bg-white flex items-center justify-center">
              <input
                type="text"
                id="amount"
                className="block font-sourceSans w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-[#9fe870] focus:border-[#9fe870] sm:text-sm"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
              />
              {/* Dropdown for Currency Selection */}
              <div className="absolute h-[30px] mr-2 my-auto inset-y-0 right-0 pl-3 flex items-center bg-white">
                <img
                  src={`https://flagcdn.com/w20/${currencyFlags[currencyFrom]}.png`}
                  className="h-6 w-6 mr-2 rounded-[50%]  "
                  alt={`${currencyFrom} Flag`}
                />
                <select
                  value={currencyFrom}
                  onChange={handleCurrencyFromChange}
                  className="appearance-none font-sourceSans bg-white  w-8 border-none focus:ring-0 text-gray-700"
                >
                  <option className="  bg-white" value="USD">
                    USD
                  </option>
                  <option className="  bg-white" value="NGN">
                    NGN
                  </option>
                  <option className="  bg-white" value="EUR">
                    EUR
                  </option>
                  <option className="  bg-white" value="GBP">
                    GBP
                  </option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="bg-white"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Arrow or Separator */}
          <div className="text-center my-2 bg-white">
            <span className="text-2xl text-gray-500 bg-white ">⇅</span>
          </div>

          {/* Input for Converted Amount */}
          <div className="bg-white">
            <label
              htmlFor="converted"
              className="block font-sourceSans text-gray-700 font-medium mb-2 bg-white"
            >
              Converted to
            </label>
            <div className="relative bg-white">
              <input
                type="text"
                id="converted"
                className="block font-sourceSans w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={convertedAmount ? convertedAmount : ""}
                placeholder={loading ? "Converting..." : "Converted amount"}
                disabled
              />
              {/* Dropdown for Converted Currency */}
              <div className="absolute h-[30px] mr-2 my-auto inset-y-0 right-0 pl-3 flex items-center bg-white">
                <img
                  src={`https://flagcdn.com/w20/${currencyFlags[currencyTo]}.png`}
                  className="h-6 w-6 mr-2 rounded-[50%]"
                  alt={`${currencyTo} Flag`}
                />
                <select
                  value={currencyTo}
                  onChange={handleCurrencyToChange}
                  className="appearance-none bg-transparent border-none focus:ring-0 font-sourceSans text-gray-700 bg-white "
                >
                  <option className=" bg-white" value="NGN">
                    NGN
                  </option>
                  <option className=" bg-white" value="USD">
                    USD
                  </option>
                  <option className=" bg-white" value="EUR">
                    EUR
                  </option>
                  <option className=" bg-white" value="GBP">
                    GBP
                  </option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="bg-white"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Button to trigger conversion */}
          <div className="mt-4 text-right bg-white">
            <button
              onClick={convertCurrency}
              className="bg-[#163300] font-sourceSans text-white mb-3 px-4 py-2 w-full rounded-md shadow hover:bg-[#52862a]"
              disabled={loading}
            >
              {loading ? "Converting..." : "Convert"}
            </button>
          </div>
        </div>
      </div>
      {convertedAmount ? (
        <div className="card bg-white px-6 pt-6 mx-[20px] rounded-lg shadow-lg mix-h-[64px] mb-5">
          <span className="block bg-white mb-4 pb-4 text-center font-sourceSans ">
            <span className="font-oswald text-[#163300] py-1 px-2 rounded-md mb-1 bg-white">
              {" "}
              {currencyFrom === "USD"
                ? "$"
                : currencyFrom === "EUR"
                ? "€"
                : currencyFrom === "GBP"
                ? "£"
                : "₦"}
              1.000 {currencyFrom} ={" "}
              {currencyTo === "USD"
                ? "$"
                : currencyTo === "EUR"
                ? "€"
                : currencyTo === "GBP"
                ? "£"
                : "₦"}
              {conversionRate ? conversionRate : "0.00"} {currencyTo}{" "}
            </span>
            <br />
            Market exchange rate at {getFormattedTime(exchangeRateDate)}
          </span>
        </div>
      ) : null}

      {showPopup && (
        <PopupCard message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default ConversionCard;
