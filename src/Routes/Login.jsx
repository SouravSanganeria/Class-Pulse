import React, { Component } from "react";
import { Redirect } from "react-router";
import { GoogleLogin } from "react-google-login";
import { getToken, checkToken } from "../utils/jwt";

import LazyHero from "react-lazy-hero";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import logo from "../assets/logo.png";
import Image from "react-bootstrap/Image";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: checkToken(),
      failed: false
    };
  }

  render() {
    let googleSuccess = data => {
      getToken(data.tokenObj.access_token, (err, token) => {
        if (err) {
          return this.setState({
            failed: true
          });
        }
        this.props.setRouterToken(token);
        this.setState({ authenticated: true });
      });
    };
    let googleFailure = data => {
      console.log(data);
      this.setState({
        failed: true
      });
    };
    if (this.state.authenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
          <LazyHero
            color="#000000"
            opacity={0.6}
            imageSrc={back1}
            minHeight="100vh"
            parallaxOffset={100}
          >
            <div
              className="home"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
                color: "white"
              }}
            >
              <Image src={logo} height="100" width="300" />
              <br />
              <br />
              <h4>A Lecture Feedback Utility</h4>
              <br />

              <h5
                style={{
                  margin: "10px"
                }}
              >
                Let's Get Started
              </h5>
              <p>
                <GoogleLogin
                  clientId="440278918733-qqr7c1rtb1vd86ctq521jh6taac87voi.apps.googleusercontent.com"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  prompt="consent"
                  theme="dark"
                  icon={false}
                  buttonText="Login with BITSMail"
                />
              </p>
              <font color="red">
                {this.state.failed
                  ? "Account not found. Make sure you are using your BITS mail to login"
                  : ""}
              </font>
            </div>
          </LazyHero>
          <LazyHero
            minHeight="75vh"
            opacity={0.8}
            imageSrc={back2}
            style={{ textAlign: "center", color: "Black" }}
          >
            <h2>
              <b>
                <u>About Class Pulse</u>
              </b>
            </h2>
            <h4 style={{ marginLeft: "10%", marginRight: "10%" }}>
              The application is a lecture feedback utility that aims to assist
              students in posting their feedback with reference to the topic(s)
              being covered during a lecture session and offer analytics to
              instructors on the feedback provided in the classroom and
              subsequent discussion.
            </h4>
            <br />
            <br />
            <div
              style={{
                color: "rgb(66, 133, 244)"
              }}
            >
              <br />
              Made with <span style={{ color: "#e25555" }}>❤</span> in BPHC
            </div>
          </LazyHero>
        </div>
      );
    }
  }
}

export default Login;
