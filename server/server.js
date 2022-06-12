"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let FETCH_INTERVAL = 5000;

const PORT = process.env.PORT || 4000;

let tickers = [
    "AAPL", // Apple
    "GOOGL", // Alphabet
    "MSFT", // Microsoft
    "AMZN", // Amazon
    "FB", // Facebook
    "TSLA", // Tesla
];
let displayTickers = [];

function displayCard(item) {
    const index = tickers.indexOf(item);
    const itemToRemove = tickers.splice(index, 1);
    displayTickers.push(...itemToRemove);
}

function removeCard(item) {
    const index = displayTickers.indexOf(item);
    const itemToRemove = displayTickers.splice(index, 1);
    tickers.push(...itemToRemove);
}

function randomValue(min = 0, max = 1, precision = 0) {
    const random = Math.random() * (max - min) + min;
    return random.toFixed(precision);
}

function utcDate() {
    const now = new Date();
    return new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    );
}

function getQuotes(tickers) {
    const quotes = tickers.map((ticker) => ({
        ticker,
        exchange: "NASDAQ",
        price: randomValue(100, 300, 2),
        change: randomValue(-100, 200, 2),
        change_percent: randomValue(-1, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
    }));

    return quotes;
}

function trackTickers(socket) {
    // run the first time immediately
    socket.emit("ticker", {
        allTickers: getQuotes(tickers),
        displayTickers: getQuotes(displayTickers),
    });

    // every N seconds
    const timer = setInterval(function() {
        socket.emit("ticker", {
            allTickers: getQuotes(tickers),
            displayTickers: getQuotes(displayTickers),
        });
    }, FETCH_INTERVAL);

    socket.on("disconnect", function() {
        clearInterval(timer);
    });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
    cors: {
        origin: "*",
    },
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
    socket.on("start", () => {
        trackTickers(socket);
    });
    socket.on("remove", (tickerName) => {
        removeCard(tickerName);
    });
    socket.on("display", (tickerName) => {
        displayCard(tickerName);
    });
});

server.listen(PORT, () => {
    console.log(`Streaming service is running on http://localhost:${PORT}`);
});