"use client";

import * as React from "react";
import "./index.scss";
import DashboardContentHeader from "../DashboardContentHeader";
import DashboardContentFunctionality from "../DashboardContentFunctionality";

const index = (props) => {
  return (
    <div className="dasboardContentContainer">
        <DashboardContentHeader />
        <DashboardContentFunctionality type={props.type} chatId={props.chatId} />
        <p className="footerText">ENIX xatolarga yo&apos;l qo&apos;yishi mumkin. Muhim ma&apos;lumotlarni tekshirishni tavsiya etamiz.</p>
    </div>
  )
}

export default index