"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useMainContext } from "@/providers/contextProvider";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ScanFace, UserCircleIcon } from "lucide-react";

const DashboardContentHeader = () => {
  const t = useTranslations("Dashboard");
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(
    "secretToken",
    "isActiveUser",
    "subscriptionDate"
  );
  const { openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu } =
    useMainContext();
  const [activeUser, setActiveUser] = React.useState(false);
  const logoMenuRef = React.useRef(null);
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = React.useState("dark"); // Значение по умолчанию

  React.useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme]);

  React.useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);
  return (
    <div
      className={`DashboardContentHeader ${theme === "light" ? "light" : ""}`}
    >
      <div
        className="enixUserMenu"
        onClick={() => {
          setOpenUserMenu(!openUserMenu);
          setOpenLogoMenu(false);
        }}
      >
        <div className={`logo ${theme === "light" ? "light" : ""}`}>
          <Image
            className="logoEnix"
            src="/images/history.svg"
            alt="Enix"
            width={100}
            height={100}
          />
          <Image
            className="logoChatEnixArrow"
            src="/images/chevron-down.svg"
            alt="logoChatEnixArrow"
            width={15}
            height={15}
          />
        </div>
      </div>
      <div className="headerTitle">
        {activeUser ? (
          <Link href="/prices" className="getPlusButton activeUser">
            {t("plus")}
            <Image
              className="rocket"
              src="/images/rocket.svg"
              alt="rocket"
              width={15}
              height={15}
            />
          </Link>
        ) : (
          <Link href="/prices" className="getPlusButton">
            {t("getPlus")}
            <Image
              className="rocket"
              src="/images/rocket.svg"
              alt="rocket"
              width={15}
              height={15}
            />
          </Link>
        )}
      </div>
      <div
        ref={logoMenuRef}
        className="enixLogoMenu"
        onClick={() => {
          setOpenLogoMenu(!openLogoMenu);
          setOpenUserMenu(false);
        }}
      >
        <div className={`logo ${theme === "light" ? "light" : ""}`}>
          <Image
            className="logoEnixArrow"
            src="/images/chevron-down.svg"
            alt="logoEnixArrow"
            width={15}
            height={15}
          />
          <Image
            className="logoEnix"
            src="/images/logo.png"
            alt="Enix"
            width={100}
            height={100}
          />
          <ScanFace className="userIcon" />
        </div>
      </div>
    </div>
  );
};

export default DashboardContentHeader;
