import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Typography, Card } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/reset-password/${token}`, {
        password,
      });
      toast.success("Password has been reset successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again later.");
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
          Reset Password
        </Title>
        <Form onFinish={handleSubmit} style={{ margin: "20px 0" }}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default ResetPassword;
