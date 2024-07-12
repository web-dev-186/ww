import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Spin,
  Alert,
  Avatar,
  Row,
  Col,
  Button,
  Form,
  Input,
  Modal,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SolutionOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/profile",
        values,
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
      setIsModalVisible(false);
    } catch (err) {
      setError("Failed to update user profile");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <Spin
        tip="Loading..."
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      />
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

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
          width: 400,
          textAlign: "center",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{ margin: "20px auto", backgroundColor: "#1890ff" }}
        />
        <Title level={3} style={{ color: "#1890ff", marginBottom: "20px" }}>
          {user.name}
        </Title>
        <Paragraph>
          <MailOutlined /> Email: {user.email}
        </Paragraph>
        <Paragraph>
          <SolutionOutlined /> Role: {user.role}
        </Paragraph>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={showModal}
          style={{ margin: "20px 0", borderRadius: "5px" }}
        >
          Edit Profile
        </Button>
      </Card>
      <Modal
        title="Update Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            name: user.name,
            email: user.email,
          }}
          onFinish={handleUpdate}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ borderRadius: "5px" }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
