import React from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  Favorite as HeartIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  Medication as MedicationIcon,
  Psychology as PsychologyIcon,
  Visibility as EyeIcon,
  AccessibleForward as AccessibleIcon,
} from "@mui/icons-material";
import "./Services.less";

const { Title, Text } = Typography;

const servicesData = [
  {
    title: "Heart Diseases",
    description:
      "Comprehensive care for heart conditions, including diagnostics, treatment, and rehabilitation.",
    icon: <HeartIcon />,
  },
  {
    title: "General Surgery",
    description:
      "Expert surgical procedures covering a wide range of medical conditions with advanced techniques.",
    icon: <HospitalIcon />,
  },
  {
    title: "Dental Problems",
    description:
      "Advanced dental treatments including preventive, restorative, and cosmetic dentistry.",
    icon: <MedicalIcon />,
  },
  {
    title: "Diagnostic",
    description:
      "Accurate diagnostic services with state-of-the-art equipment for early detection and treatment.",
    icon: <HealthAndSafetyIcon />,
  },
  {
    title: "Medicine",
    description:
      "Wide range of medicines available for various health conditions, ensuring quality and affordability.",
    icon: <MedicationIcon />,
  },
  {
    title: "Neurology",
    description:
      "Specialized neurological care for conditions affecting the brain, spinal cord, and nerves.",
    icon: <PsychologyIcon />,
  },
  {
    title: "Eye Care",
    description:
      "Comprehensive eye care services including vision tests, treatments, and surgeries.",
    icon: <EyeIcon />,
  },
  {
    title: "Orthopaedics",
    description:
      "Advanced orthopaedic treatments for bone, joint, and muscle conditions, including surgeries and rehabilitation.",
    icon: <AccessibleIcon />,
  },
];

const Services = () => {
  return (
    <div className="services">
      <div className="services__description">
        <Title level={2}>Our Services</Title>
        <Text>
          We provide a wide range of services to help you stay healthy.
        </Text>
      </div>
      <Row gutter={[16, 16]} className="services__content">
        {servicesData.map((service, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card className="service-card">
              <div className="service-card__icon">{service.icon}</div>
              <div className="service-card__content">
                <Title level={4} className="service-card__title">
                  {service.title}
                </Title>
                <Text className="service-card__description">
                  {service.description}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;
