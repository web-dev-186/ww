// src/components/PriceCard/PriceCard.js

import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "./PriceCard.less";

export const PriceCard = ({ title, price, features, buttonType }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      console.log("Stripe.js has not yet loaded.");
      return;
    }

    console.log("Creating payment intent");
    try {
      const { data: clientSecret } = await axios.post(
        "/api/payment/create-payment-intent",
        { amount: price }
      );
      console.log("Client secret received:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setPaymentResult({ success: false, message: result.error.message });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded");
          await axios.post("http://localhost:5000/api/cards", {
            cardNumber: "generated-card-number",
            plan: title,
            expiryDate: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ), // 1 year from now
          });
          console.log("Card created successfully");
          setPaymentResult({ success: true, message: "Payment succeeded" });
        } else {
          setPaymentResult({
            success: false,
            message: "Unknown payment status",
          });
        }
      }
      setModalVisible(true);
    } catch (error) {
      console.error("Error during payment processing:", error);
      setPaymentResult({ success: false, message: error.message });
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setPaymentResult(null);
  };

  return (
    <>
      <Card title={title} className="price-card">
        <p className="price">₹{price} per year</p>
        <ul className="features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <CardElement />
        <Button
          type={buttonType}
          className="select-plan-button"
          onClick={handleCheckout}
        >
          Select Plan
        </Button>
      </Card>
      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        closable={false}
      >
        {paymentResult && (
          <div className="payment-result">
            {paymentResult.success ? (
              <p className="success-message">{paymentResult.message}</p>
            ) : (
              <p className="error-message">{paymentResult.message}</p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
