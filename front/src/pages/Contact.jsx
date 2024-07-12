// Contact.jsx
import React from "react";
import { Form, Input, Button } from "antd";

const Contact = () => {
  const handleSubmit = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="section">
      <h2>Contact Us</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Your Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Your Email" />
        </Form.Item>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
        >
          <Input.TextArea placeholder="Your Message" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
