import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import LazyHero from "react-lazy-hero";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { getDecodedToken } from "../utils/jwt";
import { axiosGET, axiosPOST } from "../utils/axiosClient";
import SeeAll from "./SeeAll";

import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";
import Filepond from "./Filepond";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [], role: "admin" };
  }
  componentDidMount() {
    console.log("ADMIN DASHBOARD REACHED");
    this.getCourses();
  }
  async getCourses() {
    let allCourses = [];
    let decoded = getDecodedToken();
    console.log(decoded);
    await axiosGET(`/api/courses/${decoded.email}`, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    }).then(res => {
      allCourses = res.data[0].courses;
      console.log(allCourses);
    });
    this.setState({ courses: allCourses });
  }

  generateCoursesList() {
    function getpdfs(coursepdfs) {
      let allpdfs = [];
      coursepdfs.forEach(pdf => {
        allpdfs.push(
          <Card body>
            <Row>
              <Col>{pdf.name}</Col>
              <Col>
                <Link
                  to={{
                    pathname: "/admin/slides",
                    state: { link: pdf.link }
                  }}
                >
                  <Button variant="primary" align="right">
                    Start Session
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        );
      });
      return <SeeAll items={allpdfs} count={5} name="courses" />;
    }
    let allcourses = [];
    let temp = [];
    temp = this.state.courses;
    console.log(this.state && this.state.courses);
    temp.forEach(course => {
      allcourses.push(
        <Collapse>
          <Collapse.Panel header={course.name}>
            {getpdfs(course.pdfs)}
          </Collapse.Panel>
        </Collapse>
      );
    });
    return <SeeAll items={allcourses} count={5} name="courses" />;
  }

  render() {
    return (
      <Container>
        <Row style={{ textAlign: "center", padding: "10px" }}>
          <Col>
            <h3>Your Courses</h3>
          </Col>
        </Row>
        <div className="m:2">{this.generateCoursesList()}</div>
        <br />
        <br />
        <br />
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
