import React, { Component } from "react";
import { Link } from "react-router-dom";
import "rc-collapse/assets/index.css";
import Container from "react-bootstrap/Container";
import LazyHero from "react-lazy-hero";
import { axiosGET } from "../utils/axiosClient";
import axios from "axios";
import { getDecodedToken } from "../utils/jwt";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import {
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Modalrooter,
  Alert,
  TabContent,
  TabPane,
  Nav,
  Navitea,
  NavLink,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    console.log(this.user);
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.slide = this.slide.bind(this);
  }

  state = {
    modal: false,
    sessionID: "",
    link: ""
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("Hello");
    console.log("SessionID:", this.state.sessionID);
    //this.setState({ link: this.state.sessionID });
    var url = `/api/marks/getLink/${this.state.sessionID}`;
    axios
      .get(url)
      .then(response => {
        console.log("res", response);
        this.setState({ link: response.data[0].link }, this.slide);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  slide() {
    localStorage.setItem("link", this.state.link);
    localStorage.setItem("ssid", this.state.sessionID);
    //console.log(localStorage.getItem("ssid"));
    //console.log("link", this.state.link);
    window.location.href = "/studentslides";
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

        <Button onClick={this.toggle}> Begin Session </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          //className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}> New Session</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleText">Enter SessionID</Label>
                <Input
                  name="text"
                  id="example1234"
                  onChange={e => {
                    this.setState({ sessionID: e.target.value });
                  }}
                />
              </FormGroup>

              <Col md={{ size: 10 }}>
                <Button type="submit">Enter</Button>
              </Col>
            </Form>
          </ModalBody>
        </Modal>

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
