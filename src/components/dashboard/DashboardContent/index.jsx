"use client";

import * as React from "react";
import "./index.scss";
import DashboardContentHeader from "../DashboardContentHeader";
import DashboardContentFunctionality from "../DashboardContentFunctionality";
import { useTranslations } from "next-intl";

const index = (props) => {
  const t = useTranslations("Dashboard");
  return (
    <div className="dasboardContentContainer">
      <DashboardContentHeader />
      <DashboardContentFunctionality type={props.type} chatId={props.chatId} />
      <p className="footerText">{t("notice")}</p>
    </div>
  );
};

export default index;
