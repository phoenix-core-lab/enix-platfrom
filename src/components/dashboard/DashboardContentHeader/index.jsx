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
  const [cookies, setCookie, removeCookie] = useCookies(
    "secretToken",
    "isActiveUser",
    "subscriptionDate"
  );
  const [openLogoMenu, setOpenLogoMenu] = React.useState(false);
  const [openUserMenu, setOpenUserMenu] = React.useState(false);
  const [allChats, setAllChats] = React.useState([]);
  const [activeUser, setActiveUser] = React.useState(false);
  const userMenuRef = React.useRef(null);
  const logoMenuRef = React.useRef(null);

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
        router.push("/signin");
      });
  };

  const handleClickOutside = (event) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target) &&
      openUserMenu
    ) {
      setOpenUserMenu(false);
    }

    if (
      logoMenuRef.current &&
      !logoMenuRef.current.contains(event.target) &&
      openLogoMenu
    ) {
      setOpenLogoMenu(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu, openLogoMenu]);

  React.useEffect(() => {
    handleGetChats();
  }, []);

  React.useEffect(() => {
    setActiveUser(cookies.isActiveUser);
  }, [cookies]);

  return (
    <div className="DashboardContentHeader">
      <div
        ref={userMenuRef}
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
                    href={
                      chat.message_type === "text"
                        ? "/dashboard/text/" + chat.chat_id
                        : "/dashboard/image/" + chat.chat_id
                    }
                    key={index}
                    className="chatHistoryItem"
                  >
                    <h4>{chat.chat_title}</h4>
                    <div
                      className="editHistoryIcon"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        alert("Редактирование истории!");
                      }}
                    >
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
        {activeUser ? (
          <Link href="/prices" className="getPlusButton activeUser">
            Плюс активен
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
            Получить Плюс
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
          <div className="mobileMenu">
            <div className="helpButtons">
              <button
                title="Yangi so'rov yarating"
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                <Image
                  src="/images/duplicate.svg"
                  alt="albums"
                  width="25"
                  height="25"
                />
              </button>
              <button
                title="Yangi so'rov yarating"
                onClick={() => {
                  removeCookie("secretToken");
                  window.location.href = "/signin";
                }}
              >
                <Image
                  src="/images/enter.svg"
                  alt="albums"
                  width="25"
                  height="25"
                />
              </button>
            </div>
            <Link className="sideBarLink" href={"https://enix.uz/"}>
              <Image
                src="/images/planet.svg"
                alt="website"
                width="25"
                height="25"
              />
              <h3 className="sideBarLinkLabel">Veb-saytga o&apos;ting</h3>
              <div className="hoverEffectIcon">
                <Image
                  src="/images/arrow-forward-circle.svg"
                  alt="website"
                  width="20"
                  height="20"
                />
              </div>
            </Link>
            <div className="sidebarDivider"></div>
            <Link className="sideBarLink" href={"/dashboard/text"}>
              <Image
                src="/images/document-text.svg"
                alt="website"
                width="25"
                height="25"
              />
              <h3 className="sideBarLinkLabel">Matn bilan ishlash</h3>
              <div className="hoverEffectIcon">
                <Image
                  src="/images/arrow-forward-circle.svg"
                  alt="website"
                  width="20"
                  height="20"
                />
              </div>
            </Link>
            <Link className="sideBarLink" href={"/dashboard/image"}>
              <Image
                src="/images/images.svg"
                alt="website"
                width="22"
                height="25"
                style={{ marginLeft: "2px" }}
              />
              <h3 className="sideBarLinkLabel">Fotosuratlar ishlash</h3>
              <div className="hoverEffectIcon imageGenerateIcon">
                <Image
                  src="/images/arrow-forward-circle.svg"
                  alt="website"
                  width="20"
                  height="20"
                />
              </div>
            </Link>
          </div>
          <div className="plan freePlan">
            <div className="planIcon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContentHeader;
