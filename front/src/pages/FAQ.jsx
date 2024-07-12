import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const faqs = [
  {
    question: "What is this website about?",
    answer: "This is a full-stack web application built with the MERN stack.",
  },
  {
    question: "How do I sign up?",
    answer: "You can sign up by clicking on the 'Get Started' button.",
  },
  {
    question: "How do I manage my health cards?",
    answer:
      "You can manage your health cards through the user dashboard after logging in.",
  },
];

const FAQ = () => {
  return (
    <div className="section">
      <h2>Frequently Asked Questions</h2>
      <Collapse accordion>
        {faqs.map((faq, index) => (
          <Panel header={faq.question} key={index}>
            <p>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQ;
