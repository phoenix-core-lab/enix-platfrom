"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { useMainContext } from "@/providers/contextProvider";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";

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
  // const [openMiniMenus, setOpenMiniMenus] = React.useState({});

  // const toggleMiniMenu = (chatId) => {
  //   setOpenMiniMenus((prevState) => ({
  //     ...prevState,
  //     [chatId]: !prevState[chatId],
  //   }));
  // };

  // const handleGetChats = () => {
  //   axios
  //     .get(process.env.NEXT_PUBLIC_APP_API_URL + "/chat/all-chats", {
  //       headers: {
  //         Authorization: `Bearer ${cookies.secretToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAllChats(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       removeCookie("secretToken");
  //       router.push("/signin");
  //     });
  // };

  // const deleteChat = (chatId) => {
  //   axios
  //     .delete(process.env.NEXT_PUBLIC_APP_API_URL + "/chat/" + chatId, {
  //       headers: {
  //         Authorization: `Bearer ${cookies.secretToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       handleGetChats();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const handleClickOutside = (event) => {
  //   if (
  //     userMenuRef.current &&
  //     !userMenuRef.current.contains(event.target) &&
  //     openUserMenu
  //   ) {
  //     console.log("Закрытие пользовательского меню");
  //     setOpenUserMenu(false);
  //   }

  //   if (
  //     logoMenuRef.current &&
  //     !logoMenuRef.current.contains(event.target) &&
  //     !Object.values(openMiniMenus).some((isOpen) => isOpen) &&
  //     openLogoMenu
  //   ) {
  //     console.log("Закрытие главного меню");
  //     setOpenLogoMenu(false);
  //   }
  // };

  // React.useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [openUserMenu, openLogoMenu]);

  // React.useEffect(() => {
  //   handleGetChats();
  // }, []);

  React.useEffect(() => {
    setActiveUser(cookies.isActiveUser);
  }, [cookies]);

  return (
    <div className="DashboardContentHeader">
      <div
        className="enixUserMenu"
        onClick={() => {setOpenUserMenu(!openUserMenu); setOpenLogoMenu(false)}}
      >
        <div className="logo">
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
      {/* {openUserMenu && (
        <div
          className="overlay"
          onClick={() => setOpenUserMenu(!openUserMenu)}
        ></div>
      )} */}

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
        onClick={() => {setOpenLogoMenu(!openLogoMenu); setOpenUserMenu(false)}}
      >
        <div className="logo">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardContentHeader;
