import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import Content from "../components/Content";

const DashboardPage = () => (
  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="dashboard-page:visit"
        yes={() => (
          <div>
            <h1>Dashboard</h1>
            <Login />
            <Logout />
            <Profile />
            <Content />
          </div>
        )}
        no={() => <Redirect to="/" />}
      />
    )}
  </AuthConsumer>
);

export default DashboardPage;