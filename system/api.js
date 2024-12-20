const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');
const path = require('path');
const fetch = require('node-fetch');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fileType = require('file-type');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const cheerio = require('cheerio');
const MakeMeAZombie = require('makemeazombie');
const zombie = new MakeMeAZombie();
const { request } = require('undici');
const WebSocket = require("ws");
const FormData = require("form-data");
const mesg = require('./mesg.js');
const User = require('./models/user'); // Assuming you have User model
const Url = require('./models/url');
const Function = require("./lib/function");
const Func = new Function();
const { Buffer } = require('buffer');
//const saweria = new Saweria();
const router = express.Router();
const requestIp = require('request-ip');
const sessionStore = {};
const d = new Date(new Date + 3600000)
const locale = 'id'
const jam = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
let hari = d.toLocaleDateString(locale, { weekday: 'long' })
const tgl = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middleware to check API key and limits

const checkApiKey = async (req, res, next) => {
  const apiKey = req.query.apikey;
  if (!apiKey) {
    return res.json(Func.resValid({ error: 'Masukan Parameter Apikey.' }));
  }

  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Check if user is premium and within limit
    const currentDate = new Date();
    if (user.status === 'premium') {
      const premiumExpiry = new Date(user.premiumExpiry);
      if (currentDate > premiumExpiry) {
        user.status = 'free';
        await user.save();
      }
    }

    // Check usage limit
    const dailyLimit = user.status === 'premium' ? Infinity : user.limit;
    const currentUsage = user.usage || 0;

    if (currentUsage >= dailyLimit) {
      return res.status(429).json({ error: 'Limit kamu sudah habis.' });
    }

    // Increment usage
    user.usage = currentUsage + 1;
    await user.save();

    // Increment usage and total requests
    user.usage = currentUsage + 1;
    user.totalRequests = (user.totalRequests || 0) + 1;
    await user.save();

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function checkAllowedIP(req, res, next) {
  try {
    const clientIP = requestIp.getClientIp(req);

    const user = await User.findOne({ apiKey: req.query.apikey });

    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    const allowedIP = user.ipAddress;

    if (allowedIP === '*' || allowedIP === '0.0.0.0' || allowedIP === clientIP) {
      return next();
    }

    return res.status(403).json({ error: `IP Address ${clientIP} is not allowed` });
  } catch (error) {
    console.error('Error checking IP:', error);
    res.status(500).json({ error: 'Error checking IP address' });
  }
}

// Token bot Telegram Anda
const telegramBotToken = '7184800138:AAEndtbGSB91tCvljcFkKfyKN_X8PDlgH0I';

// Inisialisasi bot Telegram
const bot = new TelegramBot(telegramBotToken, { polling: true });

// Middleware untuk mengirim pesan ke Telegram



router.get('/sendmessage', checkApiKey, async (req, res) => {
const message = req.query.message;
const id = req.query.id;
  
function sendTelegramMessage(message) {
  bot.sendMessage(`${id}`, message); // Ganti 'CHAT_ID' dengan ID obrolan Telegram yang sesuai
}
  try {
    // Lakukan sesuatu di sini...
    // Misalnya, mengirim pesan ke Telegram
    sendTelegramMessage('Contoh pesan dari aplikasi Anda');

    res.json({ message: 'Pesan berhasil dikirim ke Telegram' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengirim pesan ke Telegram' });
  }
});
	   
module.exports = router;
