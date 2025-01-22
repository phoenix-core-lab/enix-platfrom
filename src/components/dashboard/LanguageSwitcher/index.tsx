import React from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import "./index.scss";
import { useLocale } from "next-intl";
import Image from "next/image";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const locale = useLocale();

  const handleLanguageChange = () => {
    try {
      const newLocale = locale === "uz" ? "ru" : "uz";
      router.push(pathname, { locale: newLocale });
    } catch (error) {
      console.error("Error switching language:", error);
    }
  };

  return (
    <div className="language-switcher">
      <div
        className="sideBarLink"
        onClick={handleLanguageChange}
        role="button"
        aria-label={`Switch to ${locale === "uz" ? "Russian" : "Uzbek"}`}
        tabIndex={0}
      >
        <Image
          src="/images/language.svg"
          alt="website"
          width="25"
          height="25"
        />
        <h3 className="sideBarLinkLabel sideBarLinkLabelLanguage">
          {locale === "uz" ? "Uzbek" : "Русский"}
        </h3>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
