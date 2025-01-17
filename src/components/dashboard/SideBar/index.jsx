"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import "./index.scss";
import { CookiesProvider, useCookies } from "react-cookie";
import { useLocale } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";

const SideBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies("secretToken");
  const locale = useLocale();
  const t = useTranslations("Dashboard.sideBar");
  return (
    <div className="sideBar">
      <div className="sideBarHeader">
        <div className="helpButtons">
          <button
            title="Yangi so'rov yarating"
            onClick={() => {
              window.location.reload();
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
              window.location.reload();
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
        <Link className="sideBarLink" href={"https://enix.uz/"}>
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
      </div>
      <div className="sidebarDivider"></div>
      <div className="sideBarContent">
        <Link className="sideBarLink" href={"/dashboard/text"}>
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
        <Link className="sideBarLink" href={"/dashboard/image"}>
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
