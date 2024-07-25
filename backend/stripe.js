require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  // Validation des données entrantes
  if (!paymentMethodId || !amount) {
    return res.status(400).send({ error: 'Payment method ID and amount are required' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Montant en centimes
      currency: 'EUR',
      payment_method: paymentMethodId,
      confirmation_method: 'manual', // Utilisé pour gérer les paiements nécessitant une confirmation
      confirm: true,
    });

    // Vérifier le statut de l'intention de paiement
    let response = { success: true, paymentIntent: paymentIntent.status };

    // Si le paiement nécessite une action supplémentaire
    if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
      response = { success: false, requiresAction: true, clientSecret: paymentIntent.client_secret };
    }

    res.send(response);
  } catch (error) {
    // Gestion des erreurs
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
