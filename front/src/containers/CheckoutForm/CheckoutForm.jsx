// CheckoutForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Spin } from "antd";
import axios from "axios";

const CheckoutForm = ({ price, title, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Fetch clientSecret from your server
      const {
        data: { clientSecret },
      } = await axios.post("http://localhost:5000/api/create-payment-intent", {
        amount: price,
      });

      // Confirm the card payment with clientSecret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded");
          // Handle successful payment
          setLoading(false);
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="primary" htmlType="submit" disabled={!stripe}>
        {loading ? <Spin /> : `Pay ₹${price}`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
