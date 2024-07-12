import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewCardForm = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [details, setDetails] = useState({});
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axios.get("/api/plans");
      setPlans(response.data);
    };
    fetchPlans();
  }, []);

  const handleCreateCard = async () => {
    await axios.post("/api/cards/create", {
      userId: userInfo.id,
      planId: selectedPlan,
      details,
    });
    navigate("/cards");
  };

  return (
    <div>
      <h1>Create New Card</h1>
      <select onChange={(e) => setSelectedPlan(e.target.value)}>
        <option value="">Select a Plan</option>
        {plans.map((plan) => (
          <option key={plan._id} value={plan._id}>
            {plan.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreateCard}>Create Card</button>
    </div>
  );
};

export default NewCardForm;
