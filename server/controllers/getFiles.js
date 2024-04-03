import axios from "axios";

const finnhubKey = "cnarddhr01ql0f8afcf0cnarddhr01ql0f8afcfg";
const finnhubKey2 = "co2ms79r01qp2sim3v60co2ms79r01qp2sim3v6g";
const polygonKey = "q3e0Rj8gdrA6x0yJTrDpJL8hQ1WbrNdL";
const polygonKey2 = "dwMSoQY5b3oPY_xyo7QOLg5kR5U5jmHI";

const getAutoComplete = async (req, res) => {
  const symbol = req.query.symbol;
  const apiUrl = `https://finnhub.io/api/v1/search?q=${symbol}&token=${finnhubKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export {
  getAutoComplete
};
