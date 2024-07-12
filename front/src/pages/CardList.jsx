import React, { useState, useEffect } from "react";
import axios from "axios";
import RenewCardButton from "./RenewCardButton";

const CardList = ({ userId }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`/api/cards/user/${userId}`);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [userId]);

  return (
    <div>
      <h2>Your Cards</h2>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            <h3>Card ID: {card._id}</h3>
            <p>Status: {card.status}</p>
            <p>Created At: {new Date(card.createdAt).toLocaleDateString()}</p>
            <RenewCardButton cardId={card._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
