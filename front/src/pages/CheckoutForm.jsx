import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Failed to create payment method:", error);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-payment-intent",
        {
          payment_method: paymentMethod.id,
        }
      );

      console.log("Payment successful:", response.data);
      // Handle payment success logic
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="primary" htmlType="submit">
        Pay Now
      </Button>
    </form>
  );
};

export default CheckoutForm;
