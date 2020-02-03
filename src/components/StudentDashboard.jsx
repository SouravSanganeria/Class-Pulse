import React, { Component } from "react";
import { Link } from "react-router-dom";
import "rc-collapse/assets/index.css";
import Container from "react-bootstrap/Container";
import LazyHero from "react-lazy-hero";
import { axiosGET } from "../utils/axiosClient";
import { getDecodedToken } from "../utils/jwt";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    console.log(this.user);
  }
  render() {
    return (
      <Container>
        <LazyHero>
          <div
            style={{
              color: "#404040",
              marginTop: "9rem",
              marginBottom: "4rem"
            }}
          >
            <h1>What would you like to do?</h1>
          </div>
        </LazyHero>
        <div
          style={{
            position: "fixed",
            left: "0",
            bottom: "10px",
            width: "100%",
            textAlign: "center"
          }}
        >
          <span class="glyphicon glyphicon-calendar" />
          <span style={{ color: "darkgrey" }}>
            BITS Pilani Hyderabad Campus
          </span>
        </div>
      </Container>
    );
  }
}

export default StudentDashboard;
