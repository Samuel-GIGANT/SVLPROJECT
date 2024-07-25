const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51PVUmqDCsqrqt0Uc4GzG2j0seV8CTXy5X7XhpPGQvhmx1p3IIFzdQsNdvcXrNkZYR5zvplKFW3Y8gqiHAlbgI7hf006eStT85y');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));