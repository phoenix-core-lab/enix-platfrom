"use client";

import * as React from "react";
import SideBar from "./SideBar";
import DashboardContent from "./DashboardContent";
import "./index.scss";

const Dashboard = (props) => {
  return (
    <div className="dashboardContainer">
      <SideBar />
      <DashboardContent type={props.type} chatId={props.chatId} />
    </div>
  );
};

export default Dashboard;
