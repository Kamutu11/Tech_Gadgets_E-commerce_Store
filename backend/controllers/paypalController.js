const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

async function getAccessToken() {
  const authString = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authString}`
    },
    body: 'grant_type=client_credentials'
  });
  const data = await response.json();
  return data.access_token;
}

exports.createOrder = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;
    const accessToken = await getAccessToken();

    const requestBody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency || "USD",
            value: amount
          }
        }
      ],
      application_context: {
        return_url: "http://localhost:5173/returnUrl",
        cancel_url: "http://localhost:5173/cancelUrl",
        brand_name: "Tech Gadgets Shop",
        landing_page: "LOGIN",
        user_action: "PAY_NOW"
      }
    };

    const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': Date.now().toString(),
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestBody)
    });

    const orderData = await orderResponse.json();
    console.log('PayPal order response:', orderData);
k
    const approvalLink = orderData.links && orderData.links.find(link => link.rel === "approve");

    if (!approvalLink) {
      return res.status(400).json({ error: "Approval link not found", response: orderData });
    }

    res.json(orderData);
  } catch (error) {
    next(error);
  }
};



exports.captureOrder = async (req, res, next) => {
  try {
    const { orderID } = req.body;
    const accessToken = await getAccessToken();

    const captureResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({})
    });

    const captureData = await captureResponse.json();

    if (captureData.status === "COMPLETED") {
      res.json(captureData);
    } else {
      res.status(400).json({ error: "Payment capture failed", details: captureData });
    }
  } catch (error) {
    next(error);
  }
};
