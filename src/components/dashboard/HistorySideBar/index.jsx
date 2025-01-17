"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMainContext } from "@/providers/contextProvider";
import axios from "axios";

const HistorySideBar = (props) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(
    "secretToken",
    "isActiveUser",
    "subscriptionDate"
  );
  const { openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu } =
    useMainContext();
  const [allChats, setAllChats] = React.useState([]);
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

  React.useEffect(() => {
    handleGetChats();
  }, []);

  return (
    <div className="userDownMenu">
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
      {/* <div className="sidebarDivider"></div> */}
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
                </div>
                {openMiniMenus[chat.chat_id] && (
                  <>
                    {/* <div
                          className=" z-10"
                          onClick={() => toggleMiniMenu(chat.chat_id)}
                        /> */}
                    <div className="absolute right-0 top-8 mt-2 bg-[#171717] rounded-xl shadow-xl py-1.5 z-20 border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
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
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default HistorySideBar;
