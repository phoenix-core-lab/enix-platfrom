"use client";
import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { CookiesProvider, useCookies } from "react-cookie";
import { useTranslations } from "next-intl";
import { useMainContext } from "@/providers/contextProvider";
import axios from "axios";

const HistorySideBar = (props) => {
  const t = useTranslations("Dashboard");
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(
    "secretToken",
    "isActiveUser",
    "subscriptionDate"
  );
  const { openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu } =
    useMainContext();
  const [allChats, setAllChats] = useState([]);
  const [openMiniMenus, setOpenMiniMenus] = useState({});
  const deleteButtonRef = useRef(null); // Ссылка на кнопку удаления

  const toggleMiniMenu = (chatId) => {
    setOpenMiniMenus((prevState) => {
      if (prevState[chatId]) {
        return { ...prevState, [chatId]: false }; // Закрыть текущее меню
      }
      return { [chatId]: true }; // Открыть только выбранное меню
    });
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
      .then(() => handleGetChats())
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // Закрыть меню при клике вне его
    const handleClickOutside = (event) => {
      if (
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target)
      ) {
        setOpenMiniMenus({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    handleGetChats();
  }, []);

  return (
    <div className="menuShadow" onClick={() => setOpenUserMenu(!openUserMenu)}>
      <div className="userDownMenu" onClick={(e) => e.stopPropagation()}>
        <div className="userDownMenuHeader">
          <h3>Suhbat tarixi</h3>
          <button onClick={() => setOpenUserMenu(!openUserMenu)}>
            <Image
              src="/images/closeIcon.svg"
              alt="close"
              width="15"
              height="15"
            />
          </button>
        </div>
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
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="chatHistoryItem"
                >
                  <h4>{chat.chat_title}</h4>
                  <div
                    className="miniMenu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

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
                  </div>
                  {openMiniMenus[chat.chat_id] && (
                    <div className="absolute right-0 top-8 mt-2 bg-[#171717] rounded-xl shadow-xl py-1.5 z-20 border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-1.5">
                        <button
                          ref={deleteButtonRef} // Добавляем ref для кнопки удаления
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            deleteChat(chat.chat_id);
                          }}
                          className="w-full px-3 py-2.5 flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 group"
                        >
                          <span className="font-medium">
                            {t("history.delete")}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySideBar;
