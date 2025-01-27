"use client";
import * as React from "react";
import SideBar from "./SideBar";
import HistorySideBar from "./HistorySideBar";
import MobileMenu from "./MobileMenu";
import DashboardContent from "./DashboardContent";
import { useMainContext } from "@/providers/contextProvider";
import "./index.scss";
import ThemeToggle from "../theme-toggle/theme-toggle";

const Dashboard = (props) => {
  const { openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu } =
    useMainContext();
  return (
    <div
      className={
        "dashboardWrapper" +
        (openUserMenu ? " openUserMenu" : "") +
        (openLogoMenu ? " openLogoMenu" : "")
      }
    >
      <HistorySideBar />
      <div className="dashboardContainer">
        <SideBar />
        <DashboardContent type={props.type} chatId={props.chatId} />
      </div>
      <MobileMenu />
    </div>
  );
};

export default Dashboard;
