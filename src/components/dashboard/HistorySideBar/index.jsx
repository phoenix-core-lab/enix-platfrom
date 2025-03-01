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
import { History } from "lucide-react";

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
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = useState("dark"); // Значение по умолчанию

  useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme]);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

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
        // removeCookie("secretToken");
        // router.push("/signin");
      });
  };

  const deleteChat = (event, chatId) => {
    event.preventDefault();
    event.stopPropagation();

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
  const allChats2 = [
    {
      chat_id: 1,
      chat_title: "Chat 1",
      message_type: "text",
      message: "Message 1",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 2,
      chat_title: "Chat 2",
      message_type: "text",
      message: "Message 1",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 3,
      chat_title: "Chat 3",
      message_type: "text",
      message: "Message 1",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 4,
      chat_title: "Chat 4",
      message_type: "text",
      message: "Message 1",
      created_at: "2020-01-01 10:00:00",
    },
    /*************  ✨ Codeium Command 🌟  *************/
    {
      chat_id: 5,
      chat_title: "Chat 5",
      message_type: "text",
      message: "Message 1",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 6,
      chat_title: "Chat 6",
      message_type: "text",
      message: "Message 2",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 7,
      chat_title: "Chat 7",
      message_type: "text",
      message: "Message 3",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 8,
      chat_title: "Chat 8",
      message_type: "text",
      message: "Message 4",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 9,
      chat_title: "Chat 9",
      message_type: "text",
      message: "Message 5",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 10,
      chat_title: "Chat 10",
      message_type: "text",
      message: "Message 6",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 11,
      chat_title: "Chat 11",
      message_type: "text",
      message: "Message 7",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 12,
      chat_title: "Chat 12",
      message_type: "text",
      message: "Message 8",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 13,
      chat_title: "Chat 13",
      message_type: "text",
      message: "Message 9",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 14,
      chat_title: "Chat 14",
      message_type: "text",
      message: "Message 10",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 15,
      chat_title: "Chat 15",
      message_type: "text",
      message: "Message 11",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 16,
      chat_title: "Chat 16",
      message_type: "text",
      message: "Message 12",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 17,
      chat_title: "Chat 17",
      message_type: "text",
      message: "Message 13",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 18,
      chat_title: "Chat 18",
      message_type: "text",
      message: "Message 14",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 19,
      chat_title: "Chat 19",
      message_type: "text",
      message: "Message 15",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 20,
      chat_title: "Chat 20",
      message_type: "text",
      message: "Message 16",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 21,
      chat_title: "Chat 21",
      message_type: "text",
      message: "Message 17",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 22,
      chat_title: "Chat 22",
      message_type: "text",
      message: "Message 18",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 23,
      chat_title: "Chat 23",
      message_type: "text",
      message: "Message 19",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 24,
      chat_title: "Chat 24",
      message_type: "text",
      message: "Message 20",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 25,
      chat_title: "Chat 25",
      message_type: "text",
      message: "Message 21",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 26,
      chat_title: "Chat 26",
      message_type: "text",
      message: "Message 22",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 27,
      chat_title: "Chat 27",
      message_type: "text",
      message: "Message 23",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 28,
      chat_title: "Chat 28",
      message_type: "text",
      message: "Message 24",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 29,
      chat_title: "Chat 29",
      message_type: "text",
      message: "Message 25",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 30,
      chat_title: "Chat 30",
      message_type: "text",
      message: "Message 26",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 31,
      chat_title: "Chat 31",
      message_type: "text",
      message: "Message 27",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 32,
      chat_title: "Chat 32",
      message_type: "text",
      message: "Message 28",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 33,
      chat_title: "Chat 33",
      message_type: "text",
      message: "Message 29",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 34,
      chat_title: "Chat 34",
      message_type: "text",
      message: "Message 30",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 35,
      chat_title: "Chat 35",
      message_type: "text",
      message: "Message 31",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 36,
      chat_title: "Chat 36",
      message_type: "text",
      message: "Message 32",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 37,
      chat_title: "Chat 37",
      message_type: "text",
      message: "Message 33",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 38,
      chat_title: "Chat 38",
      message_type: "text",
      message: "Message 34",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 39,
      chat_title: "Chat 39",
      message_type: "text",
      message: "Message 35",
      created_at: "2020-01-01 10:00:00",
    },
    {
      chat_id: 40,
      chat_title: "Chat 40",
      message_type: "text",
      message: "Message 36",
      created_at: "2020-01-01 10:00:00",
    },
    /******  487dd832-a2a6-4020-9223-ebe6a2618a72  *******/
  ];
  return (
    <div className="menuShadow" onClick={() => setOpenUserMenu(!openUserMenu)}>
      <div className="userDownMenu" onClick={(e) => e.stopPropagation()}>
        <div
          className={`userDownMenuHeader ${theme === "light" ? "light" : ""}`}
        >
          <div className="userDownMenuHeaderContent">
            <History />
            <h3 className="userDownMenuHeaderTitle">{t("chatHistory")}</h3>
          </div>
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
                          onClick={(event) => deleteChat(event, chat.chat_id)}
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
