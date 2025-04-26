const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/start', (req, res) => {
    exec('pm2 start bot.js --name "nima-bot"', (err, stdout, stderr) => {
        if (err) return res.status(500).send(`Error starting bot: ${stderr}`);
        res.send('Bot Started Successfully!');
    });
});

app.get('/stop', (req, res) => {
    exec('pm2 stop "nima-bot"', (err, stdout, stderr) => {
        if (err) return res.status(500).send(`Error stopping bot: ${stderr}`);
        res.send('Bot Stopped Successfully!');
    });
});

app.get('/restart', (req, res) => {
    exec('pm2 restart "nima-bot"', (err, stdout, stderr) => {
        if (err) return res.status(500).send(`Error restarting bot: ${stderr}`);
        res.send('Bot Restarted Successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});