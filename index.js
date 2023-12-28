const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.static("public"));
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});

app.get("/kakao_map_key", (req, res) => {
  const kakaoMapApiKey = process.env.KAKAO_MAP_JAVASCRIPT_KEY;
  res.json({ apiKey: kakaoMapApiKey });
});
