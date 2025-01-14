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
  const [openMiniMenus, setOpenMiniMenus] = React.useState({});

  const toggleMiniMenu = (chatId) => {
    setOpenMiniMenus((prevState) => ({
      ...prevState,
      [chatId]: !prevState[chatId],
    }));
  };

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
  const deleteChat = (chatId) => {
    axios
      .delete(process.env.NEXT_PUBLIC_APP_API_URL + "/chat/" + chatId, {
        headers: {
          Authorization: `Bearer ${cookies.secretToken}`,
        },
      })
      .then((res) => {
        handleGetChats();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClickOutside = (event) => {
    // Проверяем, произошел ли клик вне пользовательского меню
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target) && // Не кликнут внутри меню
      openUserMenu
    ) {
      console.log("Закрытие пользовательского меню");
      setOpenUserMenu(false);
    }

    // Проверяем, произошел ли клик вне главного меню
    if (
      logoMenuRef.current &&
      !logoMenuRef.current.contains(event.target) && // Не кликнут внутри главного меню
      !Object.values(openMiniMenus).some((isOpen) => isOpen) && // Мини-меню не открыты
      openLogoMenu
    ) {
      console.log("Закрытие главного меню");
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
        {openUserMenu && (
          <div
            className="overlay"
            onClick={() => setOpenUserMenu(!openUserMenu)}
          ></div>
        )}
        <div className="userDownMenu">
          <div className="userDownMenuHeader">
            <h3>Suhbat tarixi</h3>
            <button onClick={() => setOpenUserMenu(!openUserMenu)}>
              <Image
                src="/images/closeIcon.svg"
                alt="close"
                width="10"
                height="10"
              />
            </button>
          </div>
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
                    <div className="miniMenu">
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          console.log("Toggle menu for chat:", chat.chat_id);
                          toggleMiniMenu(chat.chat_id);
                        }}
                        className="miniMenuOpenButton"
                      >
                        <Image
                          src="/images/dots.svg"
                          alt="dots"
                          width="20"
                          height="20"
                        />
                      </button>

                      {openMiniMenus[chat.chat_id] && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => toggleMiniMenu(chat.chat_id)}
                          />
                          <div className="absolute left-0 mt-2 w-56 bg-[#171717] rounded-xl shadow-xl py-1.5 z-20 border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-1.5">
                              <button className="w-full px-3 py-2.5 flex items-center gap-3 text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 group">
                                <span className="font-medium">Share</span>
                              </button>
                              <button className="w-full px-3 py-2.5 flex items-center gap-3 text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 group">
                                <span className="font-medium">Rename</span>
                              </button>
                              <button className="w-full px-3 py-2.5 flex items-center gap-3 text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 group">
                                <span className="font-medium">Archive</span>
                              </button>
                              <button
                                onClick={() => deleteChat(chat.chat_id)}
                                className="w-full px-3 py-2.5 flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 group"
                              >
                                <span className="font-medium">Delete</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
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
