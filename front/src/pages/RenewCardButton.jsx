import React from "react";
import axios from "axios";

const RenewCardButton = ({ cardId }) => {
  const handleRenew = async () => {
    try {
      const response = await axios.put(`/api/cards/${cardId}/renew`);
      console.log("Card renewed:", response.data.card);
      // Handle success, e.g., show a success message or update UI
    } catch (error) {
      console.error("Error renewing card:", error);
    }
  };

  return <button onClick={handleRenew}>Renew Card</button>;
};

export default RenewCardButton;
