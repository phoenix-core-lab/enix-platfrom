"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import Link from "next/link";

const DashboardContentHeader = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies("secretToken");
  const [openLogoMenu, setOpenLogoMenu] = React.useState(false);
  const [openUserMenu, setOpenUserMenu] = React.useState(false);
  const [allChats, setAllChats] = React.useState([]);

  const handleGetChats = () => {
    axios
      .get(process.env.NEXT_PUBLIC_APP_API_URL + "/chat/all-chats", {
        headers: {
          Authorization: `Bearer ${cookies.secretToken}`,
        },
      })
      .then((res) => {
        setAllChats(res.data);
      })
      .catch((err) => {
        console.error(err);
        removeCookie("secretToken");
        router.push("/signin")
      });
  };

  React.useEffect(() => {
    handleGetChats();
  }, []);

  return (
    <div className="DashboardContentHeader">
      <div
        className={"enixUserMenu" + (openUserMenu ? " openUserMenu" : "")}
        onClick={() => setOpenUserMenu(!openUserMenu)}
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
            className="logoEnixArrow"
            src="/images/chevron-down.svg"
            alt="logoEnixArrow"
            width={15}
            height={15}
          />
        </div>
        <div className="userDownMenu">
          <h3>Suhbat tarixi</h3>
          <div className="sidebarDivider"></div>
          <div className="chatHistory">
            {allChats.map(
              (chat, index) =>
                chat.chat_title && (
                  <Link
                    href={chat.message_type === "text" ? "/dashboard/text/" + chat.chat_id : "/dashboard/image/" + chat.chat_id}
                    key={index}
                    className="chatHistoryItem"
                  >
                    <h4>{chat.chat_title}</h4>
                    <div className="editHistoryIcon">
                      <Image
                        src="/images/dots.svg"
                        alt="website"
                        width="20"
                        height="20"
                      />
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
      <div className="headerTitle">
        <h3>ENIX - sizning shaxsiy yordamchingiz!</h3>
      </div>
      <div
        className={"enixLogoMenu" + (openLogoMenu ? " openLogoMenu" : "")}
        onClick={() => setOpenLogoMenu(!openLogoMenu)}
      >
        <div className="logo">
          <Image
            className="logoEnix"
            src="/images/logo.png"
            alt="Enix"
            width={100}
            height={100}
          />
          <Image
            className="logoEnixArrow"
            src="/images/chevron-down.svg"
            alt="logoEnixArrow"
            width={15}
            height={15}
          />
        </div>
        <div className="downMenu">
          <div className="plan"></div>
          <div className="plan"></div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardContentHeader;
