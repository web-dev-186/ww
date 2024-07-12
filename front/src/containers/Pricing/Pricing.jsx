// Pricing.jsx

import React, { useState } from "react";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading.jsx";
import { Container } from "../../components/Container/Container.jsx";
import { Row, Col, Card, Button, Modal, message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm.jsx";
import stripePromise from "../../stripe/StripeConfig.js";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector from react-redux

const Pricing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const userId = useSelector((state) => state.auth.userInfo.id); // Fetch userId from Redux store

  const priceList = [
    {
      title: "Solo Lite",
      price: "100",
      features: [
        "Validity 1 Year",
        "50% discount for BPL card holders",
        "Renews 100/yr",
        "3 Days Waiting Period",
        "2 yr @150rs",
      ],
      buttonType: "default",
    },
    {
      title: "Solo",
      price: "300",
      features: [
        "Free Annual Health Check up",
        "Free 1 Specialist, 2 General Cashless Consultation worth ₹2000",
        "1 Day Activation",
        "Top Priority in appointment",
      ],
      buttonType: "primary",
    },
    {
      title: "Solo Premium",
      price: "1100",
      features: [
        "Free Annual Health Check up",
        "2 Specialist, 4 General Cashless Consultation worth ₹4000",
        "Free ePHR facility",
        "Top Priority in appointment",
      ],
      buttonType: "default",
    },
    {
      title: "Couple",
      price: "150",
      features: [
        "Free Annual Health Check up",
        "2 Specialist, 4 General Cashless Consultation worth ₹4000",
        "Free ePHR facility",
        "Top Priority in appointment",
      ],
      buttonType: "default",
    },
    {
      title: "Family",
      price: "300",
      features: [
        "Upto 4 Members",
        "Free ePHR facility",
        "Renews 100/yr",
        "3 Days Waiting Period",
        "2 yr @500rs",
      ],
      buttonType: "default",
    },
    {
      title: "Family+",
      price: "500",
      features: [
        "Upto 6 members",
        "Free Annual Health Check up",
        "Free ePHR facility",
        "Free 1 Specialist, 2 General Cashless Consultation worth ₹2000",
        "1 Day Activation",
        "Top Priority in appointment",
      ],
      buttonType: "default",
    },
  ];

  const handleSuccess = async () => {
    message.success("Payment successful!");
    setIsModalVisible(false);

    try {
      const selectedPlanInfo = priceList.find(
        (plan) => plan.title === selectedPlan.title
      );
      if (!selectedPlanInfo) {
        console.error("Selected plan not found in priceList");
        return;
      }

      // Create a card entry
      await axios.post("http://localhost:5000/api/cards", {
        userId,
        planName: selectedPlanInfo.title,
        expiredAt: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ), // 1 year from now
      });

      console.log("Card created successfully");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  const showCheckoutModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalVisible(true);
  };

  return (
    <section id="pricing" className="pricing">
      <Container>
        <SectionHeading heading="Our Plans" />
        <Row gutter={[24, 24]} justify="center">
          {priceList.map((price, index) => (
            <Col key={index} xs={24} sm={20} md={12} lg={8}>
              <Card title={price.title} className="price-card">
                <p className="price">₹{price.price} per year</p>
                <ul className="features">
                  {price.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Button
                  type={price.buttonType}
                  onClick={() => showCheckoutModal(price)}
                >
                  Select
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          title="Checkout"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm
              price={selectedPlan.price}
              title={selectedPlan.title}
              onSuccess={handleSuccess}
            />
          </Elements>
        </Modal>
      </Container>
    </section>
  );
};

export default Pricing;
