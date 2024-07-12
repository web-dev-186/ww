import React, { useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpAsync } from "../store/userApiSlice";
import { setCredentials } from "../store/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = await dispatch(signUpAsync(values)).unwrap();
      dispatch(setCredentials(userData));
      localStorage.setItem("userInfo", JSON.stringify(userData));
      toast.success("Inscription réussie");
      history.push("/");
    } catch (error) {
      toast.error("Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
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
          S'inscrire
        </Title>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ margin: "20px 0" }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Veuillez entrer votre nom!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nom"
              autoComplete="name"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre adresse e-mail!",
              },
              { type: "email", message: "Format d'e-mail invalide!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Adresse e-mail"
              autoComplete="email"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mot de passe"
              autoComplete="new-password"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "5px",
              }}
            >
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
        <Text style={{ marginTop: "20px" }}>
          Vous avez déjà un compte?{" "}
          <Button type="link" onClick={() => history.push("/signin")}>
            Connectez-vous
          </Button>
        </Text>
      </Card>
    </div>
  );
};

export default SignUpForm;
