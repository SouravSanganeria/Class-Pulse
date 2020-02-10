import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LazyHero from "react-lazy-hero";
import Filepond from "./Filepond";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.setState({ role: "admin" });
  }
  componentDidMount() {
    console.log("ADMIN DASHBOARD REACHED");
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
            <h1>Hello, Admin!</h1>
          </div>
        </LazyHero>
        <Col md={6}>
          <Button variant="light" size="lg" href="admin/slides">
            <h2>Navigate Slides</h2>
            <h6>Display slides to start the session</h6>
          </Button>
        </Col>
        <Filepond />
        <div
          style={{
            position: "fixed",
            left: "0",
            bottom: "10px",
            width: "100%",
            textAlign: "center"
          }}
        >
          <span className="glyphicon glyphicon-calendar" />
          <span style={{ color: "darkgrey" }}>
            BITS Pilani Hyderabad Campus
          </span>
        </div>
      </Container>
    );
  }
}

export default AdminDashboard;
