import React from "react";
import { Col, Input, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { RightOutlined } from "@ant-design/icons";

import { Container } from "../Container/Container";
import { FooterMenu } from "./FooterMenu/FooterMenu";

import logo from "../../assets/footer/footer-logo.png"; // Updated logo image

import "./AppFooter.less";

export const AppFooter = () => {
  const menuCompany = [
    {
      url: "url",
      text: "About Us",
    },
    {
      url: "url",
      text: "Careers",
    },
    {
      url: "url",
      text: "Blog",
    },
    {
      url: "url",
      text: "Press",
    },
  ];

  const menuServices = [
    {
      url: "url",
      text: "Patient Services",
    },
    {
      url: "url",
      text: "Hospital Network",
    },
    {
      url: "url",
      text: "Pricing",
    },
    {
      url: "url",
      text: "Security",
    },
    {
      url: "url",
      text: "Why Choose Us?",
    },
  ];

  const menuResources = [
    {
      url: "url",
      text: "Android App",
    },
    {
      url: "url",
      text: "iOS App",
    },
    {
      url: "url",
      text: "Windows App",
    },
    {
      url: "url",
      text: "Google Play",
    },
    {
      url: "url",
      text: "App Store",
    },
  ];

  return (
    <Footer className="app-footer">
      <Container className="app-footer__content">
        <Row gutter={[32, 24]}>
          <Col xs={24} sm={12} lg={6} className="app-footer__logo">
            <img src={logo} alt="Medical Logo" />
          </Col>
          <Col xs={12} sm={12} lg={4}>
            <FooterMenu title="Company" menu={menuCompany} />
          </Col>
          <Col xs={12} sm={12} lg={4}>
            <FooterMenu title="Services" menu={menuServices} />
          </Col>
          <Col xs={12} sm={12} lg={4}>
            <FooterMenu title="Resources" menu={menuResources} />
          </Col>
          <Col xs={24} sm={24} lg={6}>
            <div className="app-footer__subscribe">
              <h2 className="app-footer__subscribe-title">Subscribe Now</h2>
              <p className="app-footer__subscribe-text">
                Stay updated with the latest news and offers from our hospital
                network.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Footer>
  );
};
