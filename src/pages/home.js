import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Login from "../components/Login";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/info" />
      ) : (
        <div>
          <h2>Welcome to the knowledge center</h2>
          <Login />
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;