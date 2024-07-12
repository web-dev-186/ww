// Home.js or relevant component

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { IdcardOutlined, CreditCardOutlined } from "@ant-design/icons";
import "./Home.less";
import { Container } from "../../components/Container/Container";
import { useSelector } from "react-redux";
import axios from "axios";
import HealthCard from "./HealthCard";
import cardImage from "../../assets/card.png"; // Import card image

const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      getCardInfo();
    }
  }, [userInfo]);

  const getCardInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cards/${userInfo.id}`
      );

      // Ensure response.data is always an array, even if it's a single object
      setCards(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Error fetching card information:", error);
      setError("Error fetching card information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleRenewCard = async (cardId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/renew/${cardId}`
      );

      console.log("Card renewed successfully", response.data);
      getCardInfo(); // Refresh the card data after renewal
    } catch (error) {
      console.error("Error renewing card:", error);
      // Handle error scenario, show alert or retry option
    }
  };

  const renderCardStatus = () => {
    if (!userInfo) {
      return (
        <div className="no-cards">
          <h2>Let’s get professional about healthcare</h2>
          <Button type="primary" size="large">
            <Link to="/login">
              Get your Card Now <CreditCardOutlined />
            </Link>
          </Button>
        </div>
      );
    }

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return (
        <div className="no-cards">
          <Button type="primary" size="large" className="retry-button">
            <Link to="/plan">
              <IdcardOutlined /> Get Your Card Now
            </Link>
          </Button>
          <img
            src={cardImage}
            alt="Card Placeholder"
            className="card-placeholder"
          />
        </div>
      );
    }

    if (cards.length === 0) {
      return (
        <div className="no-cards">
          <h2>No active card subscriptions found</h2>
          <Button type="primary" size="large" className="get-card-button">
            <Link to="/plan">
              <IdcardOutlined /> Get Your Card Now
            </Link>
          </Button>
          <img
            src={cardImage}
            alt="Card Placeholder"
            className="card-placeholder"
          />
        </div>
      );
    }

    return (
      <div className="card-list">
        {cards.map((card) => {
          const expiredDate = new Date(card.expiredAt);
          const currentDate = new Date();
          const isCardExpired = expiredDate < currentDate;

          return (
            <div key={card._id} className="card-item">
              <HealthCard
                cardNumber={card._id} // Replace with actual card number from card data
                name={card.userId.name} // Replace with actual name from card data
                issueDate={new Date(card.createdAt).toLocaleDateString()} // Display creation date in localized format
                expiredAt={new Date(card.expiredAt).toLocaleDateString()} // Display expiration date in localized format
              />
              {isCardExpired ? (
                <Alert
                  message="Your card has expired"
                  type="error"
                  closable
                  action={
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => handleRenewCard(card._id)}
                    >
                      Renew Card
                    </Button>
                  }
                  style={{ marginTop: "10px" }}
                />
              ) : (
                <p></p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="home" className="home">
      <Container className="home__container">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} className="home__intro">
            <h1 className="intro__heading">
              Welcome to Our Health Care Portal
            </h1>
            <p className="intro__sub-heading">
              Providing comprehensive health plans and services to ensure your
              well-being. Join our network and experience the best in health
              care.
            </p>
          </Col>
          <Col xs={24} md={12} className="home__cards">
            {renderCardStatus()}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
