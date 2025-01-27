"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import "./index.scss";
import { CookiesProvider, useCookies } from "react-cookie";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";

const SideBar = () => {
  const router = useRouter();
  const t = useTranslations("Dashboard.sideBar"); 
  const [cookies, setCookie, removeCookie] = useCookies("secretToken");
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = useState("dark"); // Значение по умолчанию

  useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme])

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div className={`sideBar ${theme === "light" ? "light" : ""}`}>
      <div className="sideBarHeader">
        <div className={`helpButtons ${theme === "light" ? "light" : ""}`}>
          <button
            title="Yangi so'rov yarating"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/images/albums.svg"
              alt="albums"
              width="25"
              height="25"
            />
          </button>
          <button
            title="Yangi so'rov yarating"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src="/images/duplicate.svg"
              alt="albums"
              width="25"
              height="25"
            />
          </button>
        </div>
        <Link
          className={`sideBarLink ${theme === "light" ? "light" : ""} `}
          href={"https://enix.uz/"}
        >
          <Image
            src="/images/planet.svg"
            alt="website"
            width="25"
            height="25"
          />
          <h3 className="sideBarLinkLabel">{t("title")}</h3>
          <div className="hoverEffectIcon">
            <Image
              src="/images/arrow-forward-circle.svg"
              alt="website"
              width="20"
              height="20"
            />
          </div>
        </Link>
        <Link
          className={`sideBarLink ${theme === "light" ? "light" : ""} `}
          href={"/questions"}
        >
          <Image
            color="red"
            src="/images/questions.svg"
            alt="website"
            width="25"
            height="25"
          />
          <h3 className="sideBarLinkLabel">FAQ</h3>
          <div className="hoverEffectIcon">
            <Image
              src="/images/arrow-forward-circle.svg"
              alt="website"
              width="20"
              height="20"
            />
          </div>
        </Link>
      </div>
      <div className="sidebarDivider"></div>
      <div className="sideBarContent">
        <Link
          className={`sideBarLink ${theme === "light" ? "light" : ""} `}
          href={"/dashboard/text"}
        >
          <Image
            src="/images/document-text.svg"
            alt="website"
            width="25"
            height="25"
          />
          <h3 className="sideBarLinkLabel">{t("text")}</h3>
          <div className="hoverEffectIcon">
            <Image
              src="/images/arrow-forward-circle.svg"
              alt="website"
              width="20"
              height="20"
            />
          </div>
        </Link>
        {/* <Link className="sideBarLink" href={"https://enix.uz/"}>
          <Image src="/images/pulse.svg" alt="website" width="25" height="25" />
          <h3 className="sideBarLinkLabel">Работа с аудио</h3>
          <div className="hoverEffectIcon">
            <Image
              src="/images/arrow-forward-circle.svg"
              alt="website"
              width="20"
              height="20"
            />
          </div>
        </Link> */}
        <Link
          className={`sideBarLink ${theme === "light" ? "light" : ""} `}
          href={"/dashboard/image"}
        >
          <Image
            src="/images/images.svg"
            alt="website"
            width="22"
            height="25"
            style={{ marginLeft: "2px" }}
          />
          <h3 className="sideBarLinkLabel">{t("text2")}</h3>
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
      <div className="sideBarFooter">
        <div className="sideBarLink">
          <ThemeToggle />
        </div>
        <LanguageSwitcher />
        <button
          className="sideBarLink"
          href={"https://enix.uz/"}
          onClick={() => {
            removeCookie("secretToken");
            window.location.href = `/${locale}/signin`;
          }}
        >
          <Image src="/images/enter.svg" alt="website" width="25" height="25" />
          <h3 className="sideBarLinkLabel">{t("exit")}</h3>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
