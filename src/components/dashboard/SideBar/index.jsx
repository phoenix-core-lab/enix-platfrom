"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./index.scss";
import { CookiesProvider, useCookies } from "react-cookie";

const SideBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies("secretToken");
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
      <div className="sideBarFooter">
        <button
          className="sideBarLink"
          href={"https://enix.uz/"}
          onClick={() => {
            removeCookie("secretToken");
            window.location.href = "/signin";
          }}
        >
          <Image src="/images/enter.svg" alt="website" width="25" height="25" />
          <h3 className="sideBarLinkLabel">Tizimdan chiqish</h3>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
