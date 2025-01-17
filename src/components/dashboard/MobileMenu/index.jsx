"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMainContext } from "@/providers/contextProvider";
import axios from "axios";
import { useLocale } from "next-intl";
const MobileMenu = () => {
  const locale = useLocale();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(
    "secretToken",
    "isActiveUser",
    "subscriptionDate"
  );
  const { openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu } =
    useMainContext();
  const [activeUser, setActiveUser] = React.useState(false);

  React.useEffect(() => {
    setActiveUser(cookies.isActiveUser);
  }, [cookies]);

  return (
    <div className="downMenu">
      <div className="userDownMenuHeader">
        <button onClick={() => setOpenLogoMenu(!openLogoMenu)}>
          <Image
            src="/images/closeIcon.svg"
            alt="close"
            width="15"
            height="15"
          />
        </button>
        <h3>Меню</h3>
      </div>
      <div className="mobileMenu">
        <Link className="sideBarLink" href={"/dashboard"}>
          <Image
            src="/images/duplicate.svg"
            alt="albums"
            width="25"
            height="25"
          />
          <h3 className="sideBarLinkLabel">Новый чат</h3>
          <div className="hoverEffectIcon">
            <Image
              src="/images/arrow-forward-circle.svg"
              alt="website"
              width="20"
              height="20"
            />
          </div>
        </Link>
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
      <div className="mobileMenuFunctions">
        {/* {activeUser ? (
          <Link href="/prices" className="plan plusPlan">
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
          <Link href="/prices" className="plan freePlan">
            Получить Плюс
            <Image
              className="rocket"
              src="/images/rocket.svg"
              alt="rocket"
              width={15}
              height={15}
            />
          </Link>
        )} */}

        <button
          className="mobileExitButton"
          title="Yangi so'rov yarating"
          onClick={() => {
            removeCookie("secretToken");
            window.location.href = `${locale}/signin`;
          }}
        >
          Выйти из платформы
          <Image src="/images/enter.svg" alt="albums" width="25" height="25" />
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
