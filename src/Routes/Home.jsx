import React, { Component } from "react";

import { getDecodedToken } from "../utils/jwt";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const role = getDecodedToken().role;
    switch (role) {
      case "admin":
        return;
      default:
        return;
    }
  }
}

export default Home;
