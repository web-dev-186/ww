import React from "react";
import Layout, { Content } from "antd/lib/layout/layout";

// import { AppHeader } from './components/AppHeader/AppHeader';
import Home from "../containers/Home/Home";
import { About } from "../containers/About/About";
import { BusinessPlan } from "../containers/BusinessPlan/BusinessPlan";
import Services from "../containers/Services/Services";

import { Contact } from "../containers/Contact/Contact";
import { AppFooter } from "../components/AppFooter/AppFooter";
import HospitalList from "./HospitalList ";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Home />
      <div className="services-wrapper">
        <Services />
      </div>
      <div className="hospital-list-wrapper">
        <HospitalList />
      </div>
      <Contact />
      <AppFooter />
    </div>
  );
};

export default LandingPage;
