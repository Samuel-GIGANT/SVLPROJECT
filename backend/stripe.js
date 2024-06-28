const express = require('express');
const app = express();
const stripe = require('stripe')('your-secret-key');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.send({ success: true });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
