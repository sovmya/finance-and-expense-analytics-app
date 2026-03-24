import axios from "axios";

export const getExchangeRates = async () => {
  const res = await axios.get(
    "https://api.exchangerate-api.com/v4/latest/INR"
  );

  return res.data;
};