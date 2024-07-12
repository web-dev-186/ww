import React, { useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserOutlined } from "@ant-design/icons";
const { Title } = Typography;

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/request-password-reset", {
        email,
      });
      toast.success("Password reset link has been sent to your email.");
    } catch (error) {
      console.error("Error requesting password reset:", error);
      toast.error("Failed to request password reset. Please try again later.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #f0f2f5 25%, #1890ff 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 350,
          textAlign: "center",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} style={{ color: "#1890ff", marginBottom: "20px" }}>
          Request Password Reset
        </Title>
        <Form onFinish={handleSubmit} style={{ margin: "20px 0" }}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined />}
              autoComplete="email"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "5px",
              }}
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default RequestPasswordReset;
