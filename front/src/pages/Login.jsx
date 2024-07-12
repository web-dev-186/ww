import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { signInAsync } from "../store/userApiSlice";
import { setCredentials } from "../store/authSlice";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;

const SignInForm = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log("SignIn form submitted");
    if (!email || !password) {
      toast.error("Please enter your email and password!");
      return;
    }

    try {
      const signInAction = await dispatch(signInAsync({ email, password }));
      console.log("SignIn action dispatched", signInAction);
      if (signInAction.meta.requestStatus === "fulfilled") {
        dispatch(setCredentials(signInAction.payload));
        console.log("Login successful");
        navigate("/");
      } else {
        console.error("Error signing in:", signInAction.error.message);
        toast.error("Failed to sign in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error("Server error. Please try again later.");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    const fullName = query.get("name");

    if (id && fullName) {
      const userData = { id, fullName };
      dispatch(setCredentials(userData));
      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/");
    }
  }, [location.search, dispatch, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
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
          Sign In
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
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined />}
              autoComplete="on"
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
              Log In
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          Log In with Google
        </Button>
        <Text style={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <Button type="link" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Text>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default SignInForm;
