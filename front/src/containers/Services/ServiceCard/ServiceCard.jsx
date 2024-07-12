import React from "react";
import { Card } from "antd";
import "./ServiceCard.less";

export const ServiceCard = ({ icon, title, description }) => {
  return (
    <Card className="service-card" hoverable>
      <div className="service-card__icon">{icon}</div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
      </div>
    </Card>
  );
};
