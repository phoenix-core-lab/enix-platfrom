"use client";

import * as React from "react";
import { useRef, useCallback } from "react";
import "./index.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { CookiesProvider, useCookies } from "react-cookie";
import CircularProgress from "@mui/joy/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const messages = [
  "Qanday yordam bera olaman?",
  "Qanday qilib foydali bo'lishim mumkin?",
  "Sizni nima qiziqtiradi?",
];

const textModelButtons = [
  "Qanday qilib intervyu olish kerak?",
  "Tutilish nima?",
];

const imageModelButtons = ["Peyzajni chizing!", "Dengizni ko'rsating!"];

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
  const [cookies, setCookie] = useCookies();
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
    (chatId) => {
      if (chatId) {
        setShowAnswer(true);
        axios
          .get(process.env.NEXT_PUBLIC_APP_API_URL + "/chat/" + chatId, {
            headers: {
              Authorization: `Bearer ${cookies.secretToken}`,
            },
          })
          .then((res) => {
            if (Array.isArray(res.data)) {
              setModelAnswer(res.data.reverse());
              if (props.type === "text" && res.data.length > 0) {
                typeEffect(res.data[res.data.length - 1].message);
              }
            }
          })
          .catch((err) => {
            if (err.response.status === 406) {
              router.push("/prices");
            }
            console.error(err);
            setModelAnswer([
              {
                from_user: false,
                message: "Xato yuz berdi. Yana urinib ko'ring.",
              },
            ]);
            typeEffect("Xato yuz berdi. Yana urinib ko'ring.");
          });
      }
    },
    [cookies.secretToken]
  );

  const handleDownload = async (modelMessage) => {
    if (props.type === "image") {
      const imageUrl = `${process.env.NEXT_PUBLIC_APP_API_URL}/images/${modelMessage}`;

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

        toast.success("Fayl muvaffaqiyatli yuklab olindi");
      } catch (error) {
        toast.error("Rasmni yuklab bo'lmadi");
      }
    } else {
      const blob = new Blob([modelMessage], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "result.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Fayl muvaffaqiyatli yuklab olindi");
    }
  };

  const handleCopy = (modelMessage) => {
    navigator.clipboard.writeText(modelMessage);
    toast.success("Matn muvaffaqiyatli nusxa ko'chirildi");
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
              message: "Xato yuz berdi. Yana urinib ko'ring.",
            },
          ]);
          typeEffect("Xato yuz berdi. Yana urinib ko'ring.");
        }
      });

    formElements.message.value = "";
  };

  const handleGetUpdatedResult = (event) => {
    console.log(modelAnswer);
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
              message: "Xato yuz berdi. Yana urinib ko'ring.",
            },
          ]);
          typeEffect("Xato yuz berdi. Yana urinib ko'ring.");
        }
      });
    formElements.message.value = "";
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
    scrollDownWhenAnswer();
  }, [loading]);

  useEffect(() => {
    getChatByChatId(props.chatId);
  }, [getChatByChatId, props.chatId]);

  return (
    <div className="dashboardContentFunctionality">
      <ToastContainer theme="dark" />
      <AnimatePresence>
        {showAnswer && (
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
                      <div>{item.message}</div>
                    ) : (
                      <>
                        {props.type === "text" && (
                          <ReactMarkdown>
                            {index === modelAnswer.length - 1
                              ? typedModelAnswer
                              : item.message}
                          </ReactMarkdown>
                        )}
                        {props.type === "image" && item.file_url ? (
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_APP_API_URL +
                              "/images/" +
                              item.file_url
                            }
                            alt="modelImage"
                            width={300}
                            height={300}
                          />
                        ) : (
                          props.type === "image" &&
                          !item.file_url && (
                            <ReactMarkdown>
                              {index === modelAnswer.length - 1
                                ? typedModelAnswer
                                : item.message}
                            </ReactMarkdown>
                          )
                        )}
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
                                    alt="copy"
                                    width={20}
                                    height={20}
                                    onClick={() => handleDownload(item.message)}
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="copyItem">
                                <Image
                                  src="/images/download.svg"
                                  alt="copy"
                                  width={20}
                                  height={20}
                                  onClick={() => handleDownload(item.file_url)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </>
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
                  <CircularProgress
                    size="sm"
                    color="neutral"
                    value={70}
                    variant="plain"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showAnswer && (
        <motion.h3
          className="contentHeader"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
        >
          {currentMessage}
        </motion.h3>
      )}

      <motion.div
        key="textForm"
        initial={{ y: !showAnswer ? 0 : 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
        className="textForm"
      >
        <form
          id="textFormModel"
          onSubmit={(e) =>
            showAnswer ? handleGetUpdatedResult(e) : handleGetResult(e)
          }
        >
          <motion.textarea
            required
            className="textInput"
            placeholder="Qanday yordam bera olaman?"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
            name="message"
            onKeyDown={handleSendOnEnter}
            disabled={loading}
          />

          {isTyping ? (
            <button
              className="sendButton"
              type="button"
              onClick={() => stopTyping()}
            >
              <Image src="/images/stop.svg" alt="send" width={40} height={40} />
            </button>
          ) : (
            <motion.button
              className="sendButton"
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }}
              disabled={loading && !isTyping}
            >
              <Image src="/images/send.svg" alt="send" width={40} height={40} />
            </motion.button>
          )}
        </form>
      </motion.div>

      {!showAnswer && (
        <div className="helperButtons">
          {props.type === "text" ? (
            <motion.button
              className="helperButton"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 * 0.2 }}
              onClick={() => router.push("/dashboard/image")}
            >
              <div className="helperButtonText">Rasm yarating</div>
            </motion.button>
          ) : (
            <motion.button
              className="helperButton"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 * 0.2 }}
              onClick={() => router.push("/dashboard/text")}
            >
              <div className="helperButtonText">Insho yozing</div>
            </motion.button>
          )}

          {props.type === "text"
            ? textModelButtons.map((buttonText, index) => (
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
              ))
            : imageModelButtons.map((buttonText, index) => (
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
              ))}
        </div>
      )}
    </div>
  );
};

export default DashboardContentFunctionality;
