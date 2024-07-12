import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button, List } from "antd";
import "./PlanList.css";

const plansData = [
  {
    name: "Solo Lite",
    price: "₹100 per year",
    features: [
      "Validity 1 Year",
      "50% discount for BPL card holders",
      "Renews 100/yr",
      "3 Days Waiting Period",
      "2 yr @150rs",
    ],
  },
  {
    name: "Solo",
    price: "₹300 per year",
    features: [
      "Free Annual Health Check up",
      "Free 1 Specialist, 2 General Cashless Consultation worth ₹2000",
      "1 Day Activation",
      "Top Priority in appointment",
    ],
  },
  {
    name: "Solo Premium",
    price: "₹1100 per year",
    features: [
      "Free Annual Health Check up",
      "2 Specialist, 4 General Cashless Consultation worth ₹4000",
      "Free ePHR facility",
      "Top Priority in appointment",
    ],
  },
  {
    name: "Couple",
    price: "₹150 per year",
    features: [
      "Free Annual Health Check up",
      "2 Specialist, 4 General Cashless Consultation worth ₹4000",
      "Free ePHR facility",
      "Top Priority in appointment",
    ],
  },
  {
    name: "Family",
    price: "₹300 per year",
    features: [
      "Up to 4 Members",
      "Free ePHR facility",
      "Renews 100/yr",
      "3 Days Waiting Period",
      "2 yr @500rs",
    ],
  },
  {
    name: "Family+",
    price: "₹500 per year",
    features: [
      "Up to 6 Members",
      "Free Annual Health Check up",
      "Free ePHR facility",
      "Free 1 Specialist, 2 General Cashless Consultation worth ₹2000",
      "1 Day Activation",
      "Top Priority in appointment",
    ],
  },
];

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulating API call
    setPlans(plansData);
  }, [dispatch]);

  return (
    <div className="plan-list-container">
      <h2>Choose a Plan</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={plans}
        renderItem={(plan) => (
          <List.Item>
            <Card title={plan.name} className="plan-card">
              <p className="plan-price">{plan.price}</p>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Button type="primary" className="select-plan-button">
                Select Plan
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PlanList;
