import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { FaUserAlt, FaBriefcaseMedical } from "react-icons/fa";
import indiaFlag from "../../assets/footer/india.png"; // Ensure you have the India flag image in your assets
import { Button } from "antd";
import "./HealthCard.less";

const HealthCard = ({ cardNumber, name, issueDate, expiredAt }) => {
  const [qrData, setQrData] = useState(null);

  const handleGetQRCode = () => {
    const data = {
      cardNumber,
      name,
      issueDate,
      expiredAt,
    };
    setQrData(JSON.stringify(data));
  };

  return (
    <div className="health-card">
      <div className="card-header">
        <img src={indiaFlag} alt="India Flag" className="india-flag" />
        <h3 className="title">Health Card</h3>
        <FaUserAlt className="person-icon" />
      </div>
      <div className="card-details">
        <p className="card-number">Card Number: {cardNumber}</p>
        <p className="name">Name: {name}</p>
        <p className="issue-date">Issue Date: {issueDate}</p>
        <p className="expired-at">Expires At: {expiredAt}</p>
      </div>
      <FaBriefcaseMedical className="medical-icon" />
      <p className="footer-text">Issued by the Health Ministry of India</p>
      <div className="card-footer"></div>
      <div className="qr-code">
        <Button onClick={handleGetQRCode}>Get QR Code</Button>
        {qrData && (
          <QRCode
            value={qrData}
            size={80}
            level="H" // High error correction level
          />
        )}
      </div>
    </div>
  );
};

export default HealthCard;
