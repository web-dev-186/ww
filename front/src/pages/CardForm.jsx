// CardForm.jsx
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const CardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/cards", {
        cardNumber,
        expiry,
        cvv,
      });

      console.log("Card created:", response.data);
      // Handle success, maybe show a success message or update card list
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Card Number" name="cardNumber">
        <Input onChange={(e) => setCardNumber(e.target.value)} />
      </Form.Item>
      <Form.Item label="Expiry" name="expiry">
        <Input onChange={(e) => setExpiry(e.target.value)} />
      </Form.Item>
      <Form.Item label="CVV" name="cvv">
        <Input onChange={(e) => setCvv(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Card
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CardForm;
