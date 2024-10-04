const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 8090;
const app = express();
const { Telegraf } = require("telegraf");

const apiURL = `https://v6.exchangerate-api.com/v6`;
const apiKey = process.env.API_KEY;

const apiReqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10, // limit each ip to 100 request per window
});

//! Middlewares
app.use(express.json()); // Parse JSON data from req.body
// CORS fix

const prodOrigins = [process.env.FRONTEND_URL];
const devOrigin = ["http://localhost:5174"];
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request origin:", origin); // Log for debugging
      console.log("Allowed origins:", allowedOrigins);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests with no origin or matching origins
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Allow cookies, authorization headers
  })
);

app.use(apiReqLimiter); // Limit the request a user can have access to

//! Conversion route
app.post("/api/convert", async (req, res) => {
  try {
    // get the user data
    const { fromCurrency, toCurrency, amount } = req.body;
    console.log({ fromCurrency, toCurrency, amount });

    const url = `${apiURL}/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
    console.log(url);

    const response = await axios.get(url);
    console.log(response);

    if (response.data && response.data.result === "success") {
      res.json({
        base: fromCurrency,
        target: toCurrency,
        conversionRate: response.data.conversion_rate,
        convertedAmount: response.data.conversion_result,
        rateUpdateTime: response.data.time_next_update_utc,
      });
    } else {
      res.json({
        message: "Error converting currency",
        details: response.data,
      });
    }
  } catch (error) {
    res.json({
      message: "Error converting currency",
      details: error.message,
    });
  }
});

//! Configure Telegram Web app
const bot = new Telegraf(process.env.BOT_TOKEN);
const websiteLink = `https://monotoolsexchangecurrencyconverter.vercel.app`;

bot.start((ctx) =>
  ctx.reply("Welcome to the bot!!", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "web app",
            web_app: { url: websiteLink },
          },
        ],
      ],
    },
  })
);
bot
  .launch()
  .then(() => {
    console.log("Bot is running...");
  })
  .catch((err) => {
    console.error("Failed to launch bot:", err);
  });

//! Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
