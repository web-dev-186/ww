import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import Slider from "react-slick";
import { HomeOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HospitalList.css"; // Custom CSS for additional styling

const { Title } = Typography;

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hospitals");
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="hospital-list-container">
      <Title className="centered-title" level={3}>
        Network Hospitals
      </Title>
      <div className="carousel-container">
        <Slider {...settings}>
          {hospitals.map((item) => (
            <div key={item.name} className="hospital-item">
              <HomeOutlined className="hospital-icon" />
              <div className="hospital-info">
                <Title level={4}>
                  <a href={item.website}>{item.name}</a>
                </Title>
                <p>{item.address}</p>
                <p>{item.contact}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HospitalList;
