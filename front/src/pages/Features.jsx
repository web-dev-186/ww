// Features.jsx
import React from "react";
import { Card, Col, Row } from "antd";

const features = [
  { title: "Feature 1", description: "Description of feature 1." },
  { title: "Feature 2", description: "Description of feature 2." },
  { title: "Feature 3", description: "Description of feature 3." },
];

const Features = () => {
  return (
    <div className="section">
      <h2>Features</h2>
      <Row gutter={[16, 16]}>
        {features.map((feature, index) => (
          <Col span={8} key={index}>
            <Card title={feature.title}>
              <p>{feature.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Features;
