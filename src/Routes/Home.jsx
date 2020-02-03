import React, { Component } from "react";

import AdminDashboard from "../components/AdminDashboard.jsx";
import StudentDashboard from "../components/StudentDashboard.jsx";

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
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  }
}

export default Home;
