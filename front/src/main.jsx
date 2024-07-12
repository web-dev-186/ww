// src/index.js or src/App.js
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import store from "./store/store";
import SignInForm from "./pages/Login";
import SignUpForm from "./pages/signup";
import LandingPage from "./pages/LandingPage ";
import HospitalList from "./pages/HospitalList ";
import CardForm from "./pages/CardForm";
import PlanList from "./pages/PlanList";
import Pricing from "./containers/Pricing/Pricing";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";

import Profile from "./pages/profile/profile";
const stripePromise = loadStripe(
  "pk_test_51Pb2FvRs6tJ2YQKupyrYUjYaXvCYARJlVqZNYAljAgGZ1rO2JM6vw8ZVGPk6IqF6dcdjdiY5EBztV19dqfKzJ3IW00zXb2YtpE"
);

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignInForm />} />
      <Route
        path="/request-password-reset"
        element={<RequestPasswordReset />}
      />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />} />{" "}
        <Route path="/hopital" element={<HospitalList />} />
        <Route path="/plan" element={<Pricing />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <Elements stripe={stripePromise}>
      <Router>
        <AppRoutes />
      </Router>
    </Elements>
  </Provider>
);
