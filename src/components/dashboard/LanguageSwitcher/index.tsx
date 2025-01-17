import React from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import "./index.scss"; // Import global SCSS file
import { useLocale } from "next-intl";
import Image from "next/image";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = () => {
    const newLocale = locale === "uz" ? "ru" : "uz";
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="language-switcher">
      <button className="sideBarLink" onClick={handleLanguageChange}>
        <Image
          src="/images/language.svg"
          alt="website"
          width="25"
          height="25"
        />
        <h3 className="sideBarLinkLabel sideBarLinkLabelLanguage">
          {locale === "uz" ? "Uzbek" : "Русский"}
        </h3>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
