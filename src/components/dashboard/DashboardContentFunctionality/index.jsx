"use client";

import * as React from "react";
import { useRef, useCallback } from "react";
import "./index.scss";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useTranslations } from "next-intl";
import Flag from "react-world-flags";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Link } from "@/i18n/routing";
import LoadingSpinner from "@/components/ui/loadding-spinner";
import {
  ScanText,
  Images,
  Scale,
  Stethoscope,
  GraduationCap,
  Code2,
  Building2,
  RefreshCw,
  Edit,
  Laptop,
  Palette,
  ChartNoAxesCombined,
  Type,
  MoonStar,
} from "lucide-react";
import { DownloadButton } from "../downloadFile/selectModal";

const renderButton = (buttonText, index) => (
  <motion.button
    key={index}
    className="helperButton"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    onClick={(e) => {
      const form = document.getElementById("textFormModel");
      form.elements.message.value = buttonText;
      e.preventDefault();
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }}
  >
    <div className="helperButtonText">{buttonText}</div>
  </motion.button>
);

const DashboardContentFunctionality = (props) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      infinite: true,
      transitionEffect: "zoom-in-out",
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  const t = useTranslations("Dashboard");
  const messages = [t("title"), t("title2"), t("title3")];
  const imageModelButtons = [];
  const textModelButtons = [
    {
      text: t("IT"),
      icon: <Laptop size={20} />,
      role: "IT",
    },
    {
      text: t("creative"),
      icon: <Palette size={20} />,
      role: "creative",
    },
    {
      text: t("analitic"),
      icon: <ChartNoAxesCombined size={20} />,
      role: "analitic",
    },
    {
      text: t("copiriter"),
      icon: <Type size={20} />,
      role: "copiriter",
    },
    {
      text: t("astrolog"),
      icon: <MoonStar size={20} />,
      role: "astrolog",
    },
  ];

  const [cookies, setCookie, removeCookie] = useCookies("modelAnswerLanguage");
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);
  const [modelAnswer, setModelAnswer] = useState([]);
  const [typedModelAnswer, setTypedModelAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);
  const chatFieldRef = useRef(null);
  const [language, setLanguage] = useState("");
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = useState("dark");
  const [openModalId, setOpenModalId] = useState(null);
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Автоувеличение высоты при изменении текста
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Сбрасываем высоту
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Задаем высоту по содержимому
    }
  }, [message]);

  useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme]);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);
  const typeEffect = (text) => {
    setIsTyping(true);
    clearInterval(typingIntervalRef.current);
    let index = 0;
    let typedText = "";

    typingIntervalRef.current = setInterval(() => {
      typedText += text[index];
      setTypedModelAnswer(typedText);
      index++;
      if (index === text.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setLoading(false);
      }
    }, 1);
  };

  const getChatByChatId = useCallback(
    async (chatId) => {
      if (!chatId) return;

      if (props.type === "image") setLanguage("uz");
      setShowAnswer(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/chat/${chatId}`,
          {
            headers: { Authorization: `Bearer ${cookies.secretToken}` },
          }
        );

        const data = response.data;

        if (!data || data.length < 1) {
          return router.push("/");
        }

        if (Array.isArray(data)) {
          setModelAnswer(data.reverse());

          if (props.type === "text" && data.length > 0) {
            typeEffect(data[data.length - 1].message);
          }
        }
      } catch (error) {
        if (error.response?.status === 402) {
          return router.push("/prices");
        }

        const errorMessage = t("errorMessage");
        setModelAnswer([{ from_user: false, message: errorMessage }]);
        typeEffect(errorMessage);
      }
    },
    [cookies.secretToken]
  );

  const handleDownload = async (modelMessage, id) => {
    if (props.type === "image") {
      const imageUrl = `${process.env.NEXT_PUBLIC_APP_API_URL}/image/${modelMessage}`;

      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error("Rasmni yuklashda xato");
        }
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "result.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        toast.success(t("Tostify.successDownload"));
      } catch (error) {
        toast.error(t("Tostify.errorDownload"));
      }
    } else {
      setOpenModalId(id);
    }
  };

  const handleCopy = (modelMessage) => {
    navigator.clipboard.writeText(modelMessage);
    toast.success(t("Tostify.successTextCopy"));
  };

  const stopTyping = () => {
    clearInterval(typingIntervalRef.current);
    setIsTyping(false);
    setLoading(false);
  };

  const handleSendOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (event.target.value.trim() !== "") {
        event.preventDefault();
        event.target.form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  const handleGetResult = (event) => {
    event.preventDefault();
    if (isTyping) {
      stopTyping();
      return;
    }

    const formElements = event.target.elements;
    setModelAnswer([
      {
        from_user: true,
        message: formElements.message.value,
      },
    ]);
    setShowAnswer(true);
    setLoading(true);

    axios
      .post(
        process.env.NEXT_PUBLIC_APP_API_URL + "/chat",
        {
          chat_title: "",
          message: formElements.message.value,
          message_type: props.type,
          language: language,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretToken}`,
          },
        }
      )
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setModelAnswer(res.data.data.reverse());
          props.type === "text" &&
            res.data.data.length > 0 &&
            typeEffect(res.data.data[res.data.data.length - 1].message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response?.status === 406) {
          router.push("/prices?toast=true");
          console.error(err);
        } else {
          setModelAnswer((prev) => [
            ...prev,
            {
              from_user: false,
              message: t("errorMessage"),
            },
          ]);
          typeEffect(t("errorMessage"));
        }
      });

    formElements.message.value = "";
    setMessage("");
  };

  const handleGetUpdatedResult = (event) => {
    event.preventDefault();
    if (isTyping) {
      stopTyping();
      return;
    }
    const formElements = event.target.elements;
    setShowAnswer(true);
    setLoading(true);
    setModelAnswer([
      ...modelAnswer,
      {
        from_user: true,
        message: event.target.elements.message.value,
      },
    ]);

    axios
      .patch(
        process.env.NEXT_PUBLIC_APP_API_URL +
          "/chat/chat/" +
          modelAnswer[0].chat_id,
        {
          message_type: props.type,
          message: formElements.message.value,
          language: language,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretToken}`,
          },
        }
      )
      .then((res) => {
        if (Array.isArray(res.data?.data)) {
          setModelAnswer(res.data.data.reverse());
          props.type === "text" &&
            res.data.data.length > 0 &&
            typeEffect(res.data.data[res.data.data.length - 1].message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response?.status === 406) {
          router.push("/prices?toast=true");
          console.error(err);
        } else {
          setModelAnswer((prev) => [
            ...prev,
            {
              from_user: false,
              message: t("errorMessage"),
            },
          ]);
          typeEffect(t("errorMessage"));
        }
      });
    formElements.message.value = "";
    setMessage("");
  };

  const scrollDownWhenAnswer = () => {
    if (chatFieldRef.current) {
      chatFieldRef.current.scrollTo({
        top: chatFieldRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleTyping = () => {
      const fullMessage = messages[loopIndex % messages.length];
      setCurrentMessage((prev) => {
        if (!isDeleting) {
          return fullMessage.substring(0, prev.length + 1);
        } else {
          return fullMessage.substring(0, prev.length - 1);
        }
      });

      if (!isDeleting && currentMessage === fullMessage) {
        setTimeout(() => setIsDeleting(true), 8000);
      } else if (isDeleting && currentMessage === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentMessage, isDeleting, loopIndex, typingSpeed]);

  useEffect(() => {
    scrollDownWhenAnswer();
  }, [typedModelAnswer]);

  useEffect(() => {
    setLanguage(cookies.modelAnswerLanguage || "");
  }, [cookies]);

  useEffect(() => {
    scrollDownWhenAnswer();
  }, [loading]);

  useEffect(() => {
    getChatByChatId(props.chatId);
  }, [getChatByChatId, props.chatId]);

  const changeLanguage = () => {
    const languages = ["ru", "uz", "en"];
    const currentIndex = languages.indexOf(language);
    const newLanguage = languages[(currentIndex + 1) % languages.length];
    setCookie("modelAnswerLanguage", newLanguage);
    setLanguage(newLanguage);
  };
  const assistentSubmit = (role) => {
    role;
  };

  return (
    <div className="dashboardContentFunctionality">
      <ToastContainer theme="dark" pauseOnHover={false} />
      <AnimatePresence>
        {showAnswer && language && (
          <motion.div
            key="chatBox"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.8, 0.5, 1],
            }}
            className="chatContainer"
          >
            <div className="chatField" ref={chatFieldRef}>
              {modelAnswer &&
                modelAnswer.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.8, 0.5, 1],
                    }}
                    className={item.from_user ? "userMessage" : "modelMessage"}
                  >
                    {item.from_user ? (
                      <button
                        onClick={() => setMessage(item.message)}
                        className="userMessageEdit"
                      >
                        <Edit width={15} height={15} />
                      </button>
                    ) : null}
                    {item.from_user ? (
                      item.message
                    ) : (
                      <div className="relative flex gap-4">
                        <div className="flex items-center justify-center bg-[#2f2f2f] rounded-full w-[30px] h-[30px] p-1 min-w-[30px] min-h-[30px]">
                          <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={15}
                            height={15}
                          />
                        </div>
                        <div>
                          {props.type === "text" && (
                            <ReactMarkdown>
                              {index === modelAnswer.length - 1
                                ? typedModelAnswer
                                : item.message}
                            </ReactMarkdown>
                          )}

                          {props.type === "image" ? (
                            item.file_url ? (
                              item.file_url === "no.png" ? (
                                <ReactMarkdown>
                                  {t("prohibition")}
                                </ReactMarkdown>
                              ) : (
                                <Link
                                  href={`${process.env.NEXT_PUBLIC_APP_API_URL}/image/${item.file_url}`} // Full-size image URL
                                  data-fancybox="gallery"
                                >
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_APP_API_URL}/image/${item.file_url}`} // Thumbnail image URL
                                    alt={`Image ${index + 1}`}
                                    width={300}
                                    height={300}
                                    style={{
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </Link>
                              )
                            ) : (
                              <ReactMarkdown>
                                {index === modelAnswer.length - 1
                                  ? typedModelAnswer
                                  : item.message}
                              </ReactMarkdown>
                            )
                          ) : null}

                          {!item.from_user && (
                            <div className="copyContainer">
                              {props.type === "text" ? (
                                <>
                                  <div className="copyItem">
                                    <Image
                                      src="/images/copy.svg"
                                      alt="copy"
                                      width={20}
                                      height={20}
                                      onClick={() => handleCopy(item.message)}
                                    />
                                  </div>
                                  <div className="copyItem">
                                    <Image
                                      src="/images/download.svg"
                                      alt="download"
                                      width={20}
                                      height={20}
                                      onClick={() =>
                                        handleDownload(item.message, item.id)
                                      }
                                    />
                                    <DownloadButton
                                      isOpen={openModalId === item.id}
                                      setIsOpen={() =>
                                        setOpenModalId(
                                          openModalId === item.id
                                            ? null
                                            : item.id
                                        )
                                      }
                                      text={item.message}
                                    />
                                  </div>
                                </>
                              ) : item.file_url &&
                                item.file_url !== "no.png" ? (
                                <div className="copyItem">
                                  <Image
                                    src="/images/download.svg"
                                    alt="download"
                                    width={20}
                                    height={20}
                                    onClick={() =>
                                      handleDownload(item.file_url)
                                    }
                                  />
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.8, 0.5, 1],
                  }}
                  className="loader"
                >
                  <LoadingSpinner />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showAnswer && language && (
        <>
          <motion.h3
            className="contentHeader"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
          >
            {currentMessage}
          </motion.h3>
        </>
      )}

      {!showAnswer && (
        <div className="chosenModelWrapper">
          {/* <div className="chosenModel" onClick={() => router.push("/dashboard/text")}> */}
          <motion.div
            className={`${
              props.type === "text" ? "chosenModel chosen" : "chosenModel"
            } ${theme === "light" ? "light" : ""}`}
            onClick={() => router.push("/dashboard/text")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
          >
            <div
              className={`chosenModelIcon ${theme === "light" ? "light" : ""}`}
            >
              <ScanText
                color={theme === "light" ? "black" : "white"}
                size={25}
              />
            </div>
            <div className="chosenModelText">{t("sideBar.text")}</div>
          </motion.div>
          <motion.div
            className={`${
              props.type === "image" ? "chosenModel chosen" : "chosenModel"
            } ${theme === "light" ? "light" : ""}`}
            onClick={() => router.push("/dashboard/image")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
          >
            <div
              className={`chosenModelIcon ${theme === "light" ? "light" : ""}`}
            >
              <Images color={theme === "light" ? "black" : "white"} size={25} />
            </div>
            <div className="chosenModelText">{t("sideBar.text2")}</div>
          </motion.div>
        </div>
      )}

      {language && (
        <motion.div
          key="textForm"
          initial={{ y: !showAnswer ? 0 : 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
          className={`textForm ${theme === "light" ? "light" : ""} ${
            showAnswer ? "answer" : ""
          }`}
        >
          {showAnswer && (
            <button
              className="newchat"
              onClick={() => router.push("/dasboard/text")}
            >
              <RefreshCw className="icon" />
              <span className="text">{t("newChat")}</span>
            </button>
          )}
          <form
            id="textFormModel"
            onSubmit={(e) =>
              showAnswer ? handleGetUpdatedResult(e) : handleGetResult(e)
            }
          >
            <motion.textarea
              ref={textareaRef}
              value={message}
              rows={2}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={`textInput`}
              placeholder={t("title3")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
              name="message"
              onKeyDown={handleSendOnEnter}
              disabled={loading}
            />
            <div className="languageSwitcher">
              <button
                type="button"
                className="languageSwitcherButton"
                title="На каком языке мне к вам обращаться?"
                onClick={() => {
                  changeLanguage();
                }}
              >
                <Image
                  src={
                    language === "ru"
                      ? "/images/russia.svg"
                      : language === "uz"
                      ? "/images/uzbekistan.svg"
                      : "/images/greatbritain.svg"
                  }
                  alt="language"
                  width={40}
                  height={40}
                />
              </button>
              <p className="languageSwitcherText">
                {language === "ru"
                  ? "Ответ русский"
                  : language === "uz"
                  ? "Javob o'zbekcha"
                  : "Answer English"}
              </p>
            </div>

            {isTyping ? (
              <button
                className={`sendButton ${theme === "light" ? "light" : ""}`}
                type="button"
                onClick={() => stopTyping()}
              >
                <Image
                  src="/images/stop.svg"
                  alt="send"
                  width={40}
                  height={40}
                />
              </button>
            ) : (
              <motion.button
                className={`sendButton ${theme === "light" ? "light" : ""}`}
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
                disabled={loading && !isTyping}
              >
                <Image
                  src="/images/send.svg"
                  alt="send"
                  width={40}
                  height={40}
                />
              </motion.button>
            )}
            <p className="absolute bottom-[17px] right-[50px] text-[14px] text-[#b4b4b4] md:right-[60px]">
              20 / 20
            </p>
          </form>
        </motion.div>
      )}

      {!showAnswer && language && (
        <>
          {props.type === "text" && (
            <motion.h3 className="helperButtonsTitle">
              {t("helperButtonsTitle")}
            </motion.h3>
          )}
          <div className="helperButtons">
            {props.type === "text"
              ? textModelButtons.map(({ text, icon, role }, index) => (
                  <motion.button
                    key={index}
                    className="helperButton"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    onClick={(e) => {
                      const form = document.getElementById("textFormModel");
                      form.elements.message.value = text;
                      e.preventDefault();
                      form.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                      assistentSubmit(role);
                    }}
                  >
                    <div className="helperButtonIcon">{icon}</div>
                    <div className="helperButtonText">{text}</div>
                  </motion.button>
                ))
              : ""}
          </div>
        </>
      )}

      {!language && (
        <div className="modelLanguageWrapper">
          <motion.h3
            className="contentHeader"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
          >
            {t("chooseLang")}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="modelLanguageContainer"
          >
            <div
              className="languageButton"
              onClick={() => {
                setCookie("modelAnswerLanguage", "ru");
                setLanguage("ru");
              }}
            >
              <div className="languageButtonText">{t("ru")}</div>
              <div className="flag">
                <Flag code="RU" />
              </div>
            </div>
            <div
              className="languageButton"
              onClick={() => {
                setCookie("modelAnswerLanguage", "uz");
                setLanguage("uz");
              }}
            >
              <div className="languageButtonText">{t("uz")}</div>
              <div className="flag">
                <Flag code="UZ" />
              </div>
            </div>
            <div
              className="languageButton"
              onClick={() => {
                setCookie("modelAnswerLanguage", "en");
                setLanguage("en");
              }}
            >
              <div className="languageButtonText">{t("en")}</div>
              <div className="flag">
                <Flag code="GB" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardContentFunctionality;
