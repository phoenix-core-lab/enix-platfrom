"use client";
import { Check, ArrowLeft } from "lucide-react";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "@/i18n/routing";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useCookies } from "react-cookie";
export default function Prices() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const t = useTranslations("Plan");
  const [cookies, setCookie] = useCookies();
  const [isActiveUser, setIsActiveUser] = useState(null);
  const [cookiesTheme] = useCookies(["theme"]);
  const theme = cookiesTheme.theme || "dark"; // Значение по умолчанию

  useEffect(() => {
    console.log("Текущая тема:", theme);
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    setIsActiveUser(cookies.isActiveUser);
  }, [cookies]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("toast")) {
        toast.error(t("Tostify.errorLimit"));
      }
    }
  }, []);

  return (
    <>
      <ToastContainer theme="dark" pauseOnHover={false} />
      <div
        className={`min-h-screen bg-background-prices text-text pt-6 pb-12 px-4`}
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("Back")}
        </button>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {isActiveUser ? t("Soldtitle") : t("Maintitle")}
          </h1>

          {activeTab === "personal" ? (
            <div
              className={`grid grid-cols-1 md:${
                !isActiveUser ? "grid-cols-2" : "grid-cols-1"
              } gap-4 sm:gap-6 lg:gap-8`} // Увеличение gap
            >
              {/* Free Tier */}
              {!isActiveUser && (
                <div className="rounded-lg bg-background-prices p-6 border-2 border-borderColor-pricesSecond max-w-[500px]">
                  <h2 className="text-xl font-bold mb-4">
                    {t("Free.Maintitle")}
                  </h2>
                  <div className="flex items-baseline mb-5">
                    <span className="text-4xl font-extrabold">20</span>
                    <span className="ml-1 text-gray-400">
                      {t("Free.price")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 font-medium px-4 py-3 rounded-[10px] mb-5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Ваш лимит исчерпан
                  </div>
                  <p className="mb-8">{t("Free.subtitle")}</p>
                  <button
                    onClick={() => router.push("/")}
                    className="w-full py-2 px-3 rounded-md bg-gray-600 text-white mb-8"
                  >
                    {t("Free.buttonText")}
                  </button>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                      <span>{t("Free.text")}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                      <span>{t("Free.text2")}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                      <span>{t("Free.text3")}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                      <span>{t("Free.text4")} </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                      <span>{t("Free.text5")}</span>
                    </li>
                  </ul>
                  <div className="text-sm text-gray-400">
                    {t("Free.alreadyHavePremium")}
                    <Link
                      href="/payment"
                      className="text-[#00A67E] hover:underline"
                    >
                      {t("Free.linkText")}
                    </Link>
                  </div>
                </div>
              )}
              {/* Plus Tier */}
              <div
                className={`rounded-lg bg-background-prices p-6 border-2 border-borderColor-prices relative  max-w-[500px]`}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00A67E] text-white px-3 py-1 rounded-full text-sm">
                  {t("Premium.topText")}
                </span>
                <h2 className="text-xl font-bold mb-4">Premium</h2>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-extrabold">15 000</span>{" "}
                  <span className="ml-1 text-gray-400">
                    {t("Premium.price")}
                  </span>
                </div>
                <p className="mb-8">{t("Premium.subtitle")}</p>
                <button
                  onClick={() => {
                    if (!isActiveUser) {
                      router.push("./payment");
                    }
                  }}
                  className={`w-full py-2 px-3 rounded-md mb-8 text-white ${
                    !isActiveUser ? "bg-[#00A67E]" : "bg-gray-600"
                  }`}
                >
                  {!isActiveUser
                    ? t("Premium.buttonText")
                    : t("Free.buttonText")}
                </button>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>{t("Premium.text")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>{t("Premium.text2")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>{t("Premium.text3")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>{t("Premium.text4")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>{t("Premium.text5")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>{t("Premium.text6")}</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-400">
                  {t("Premium.bottomText")}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {/* Team Tier */}
              <div className="rounded-lg bg-[#222222] p-8">
                <h2 className="text-2xl font-bold mb-4">Team</h2>
                <div className="flex items-baseline mb-8">
                  <span className="text-2xl">$</span>
                  <span className="text-5xl font-extrabold">25</span>
                  <span className="ml-1 text-gray-400">USD/месяц</span>
                </div>
                <p className="mb-8">
                  Улучшите работу своей команды с помощью безопасного рабочего
                  пространства для совместной работы
                </p>
                <button className="w-full py-3 px-4 rounded-md bg-[#00A67E] text-white mb-8">
                  Получить Team
                </button>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>
                      Более высокие ограничения на количество сообщений для
                      GPT-4, GPT-4o и такие инструменты, как DALL·E, просмотр
                      веб-страниц, анализ данных и многое другое
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>Ограниченный доступ к o1 и o1-mini</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>Стандартный и расширенный голосовые режимы</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>
                      Создавайте и делитесь GPT в своей рабочей области
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>
                      Консоль администратора для управления рабочей областью
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="min-w-[20px] h-5 w-5 text-[#00A67E] mr-2 mt-0.5" />
                    <span>
                      Данные команды исключены из обучения по умолчанию.{" "}
                      <Link className="text-[#00A67E] hover:underline">
                        Узнать больше
                      </Link>
                    </span>
                  </li>
                </ul>
                <div className="text-sm text-gray-400">
                  Для 2+ пользователей, ежегодное выставление счетов
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-2">{t("bottomText")}</p>
            <Link
              href="https://t.me/timur_ktr"
              className="text-[#00A67E] hover:underline"
            >
              См. Enix Enterprise
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
