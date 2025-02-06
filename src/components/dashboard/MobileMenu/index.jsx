"use client";
import React from "react";
import "./index.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";
import { CookiesProvider, useCookies } from "react-cookie";
import { useMainContext } from "@/providers/contextProvider";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import {
  GalleryHorizontalEnd,
  CopyPlus,
  Icon,
  Lightbulb,
  ScanText,
  Images,
  LogIn,
  Languages
} from "lucide-react";
import { planet } from "@lucide/lab";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";
 
const MobileMenu = () => {
  const t = useTranslations("Dashboard");
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
  const [cookiesTheme] = useCookies(["theme"]);
  const [theme, setTheme] = React.useState("dark"); // Значение по умолчанию

  React.useEffect(() => {
    setTheme(cookiesTheme.theme || "dark");
  }, [cookiesTheme])

  React.useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div
      className="downMenuShadow"
      onClick={() => setOpenLogoMenu(!openLogoMenu)}
    >
      <div className="downMenu" onClick={(e) => e.stopPropagation()}>
        <div
          className={`userDownMenuHeader ${theme === "light" ? "light" : ""}`}
        >
          <h3>{t("menu")}</h3>

          <button onClick={() => setOpenLogoMenu(!openLogoMenu)}>
            <Image
              src="/images/closeIcon.svg"
              alt="close"
              width="15"
              height="15"
            />
          </button>
        </div>
        <div className="mobileMenu">
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/dashboard"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <CopyPlus color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("newChat")}</h3>
            <div className="hoverEffectIcon">
              <Image
                src="/images/arrow-forward-circle.svg"
                alt="website"
                width="20"
                height="20"
              />
            </div>
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"https://enix.uz/"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <Icon iconNode={planet} color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.title")}</h3>
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
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/questions"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            {/* <Image
              src="/images/questions.svg"
              alt="website"
              width="25"
              height="25"
            /> */}
            <Lightbulb color="white" size={25} />
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
          <div className="sidebarDivider"></div>
          <Link
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/dashboard/text"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <ScanText color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.text")}</h3>
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
            className={`sideBarLink ${theme === "light" ? "light" : ""}`}
            href={"/dashboard/image"}
            onClick={() => setOpenLogoMenu(!openLogoMenu)}
          >
            <Images color="white" size={25} />
            <h3 className="sideBarLinkLabel">{t("sideBar.text2")}</h3>
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
            {t("sideBar.exit")}
            <LogIn color="#ce3737" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
